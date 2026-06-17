import type { ReactNode } from "react";
import { SequenceGenerator } from "@/components/sequence-generator";

export function SequenceGeneratorTool({ children }: { children?: ReactNode }) {
  return <SequenceGenerator>{children}</SequenceGenerator>;
}

export default SequenceGeneratorTool;
