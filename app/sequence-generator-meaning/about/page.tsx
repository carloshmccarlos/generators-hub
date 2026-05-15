import { AboutContent } from "@/components/content/about-content";
import { JsonLd } from "@/components/seo/json-ld";
import { getGeneratorAbout } from "@/lib/content/generator-info";
import { buildAboutMetadata, buildAboutStructuredData } from "@/lib/seo";

const data = getGeneratorAbout("sequence-generator-meaning");

export const metadata = buildAboutMetadata(data);

export default function Page() {
  return (
    <>
      <JsonLd data={buildAboutStructuredData(data)} />
      <AboutContent about={data} />
    </>
  );
}
