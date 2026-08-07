import PortfolioApp from '@/components/PortfolioApp';
import { getPortfolioData } from '@/lib/portfolio';
import { buildPortfolioSchema } from '@/lib/schema';

// The content lives in src/data/portfolio.json, so the page is fully static:
// prerendered once at build time, served from the edge, and identical for
// every visitor and every crawler. Publishing an edit means a redeploy.
export const dynamic = 'force-static';

export default function Page() {
  const data = getPortfolioData();
  const schema = buildPortfolioSchema(data);

  return (
    <>
      <script
        type="application/ld+json"
        // Data is authored by us, not user input; the only character that can
        // break out of a script block is escaped below.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <PortfolioApp data={data} />
    </>
  );
}
