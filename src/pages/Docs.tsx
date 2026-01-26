import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Bot,
  Book,
  Code,
  FileText,
  Database,
  MessageSquare,
  Settings,
  ArrowRight,
  ExternalLink,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const quickLinks = [
  {
    title: "Getting Started",
    description: "Set up your first workspace and AI assistant in 5 minutes.",
    icon: Book,
    href: "/docs/getting-started",
  },
  {
    title: "Document Upload",
    description: "Learn how to upload and index documents for Q&A.",
    icon: FileText,
    href: "/docs/documents",
  },
  {
    title: "Database Connection",
    description: "Connect your Postgres or MySQL database securely.",
    icon: Database,
    href: "/docs/database",
  },
  {
    title: "Widget Embedding",
    description: "Add the chat widget to your website with one line of code.",
    icon: MessageSquare,
    href: "/docs/widget",
  },
  {
    title: "API Reference",
    description: "Full REST API documentation for custom integrations.",
    icon: Code,
    href: "/docs/api",
  },
  {
    title: "Configuration",
    description: "Customize AI behavior, routing, and widget appearance.",
    icon: Settings,
    href: "/docs/configuration",
  },
];

const tutorials = [
  {
    title: "Build an HR Assistant",
    description: "Create an AI that answers employee questions about policies and leave balances.",
    time: "15 min",
  },
  {
    title: "E-commerce Order Tracking",
    description: "Let customers ask 'Where is my order?' and get real-time answers.",
    time: "20 min",
  },
  {
    title: "Internal Support Bot",
    description: "Reduce IT tickets by answering common questions automatically.",
    time: "10 min",
  },
];

export default function Docs() {
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
            <Link to="/docs" className="text-sm text-foreground hover:text-foreground transition-colors font-medium">
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
          <h1 className="text-4xl font-bold md:text-5xl mb-4">
            <span className="text-gradient">Documentation</span>
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto mb-8">
            Everything you need to set up, configure, and customize your AI
            assistant.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <Input
              placeholder="Search documentation..."
              className="pl-10 bg-background-shell border-border text-foreground placeholder:text-foreground-muted h-12"
            />
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Quick Links</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-brand/50 hover:shadow-elegant"
              >
                <div className="mb-4 inline-flex rounded-lg bg-brand/10 p-3 text-brand group-hover:scale-110 transition-transform">
                  <link.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  {link.title}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-foreground-secondary">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials */}
      <section className="py-12 bg-background-shell">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Tutorials</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {tutorials.map((tutorial, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 hover:border-brand/50 hover:shadow-elegant transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                    Tutorial
                  </span>
                  <span className="text-xs text-foreground-muted">{tutorial.time}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-foreground-secondary">
                  {tutorial.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Getting Started</h2>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-xl font-semibold mb-4">1. Create a Workspace</h3>
              <p className="text-foreground-secondary mb-6">
                After signing up, you'll be prompted to create your first
                workspace. A workspace is a container for your documents,
                database connections, and chatbot configurations.
              </p>

              <h3 className="text-xl font-semibold mb-4">2. Upload Documents</h3>
              <p className="text-foreground-secondary mb-6">
                Navigate to the Documents page and upload your PDFs, policies, or
                FAQs. Our system will automatically chunk and index them for
                semantic search.
              </p>

              <div className="p-4 rounded-xl bg-background-shell font-mono text-sm mb-6">
                <p className="text-foreground-muted mb-2">Supported formats:</p>
                <code className="text-brand">PDF, DOCX, TXT, MD (Markdown)</code>
              </div>

              <h3 className="text-xl font-semibold mb-4">3. Connect Database (Optional)</h3>
              <p className="text-foreground-secondary mb-6">
                If you want users to query operational data, connect your
                Postgres or MySQL database with read-only credentials.
              </p>

              <h3 className="text-xl font-semibold mb-4">4. Configure & Embed</h3>
              <p className="text-foreground-secondary mb-6">
                Customize your chatbot's behavior, then copy the embed code and
                paste it into your website.
              </p>

              <div className="p-4 rounded-xl bg-background-shell font-mono text-sm">
                <p className="text-foreground-muted mb-2">Embed code:</p>
                <code className="text-brand">
                  {'<script src="https://cdn.universalai.com/widget.js" data-workspace="YOUR_ID"></script>'}
                </code>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link to="/docs/getting-started">
                <Button className="bg-brand text-brand-foreground hover:bg-brand-dark gap-2">
                  Read Full Guide <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
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
