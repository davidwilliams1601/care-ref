import { FileText } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">RefVault</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
