import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Link } from "react-router-dom";
import {
  Bot,
  FileText,
  Database,
  Zap,
  BarChart3,
  Shield,
  MessageSquare,
  ArrowRight,
  Lock,
  Users,
  Globe,
  Sparkles,
  Code,
  Layers,
} from "lucide-react";

const mainFeatures = [
  {
    title: "Document Q&A (RAG)",
    description:
      "Upload PDFs, policies, FAQs, and knowledge base articles. Our AI uses Retrieval-Augmented Generation to find and synthesize answers from your documents with source citations.",
    icon: FileText,
    iconColor: "brand" as const,
    details: [
      "Supports PDF, DOCX, TXT, and Markdown",
      "Automatic chunking and embedding",
      "Source citations for every answer",
      "Re-index on document updates",
    ],
  },
  {
    title: "Database Q&A (Text-to-SQL)",
    description:
      "Connect your Postgres or MySQL database with read-only credentials. Users ask questions in plain English, and our AI translates them to safe SQL queries.",
    icon: Database,
    iconColor: "accent" as const,
    details: [
      "Postgres & MySQL support",
      "Read-only access only (SELECT)",
      "Table-level access control",
      "Query explanation & results preview",
    ],
  },
  {
    title: "Intelligent Router",
    description:
      "Our AI automatically determines whether a question should be answered from documents, database, or both. No manual configuration needed.",
    icon: Zap,
    iconColor: "info" as const,
    details: [
      "Automatic intent detection",
      "Hybrid answers from multiple sources",
      "Configurable routing priorities",
      "Fallback handling",
    ],
  },
];

const additionalFeatures = [
  {
    title: "Embeddable Widget",
    description:
      "One line of code to add a beautiful chat widget to any website. Fully customizable to match your brand.",
    icon: Code,
    iconColor: "brand" as const,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Track queries, success rates, popular questions, and usage patterns in real-time.",
    icon: BarChart3,
    iconColor: "accent" as const,
  },
  {
    title: "Multi-tenant Architecture",
    description:
      "Each workspace is completely isolated. Perfect for SaaS and enterprise deployments.",
    icon: Layers,
    iconColor: "info" as const,
  },
  {
    title: "Role-based Access",
    description:
      "Platform admins, company admins, team members, and visitors—all with appropriate permissions.",
    icon: Users,
    iconColor: "success" as const,
  },
  {
    title: "Enterprise Security",
    description:
      "SSO/SAML, audit logs, data encryption at rest and in transit, SOC 2 compliance.",
    icon: Shield,
    iconColor: "brand" as const,
  },
  {
    title: "API Access",
    description:
      "Full REST API for custom integrations. Embed AI answers anywhere in your stack.",
    icon: Globe,
    iconColor: "accent" as const,
  },
];

export default function Features() {
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
            <Link to="/features" className="text-sm text-foreground hover:text-foreground transition-colors font-medium">
              Features
            </Link>
            <Link to="/pricing" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/docs" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link to="/security" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
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
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-shell px-4 py-1.5 mb-6">
            <Sparkles className="h-4 w-4 text-brand" />
            <span className="text-sm text-foreground-secondary">
              Powered by advanced AI
            </span>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl mb-4">
            Everything You Need to Build{" "}
            <span className="text-gradient">AI Assistants</span>
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            A complete platform for connecting documents and databases to an
            intelligent chatbot your users will love.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className={`grid gap-12 lg:grid-cols-2 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div
                    className={`inline-flex rounded-lg p-3 mb-4 ${
                      feature.iconColor === "brand"
                        ? "bg-brand/10 text-brand"
                        : feature.iconColor === "accent"
                        ? "bg-accent/10 text-accent"
                        : "bg-info/10 text-info"
                    }`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                  <p className="text-lg text-foreground-secondary mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand" />
                        <span className="text-foreground-secondary">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="rounded-2xl border border-border bg-background-surface p-6">
                    {/* Feature illustration */}
                    {index === 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background-shell">
                          <FileText className="h-8 w-8 text-brand" />
                          <div>
                            <p className="font-medium">Company_Policies.pdf</p>
                            <p className="text-sm text-foreground-muted">2.4 MB • 45 pages • Indexed</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background-shell">
                          <FileText className="h-8 w-8 text-brand" />
                          <div>
                            <p className="font-medium">Employee_Handbook.pdf</p>
                            <p className="text-sm text-foreground-muted">1.8 MB • 32 pages • Indexed</p>
                          </div>
                        </div>
                        <div className="mt-4 p-4 rounded-lg bg-brand/5 border border-brand/20">
                          <p className="text-sm text-foreground-secondary mb-2">
                            <span className="text-foreground font-medium">User asks:</span> "What is our remote work policy?"
                          </p>
                          <p className="text-sm text-brand">
                            AI finds answer in Company_Policies.pdf, page 12...
                          </p>
                        </div>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background-shell">
                          <Database className="h-8 w-8 text-accent" />
                          <div>
                            <p className="font-medium">orders_db (Postgres)</p>
                            <p className="text-sm text-foreground-muted">Connected • Read-only</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-background-shell font-mono text-sm">
                          <p className="text-foreground-muted mb-2">Generated SQL:</p>
                          <code className="text-accent">
                            SELECT COUNT(*) FROM orders<br />
                            WHERE shipped_at {'>'} NOW() - INTERVAL '7 days';
                          </code>
                        </div>
                        <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                          <p className="text-sm">
                            <span className="text-foreground font-medium">Result:</span>{" "}
                            <span className="text-accent font-bold">2,847 orders</span> shipped this week
                          </p>
                        </div>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-8">
                          <div className="text-center">
                            <div className="inline-flex rounded-lg bg-brand/10 p-3 mb-2">
                              <FileText className="h-6 w-6 text-brand" />
                            </div>
                            <p className="text-sm text-foreground-muted">Documents</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <Zap className="h-8 w-8 text-info mb-2" />
                            <p className="text-xs text-info font-medium">AI Router</p>
                          </div>
                          <div className="text-center">
                            <div className="inline-flex rounded-lg bg-accent/10 p-3 mb-2">
                              <Database className="h-6 w-6 text-accent" />
                            </div>
                            <p className="text-sm text-foreground-muted">Database</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-info/5 border border-info/20 text-center">
                          <p className="text-sm text-foreground-secondary">
                            "What is the leave policy and how many days do I have left?"
                          </p>
                          <p className="text-xs text-info mt-2">
                            → Routed to: Documents + Database
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-background-shell">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              And So Much <span className="text-gradient">More</span>
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Everything you need to deploy, manage, and scale your AI assistant.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {additionalFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to <span className="text-gradient">Get Started</span>?
          </h2>
          <p className="text-foreground-secondary mb-8 max-w-xl mx-auto">
            Start with our free plan and see the power of Universal AI.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand-dark gap-2">
              Start Free Today <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
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
