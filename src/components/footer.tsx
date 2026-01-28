import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">RefVault</h3>
            <p className="text-sm text-muted-foreground">
              Secure reference management for the care industry.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/request-reference" className="text-muted-foreground hover:text-foreground transition-colors">
                  Request Reference
                </Link>
              </li>
              <li>
                <Link href="/agency" className="text-muted-foreground hover:text-foreground transition-colors">
                  For Agencies
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:support@refvault.co.uk"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@refvault.co.uk"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} RefVault. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <a href="mailto:support@refvault.co.uk" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
