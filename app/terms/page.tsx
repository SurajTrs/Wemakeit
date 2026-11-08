import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { terms } from "@/content/legal";

export const metadata = legalMetadata(terms);

export default function Page() {
  return <LegalPage doc={terms} />;
}
