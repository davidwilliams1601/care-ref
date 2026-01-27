
import { Header } from "@/components/header";
import { ReferenceRequestForm } from "@/components/reference-request-form";

export default function RequestReferencePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <ReferenceRequestForm />
      </main>
    </div>
  );
}
