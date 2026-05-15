import { FaqContent } from "@/components/content/faq-content";
import { JsonLd } from "@/components/seo/json-ld";
import { getGeneratorFaq } from "@/lib/content/generator-info";
import { buildFaqMetadata, buildFaqStructuredData } from "@/lib/seo";

const data = getGeneratorFaq("informatica-sequence-generator");

export const metadata = buildFaqMetadata(data);

export default function Page() {
  return (
    <>
      <JsonLd data={buildFaqStructuredData(data)} />
      <FaqContent faq={data} />
    </>
  );
}
