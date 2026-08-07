'use client';

import { useEffect, useState } from 'react';

/**
 * Types each phrase out, holds, deletes, then moves to the next.
 * With reduced motion it settles on the first phrase and stops.
 */
export function useTypingEffect(phrases, { reduced = false } = {}) {
  const list = Array.isArray(phrases) && phrases.length ? phrases : [''];
  const [text, setText] = useState(list[0]);

  useEffect(() => {
    if (reduced) {
      setText(list[0]);
      return undefined;
    }

    let i = 0;
    let j = 0;
    let deleting = false;
    let timer;

    setText('');

    const tick = () => {
      const word = list[i];
      j = deleting ? j - 1 : j + 1;
      setText(word.slice(0, j));

      let delay = deleting ? 34 : 62;
      if (!deleting && j === word.length) {
        deleting = true;
        delay = 1700;
      } else if (deleting && j === 0) {
        deleting = false;
        i = (i + 1) % list.length;
        delay = 320;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, list.join('|')]);

  return text;
}
