
"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { ReferenceForm } from "@/components/reference-form";
import { mockReferences } from "@/lib/mock-data";
import type { Reference } from "@/types";

export default function EditReferencePage({ params }: { params: { id: string }}) {
  const { id } = params;
  const [reference, setReference] = React.useState<Reference | undefined>(undefined);

  // In a real app, you'd fetch from a backend. Here we simulate it.
  React.useEffect(() => {
    const foundReference = mockReferences.find(r => r.id === id);
    setReference(foundReference);
  }, [id]);


  if (!reference) {
    // In a real app, show a not found page
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 container mx-auto p-4 md:p-8 text-center">
                <p>Loading or reference not found...</p>
            </main>
        </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <ReferenceForm referenceToEdit={reference} />
      </main>
    </div>
  );
}
