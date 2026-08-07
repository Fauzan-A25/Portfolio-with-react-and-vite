import PortfolioApp from '@/components/PortfolioApp';
import { getPortfolioData } from '@/lib/portfolio';
import { buildPortfolioSchema } from '@/lib/schema';

// Regenerate on the same cadence as the sheet fetch (REVALIDATE_SECONDS in
// lib/portfolio.js), so the HTML crawlers see and the data inside it never
// disagree. Next requires a literal here, so the two must be kept in step.
export const revalidate = 3600;

export default async function Page() {
  const data = await getPortfolioData();
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
      <PortfolioApp initialData={data} />
    </>
  );
}
