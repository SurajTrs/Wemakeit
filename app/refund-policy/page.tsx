import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { refund } from "@/content/legal";

export const metadata = legalMetadata(refund);

export default function Page() {
  return <LegalPage doc={refund} />;
}
