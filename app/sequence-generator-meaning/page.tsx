import { JsonLd } from "@/components/seo/json-ld";
import { GuidePage } from "@/components/content/guide-page";
import { buildGuideStructuredData } from "@/lib/seo";
import { MeaningDiagram } from "@/components/content/meaning-diagram";
import { buildGuideMetadata, getSequenceGuide } from "@/lib/content/sequence-guides";

const guide = getSequenceGuide("sequence-generator-meaning");

export const metadata = buildGuideMetadata(guide);

export default function Page() {
  return (
    <>
      <JsonLd data={buildGuideStructuredData(guide)} />
      <GuidePage guide={guide}>
        <MeaningDiagram />
      </GuidePage>
    </>
  );
}
