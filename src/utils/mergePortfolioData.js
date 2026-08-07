// Shared by the server loader (lib/portfolio.js) and the client hook, so both
// paths produce byte-identical data and hydration never mismatches.

import localData from '@/data/portfolioData';

/** True for values the sheet effectively did not return. */
function isEmpty(value) {
  if (value == null) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  if (typeof value === 'string') return value.trim() === '';
  return false;
}

/**
 * Local data is the floor, sheet data the override. Anything the sheet omits —
 * or returns empty — keeps the bundled value, so keys that only exist locally
 * (`proofs`, `focus`, per-item `proofKey`) always survive.
 */
export function mergeWithLocal(remote) {
  const merged = { ...localData };

  for (const [key, value] of Object.entries(remote || {})) {
    if (isEmpty(value)) continue;

    // Nested content objects merge one level deep so a partial sheet row does
    // not wipe out sibling copy.
    if (!Array.isArray(value) && typeof value === 'object' && typeof localData[key] === 'object') {
      merged[key] = { ...localData[key], ...value };
    } else {
      merged[key] = value;
    }
  }

  // Design-owned fields the sheet must not override. The hero frame is built
  // around the transparent slice artwork (aspect ratio and object-fit are tuned
  // for it), so a plain portrait coming from the sheet would break the layout.
  merged.personalInfo = {
    ...merged.personalInfo,
    profileImage: localData.personalInfo.profileImage,
    focus: localData.personalInfo.focus,
  };

  // The sheet has no concept of proof documents, so re-attach them after the
  // merge or every sheet-sourced row would lose its link to the lightbox.

  // Certifications link to a proof via that proof's `match` pattern, because
  // sheet titles are phrased loosely and never match the local ones exactly.
  if (merged.certifications !== localData.certifications) {
    const patterns = Object.entries(localData.proofs).filter(([, p]) => p.match);

    merged.certifications = merged.certifications.map((c) => {
      if (c.proofKey) return c;
      const haystack = `${c.name || ''} ${c.issuer || ''} ${c.date || ''}`;
      const hit = patterns.find(([, p]) => p.match.test(haystack));
      return { ...c, proofKey: hit ? hit[0] : null };
    });

    // Certificates we hold a document for but the sheet has no row for would
    // otherwise silently disappear, so append them.
    const linked = new Set(merged.certifications.map((c) => c.proofKey).filter(Boolean));
    const extras = localData.certifications.filter((c) => c.proofKey && !linked.has(c.proofKey));
    merged.certifications = [...merged.certifications, ...extras];
  }

  // About highlights have no stable key, so the proof/link attachments are
  // applied positionally from the local copy.
  const localHighlights = localData.aboutContent.highlights;
  const mergedHighlights = merged.aboutContent?.highlights;
  if (Array.isArray(mergedHighlights) && mergedHighlights !== localHighlights) {
    merged.aboutContent = {
      ...merged.aboutContent,
      highlights: mergedHighlights.map((h, i) => {
        const { proofKey, proofLabel, link, linkLabel } = localHighlights[i] || {};
        return { proofKey, proofLabel, link, linkLabel, ...h };
      }),
    };
  }

  return merged;
}

export { isEmpty };
