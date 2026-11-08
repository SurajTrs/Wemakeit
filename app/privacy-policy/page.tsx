import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { privacy } from "@/content/legal";

export const metadata = legalMetadata(privacy);

export default function Page() {
  return <LegalPage doc={privacy} />;
}
