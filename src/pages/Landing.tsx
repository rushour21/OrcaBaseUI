import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { PlanCard } from "@/components/ui/PlanCard";
import { Link } from "react-router-dom";
import Logo from "@/assets/Logo.png";
import {
  FileText,
  Database,
  Bot,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  MessageSquare,
  Upload,
  Code,
  Users,
  Building2,
  ShoppingCart,
  Headphones,
  Check,
} from "lucide-react";

const features = [
  {
    title: "Document Q&A (RAG)",
    description:
      "Upload PDFs, policies, and FAQs. AI answers questions by searching your documents intelligently.",
    icon: FileText,
    iconColor: "brand" as const,
  },
  {
    title: "Database Q&A (Text-to-SQL)",
    description:
      "Connect read-only databases. AI translates natural language to SQL and returns answers.",
    icon: Database,
    iconColor: "accent" as const,
  },
  {
    title: "Intelligent Router",
    description:
      "Automatically routes questions to documents or database based on context and intent.",
    icon: Zap,
    iconColor: "info" as const,
  },
  {
    title: "Embeddable Widget",
    description:
      "One-line embed code. Customizable chat widget that matches your brand seamlessly.",
    icon: Bot,
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
    title: "Enterprise Security",
    description:
      "Role-based access, read-only database access, data isolation, and audit logs.",
    icon: Shield,
    iconColor: "success" as const,
  },
];

const steps = [
  {
    number: "01",
    title: "Connect Documents",
    description: "Upload PDFs, policies, FAQs, and knowledge base articles.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Connect Database",
    description: "Link your Postgres/MySQL database with read-only credentials.",
    icon: Database,
  },
  {
    number: "03",
    title: "Embed Widget",
    description: "Add one line of code to your website to activate the chatbot.",
    icon: Code,
  },
  {
    number: "04",
    title: "Users Ask Questions",
    description: "End users get instant answers from your documents and data.",
    icon: MessageSquare,
  },
];

const useCases = [
  {
    title: "HR & Employee Support",
    icon: Users,
    examples: [
      "What is our leave policy?",
      "How many sick days do I have left?",
      "What's the remote work policy?",
    ],
  },
  {
    title: "E-commerce Operations",
    icon: ShoppingCart,
    examples: [
      "Where is my order #12345?",
      "How many orders shipped today?",
      "Show revenue this month",
    ],
  },
  {
    title: "Customer Support",
    icon: Headphones,
    examples: [
      "Why was my ticket delayed?",
      "Show pending support tickets",
      "What's our refund policy?",
    ],
  },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for testing and small projects",
    features: [
      "100 queries/month",
      "1 document upload",
      "Basic widget",
      "Community support",
    ],
  },
  {
    name: "Starter",
    price: "₹1,999",
    description: "For growing teams and websites",
    features: [
      "5,000 queries/month",
      "50 document uploads",
      "Custom widget branding",
      "Email support",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    price: "₹7,999",
    description: "Full power for serious businesses",
    features: [
      "50,000 queries/month",
      "Unlimited documents",
      "Database integration",
      "Advanced analytics",
      "Priority support",
      "Team roles",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited queries",
      "SSO & SAML",
      "Custom SLA",
      "Dedicated support",
      "Audit logs",
      "On-premise option",
    ],
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="OrcaBase Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-lg" />
            <p className="text-lg md:text-xl font-bold text-foreground">ORCA<span className="text-gradient">BASE</span></p>
          </Link>

          <div className="hidden items-center gap-4 lg:gap-8 md:flex">
            <Link to="/features" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
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

          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost" className="text-foreground-secondary hover:text-foreground">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-brand text-brand-foreground hover:bg-brand-dark text-sm md:text-base">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--brand)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-5" />

        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left: Content */}
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background-shell px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                <span className="text-sm text-foreground-secondary">
                  Now with Text-to-SQL support
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Universal AI{" "}
                <span className="text-gradient">Website & Database</span>{" "}
                Assistant
              </h1>

              <p className="mb-8 text-lg text-foreground-secondary leading-relaxed">
                Let any website answer questions from its documents and database,
                securely and in plain language. One platform, infinite
                possibilities.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-brand text-brand-foreground hover:bg-brand-dark gap-2"
                  >
                    Start Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-border text-foreground hover:bg-background-shell"
                  >
                    Book a Demo
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand" />
                  <span className="text-sm text-foreground-secondary">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand" />
                  <span className="text-sm text-foreground-secondary">Read-only access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand" />
                  <span className="text-sm text-foreground-secondary">SOC 2 compliant</span>
                </div>
              </div>
            </div>

            {/* Right: Dashboard Mockup */}
            <div className="relative">
              <div className="relative rounded-2xl border border-border bg-background-surface p-4 shadow-elegant glow-brand">
                {/* Mockup header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-error" />
                  <div className="h-3 w-3 rounded-full bg-warning" />
                  <div className="h-3 w-3 rounded-full bg-success" />
                </div>

                {/* Chat mockup */}
                <div className="space-y-4 p-4 rounded-xl bg-background-shell">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-background-surface border border-border flex items-center justify-center">
                      <Bot className="h-4 w-4 text-brand" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-background-surface border-l-2 border-brand px-4 py-3 max-w-[80%]">
                      <p className="text-sm">Hi! I can answer questions about your company policies and database. How can I help?</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="rounded-2xl rounded-tr-sm bg-brand text-brand-foreground px-4 py-3 max-w-[80%]">
                      <p className="text-sm">How many orders did we ship this week?</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-background-surface border border-border flex items-center justify-center">
                      <Bot className="h-4 w-4 text-brand" />
                    </div>
                    <div className="space-y-2 max-w-[80%]">
                      <div className="rounded-2xl rounded-tl-sm bg-background-surface border-l-2 border-brand px-4 py-3">
                        <p className="text-sm">Based on your orders database, you shipped <strong className="text-brand">2,847 orders</strong> this week, a 12% increase from last week.</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-2 py-1 text-xs">
                          🗄️ orders_db
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating widget preview */}
              <div className="absolute -bottom-4 -right-4 animate-float">
                <div className="rounded-full bg-brand p-4 shadow-lg glow-brand">
                  <MessageSquare className="h-6 w-6 text-brand-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Get your AI assistant up and running in minutes, not months.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-brand to-transparent" />
                )}

                <div className="rounded-xl border border-border bg-card p-6 card-hover">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="text-4xl font-bold text-brand/20">{step.number}</span>
                    <div className="rounded-lg bg-brand/10 p-2 text-brand group-hover:scale-110 transition-transform">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-foreground-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-background-shell">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Built for <span className="text-gradient">Every Team</span>
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              From HR to E-commerce, see how teams use Universal AI daily.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 card-hover"
              >
                <div className="mb-4 inline-flex rounded-lg bg-brand/10 p-3 text-brand">
                  <useCase.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-semibold">{useCase.title}</h3>
                <ul className="space-y-3">
                  {useCase.examples.map((example, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground-secondary"
                    >
                      <MessageSquare className="h-4 w-4 mt-0.5 text-brand shrink-0" />
                      <span>"{example}"</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Everything You <span className="text-gradient">Need</span>
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              A complete platform for AI-powered knowledge and data access.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background-shell" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Ready to <span className="text-gradient">Get Started</span>?
            </h2>
            <p className="text-lg text-foreground-secondary mb-8">
              Join thousands of companies using Universal AI to power their
              customer and employee experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-brand text-brand-foreground hover:bg-brand-dark gap-2"
                >
                  Start Free Today <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-background-shell"
                >
                  Schedule a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background-shell py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
                  <Bot className="h-5 w-5 text-brand-foreground" />
                </div>
                <span className="text-lg font-bold">Universal AI</span>
              </Link>
              <p className="text-sm text-foreground-secondary">
                The universal AI assistant for websites and databases.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground-secondary">
                <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link to="/changelog" className="hover:text-foreground transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground-secondary">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground-secondary">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                <li><Link to="/security" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground-muted">
              © 2024 Universal AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-foreground-secondary hover:text-foreground transition-colors">
                <Building2 className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
