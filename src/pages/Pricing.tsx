import { Button } from "@/components/ui/button";
import { PlanCard } from "@/components/ui/PlanCard";
import { Link } from "react-router-dom";
import { Bot, Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for testing and small projects",
    features: [
      "100 queries/month",
      "1 document upload (max 5MB)",
      "Basic widget customization",
      "Community support",
      "Public knowledge base access",
    ],
  },
  {
    name: "Starter",
    price: "₹1,999",
    description: "For growing teams and websites",
    features: [
      "5,000 queries/month",
      "50 document uploads (max 25MB each)",
      "Custom widget branding",
      "Email support (48h response)",
      "Basic analytics dashboard",
      "2 team members",
    ],
  },
  {
    name: "Pro",
    price: "₹7,999",
    description: "Full power for serious businesses",
    features: [
      "50,000 queries/month",
      "Unlimited documents",
      "Database integration (Postgres/MySQL)",
      "Text-to-SQL queries",
      "Advanced analytics & reports",
      "Priority support (24h response)",
      "10 team members",
      "Custom roles & permissions",
      "API access",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited queries",
      "Unlimited documents & databases",
      "SSO & SAML authentication",
      "Custom SLA (99.9% uptime)",
      "Dedicated success manager",
      "Unlimited team members",
      "Audit logs & compliance",
      "On-premise deployment option",
      "Custom integrations",
    ],
  },
];

const faqs = [
  {
    question: "Can I try before I buy?",
    answer:
      "Yes! Our Free plan gives you 100 queries per month with full functionality. No credit card required.",
  },
  {
    question: "What happens if I exceed my query limit?",
    answer:
      "We'll notify you when you reach 80% of your limit. You can upgrade anytime, or queries will be paused until the next billing cycle.",
  },
  {
    question: "Is my database data secure?",
    answer:
      "Absolutely. We only require read-only database credentials. We never store your actual data—only query results for the current session.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.",
  },
  {
    question: "Do you offer annual billing?",
    answer:
      "Yes! Annual plans get 2 months free. Contact sales for enterprise annual agreements.",
  },
];

const comparisonFeatures = [
  { feature: "Queries/month", free: "100", starter: "5,000", pro: "50,000", enterprise: "Unlimited" },
  { feature: "Document uploads", free: "1", starter: "50", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Database integration", free: "—", starter: "—", pro: "✓", enterprise: "✓" },
  { feature: "Text-to-SQL", free: "—", starter: "—", pro: "✓", enterprise: "✓" },
  { feature: "Team members", free: "1", starter: "2", pro: "10", enterprise: "Unlimited" },
  { feature: "Custom branding", free: "—", starter: "✓", pro: "✓", enterprise: "✓" },
  { feature: "Analytics", free: "Basic", starter: "Basic", pro: "Advanced", enterprise: "Advanced" },
  { feature: "API access", free: "—", starter: "—", pro: "✓", enterprise: "✓" },
  { feature: "SSO/SAML", free: "—", starter: "—", pro: "—", enterprise: "✓" },
  { feature: "Audit logs", free: "—", starter: "—", pro: "—", enterprise: "✓" },
  { feature: "Support", free: "Community", starter: "Email", pro: "Priority", enterprise: "Dedicated" },
];

export default function Pricing() {
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
            <Link to="/pricing" className="text-sm text-foreground hover:text-foreground transition-colors font-medium">
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
          <h1 className="text-4xl font-bold md:text-5xl mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-background-shell">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Compare <span className="text-gradient">Plans</span>
          </h2>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-foreground-secondary font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-foreground font-medium">Free</th>
                  <th className="text-center py-4 px-4 text-foreground font-medium">Starter</th>
                  <th className="text-center py-4 px-4">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-foreground font-medium">Pro</span>
                      <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                        Popular
                      </span>
                    </span>
                  </th>
                  <th className="text-center py-4 px-4 text-foreground font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground-secondary">{row.feature}</td>
                    <td className="text-center py-4 px-4 text-foreground-secondary">{row.free}</td>
                    <td className="text-center py-4 px-4 text-foreground-secondary">{row.starter}</td>
                    <td className="text-center py-4 px-4 text-foreground">{row.pro}</td>
                    <td className="text-center py-4 px-4 text-foreground">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-foreground-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background-shell">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to <span className="text-gradient">Get Started</span>?
          </h2>
          <p className="text-foreground-secondary mb-8 max-w-xl mx-auto">
            Start with our free plan and upgrade as you grow.
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
