import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Bot,
  Shield,
  Lock,
  Eye,
  Server,
  Key,
  FileCheck,
  Users,
  Database,
  ArrowRight,
  Check,
  AlertTriangle,
} from "lucide-react";

const securityFeatures = [
  {
    title: "Read-Only Database Access",
    description:
      "We only require SELECT permissions. No INSERT, UPDATE, DELETE, or DROP commands are ever executed.",
    icon: Database,
    highlight: true,
  },
  {
    title: "Data Isolation",
    description:
      "Each workspace is completely isolated. No cross-company data access is possible.",
    icon: Server,
  },
  {
    title: "Encryption at Rest",
    description:
      "All data is encrypted at rest using AES-256 encryption.",
    icon: Lock,
  },
  {
    title: "Encryption in Transit",
    description:
      "All connections use TLS 1.3 for secure data transmission.",
    icon: Shield,
  },
  {
    title: "Role-Based Access Control",
    description:
      "Granular permissions for platform admins, company admins, team members, and visitors.",
    icon: Users,
  },
  {
    title: "Audit Logs",
    description:
      "Complete audit trail of all queries, access, and configuration changes.",
    icon: FileCheck,
  },
  {
    title: "SSO & SAML",
    description:
      "Enterprise-grade single sign-on integration with your identity provider.",
    icon: Key,
  },
  {
    title: "SOC 2 Compliance",
    description:
      "We are SOC 2 Type II compliant with annual third-party audits.",
    icon: Eye,
  },
];

const dbSafetyPoints = [
  "Only SELECT queries are allowed—no data modification",
  "Table-level access control to restrict which tables AI can query",
  "Query previews before execution (optional)",
  "Rate limiting to prevent abuse",
  "Connection credentials are encrypted and never stored in plaintext",
  "Read-only database user recommended (not just permissions)",
];

export default function Security() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
              <Bot className="h-5 w-5 text-brand-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Universal AI</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link to="/features" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/docs" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link to="/security" className="text-sm text-foreground hover:text-foreground transition-colors font-medium">
              Security
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-foreground-secondary hover:text-foreground">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-brand text-brand-foreground hover:bg-brand-dark">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 mb-6">
            <Shield className="h-4 w-4 text-success" />
            <span className="text-sm text-success">Enterprise-grade security</span>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl mb-4">
            Security You Can <span className="text-gradient">Trust</span>
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            We take security seriously. Your data is protected with
            industry-leading encryption, access controls, and compliance
            certifications.
          </p>
        </div>
      </section>

      {/* Database Safety Section */}
      <section className="py-20 bg-background-shell">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="rounded-xl bg-brand/10 p-4">
                <Database className="h-8 w-8 text-brand" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Database Security</h2>
                <p className="text-foreground-secondary">
                  How we protect your database connections
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              {/* Warning banner */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-warning/5 border border-warning/20 mb-8">
                <AlertTriangle className="h-6 w-6 text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground mb-1">
                    Read-Only Access Only
                  </p>
                  <p className="text-sm text-foreground-secondary">
                    Universal AI requires only read-only database credentials. We
                    never execute INSERT, UPDATE, DELETE, or DROP commands. Your
                    data is safe.
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {dbSafetyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
                      <Check className="h-3 w-3 text-success" />
                    </div>
                    <span className="text-foreground-secondary">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 rounded-xl bg-background-shell font-mono text-sm">
                <p className="text-foreground-muted mb-2">
                  Recommended database user setup:
                </p>
                <code className="text-brand">
                  CREATE USER universal_ai WITH PASSWORD 'secure_password';<br />
                  GRANT SELECT ON ALL TABLES IN SCHEMA public TO universal_ai;
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive <span className="text-gradient">Security</span>
            </h2>
            <p className="text-foreground-secondary max-w-xl mx-auto">
              Multiple layers of protection for your data and users.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className={`rounded-xl border p-6 transition-all duration-300 hover:border-brand/50 hover:shadow-elegant ${
                  feature.highlight
                    ? "border-brand/30 bg-brand/5"
                    : "border-border bg-card"
                }`}
              >
                <div
                  className={`mb-4 inline-flex rounded-lg p-3 ${
                    feature.highlight
                      ? "bg-brand/20 text-brand"
                      : "bg-brand/10 text-brand"
                  }`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-background-shell">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Compliance & <span className="text-gradient">Certifications</span>
            </h2>
            <p className="text-foreground-secondary mb-12">
              We maintain the highest standards of security and compliance.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="text-4xl font-bold text-brand mb-2">SOC 2</div>
                <p className="text-sm text-foreground-secondary">
                  Type II Certified
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="text-4xl font-bold text-brand mb-2">GDPR</div>
                <p className="text-sm text-foreground-secondary">
                  Compliant
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="text-4xl font-bold text-brand mb-2">ISO</div>
                <p className="text-sm text-foreground-secondary">
                  27001 Certified
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Questions About <span className="text-gradient">Security</span>?
          </h2>
          <p className="text-foreground-secondary mb-8 max-w-xl mx-auto">
            Our security team is happy to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand-dark gap-2">
                Contact Security Team <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="/security-whitepaper.pdf" target="_blank">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-background-shell"
              >
                Download Security Whitepaper
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background-shell py-8">
        <div className="container mx-auto px-4 text-center text-sm text-foreground-muted">
          © 2024 Universal AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
