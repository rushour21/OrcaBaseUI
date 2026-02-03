import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { PlanCard } from "@/components/ui/PlanCard";
import { BentoCard } from "@/components/ui/BentoCard";
import { TypewriterTerminal } from "@/components/ui/TypewriterTerminal";
import { DataStreamAnimation } from "@/components/ui/DataStreamAnimation";
import { FloatingWidget } from "@/components/ui/FloatingWidget";
import { SourceSelector } from "@/components/ui/SourceSelector";
import { PerformanceMetrics } from "@/components/ui/PerformanceMetrics";
import { Link } from "react-router-dom";
import Logo from "@/assets/Logo.png";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
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
  GitBranch,
  Sun,
  Moon,
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
    title: "Connect documents",
    description: "Upload PDFs, policies, FAQs, and knowledge base articles.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Connect database",
    description: "Link your Postgres/MySQL database with read-only credentials.",
    icon: Database,
  },
  {
    number: "03",
    title: "Embed widget",
    description: "Add one line of code to your website or portal.",
    icon: Code,
  },
  {
    number: "04",
    title: "Start asking",
    description: "Users get instant answers from your documents and data.",
    icon: MessageSquare,
  },
];

const useCases = [
  {
    title: "HR & Employee Support",
    icon: Users,
    outcome: "Reduce internal tickets and give employees instant answers.",
    examples: [
      "What is our leave policy?",
      "How many sick days do I have left?",
      "What's the remote work policy?",
    ],
  },
  {
    title: "E-commerce Operations",
    icon: ShoppingCart,
    outcome: "Unlock real-time answers from your orders and revenue data.",
    examples: [
      "Where is my order #12345?",
      "How many orders shipped today?",
      "Show revenue this month",
    ],
  },
  {
    title: "Customer Support",
    icon: Headphones,
    outcome: "Deflect repetitive queries while keeping humans in the loop.",
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
  const { theme, setTheme } = useTheme();
  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={Logo}
              alt="OrcaBase Logo"
              className="h-10 w-10 md:h-12 md:w-12 rounded-lg"
            />
            <p className="text-lg md:text-xl font-bold">
              ORCA<span className="text-gradient">BASE</span>
            </p>
          </Link>

          <div className="hidden items-center gap-4 lg:gap-8 md:flex">
            <Link
              to="/features"
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/docs"
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <Link
              to="/security"
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              Security
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground-secondary hover:text-foreground hover:bg-background-shell"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Link to="/login" className="hidden sm:block">
              <Button
                variant="ghost"
                className="text-foreground-secondary hover:text-foreground"
              >
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-brand text-brand-foreground hover:bg-brand-dark text-sm md:text-base transition-all duration-200 active:scale-95 hover:shadow-lg">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-32">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--brand)/0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-5" />

        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] lg:gap-10 items-center">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background-shell px-4 py-1.5 text-xs text-foreground-secondary">
                <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                <span>Now with Text-to-SQL support</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
                Turn your docs and databases into a{" "}
                <span className="text-gradient">24/7 AI assistant</span>
              </h1>

              <p className="text-base md:text-lg text-foreground-secondary leading-relaxed">
                Connect PDFs and databases, embed one widget, and let AI answer
                customer and employee questions in plain language — with
                read-only, enterprise-grade security.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full bg-brand text-brand-foreground hover:bg-brand-dark gap-2 transition-all duration-200 active:scale-95 hover:shadow-lg"
                  >
                    Start Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/demo" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-background-shell transition-all duration-200 active:scale-95"
                  >
                    Book a Live Demo
                  </Button>
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
                <div className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-brand" />
                  <span>Set up in under 10 minutes</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-brand" />
                  <span>Read-only database access</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-brand" />
                  <span>No credit card required</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Typewriter Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <TypewriterTerminal />
              <FloatingWidget />
            </motion.div>
          </div>

          {/* Data Stream Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <DataStreamAnimation />
          </motion.div>
        </div>
      </section>

      {/* Performance Metrics */}
      <PerformanceMetrics />

      {/* Source Selector */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <SourceSelector />
        </div>
      </section>

      {/* Problem → solution */}
      <section className="py-16 border-t border-border bg-background">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,1.2fr),minmax(0,0.9fr)] items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Your docs and dashboards weren’t built for quick answers
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-foreground-secondary">
              <li>
                • Employees dig through PDFs and Notion pages to find basic
                policies.
              </li>
              <li>
                • Managers ping analysts for “one more” revenue or orders query.
              </li>
              <li>
                • Support teams answer the same questions across email, chat,
                and tickets.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-brand/30 bg-brand/5 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-brand">
              Universal AI, in one line
            </h3>
            <p className="text-sm text-foreground-secondary">
              Connect your knowledge base and database once. Embed a widget on
              your site or portal. Universal AI routes every question to the
              right source and returns audited, read-only answers.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-brand mb-3">
              Setup in 4 steps
            </p>
            <h2 className="text-3xl font-bold md:text-4xl mb-3">
              Go live in an afternoon
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Connect your sources, drop in a line of code, and let Universal AI
              handle the rest.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-brand/60 to-transparent" />
                )}

                <div className="rounded-xl border border-border bg-card p-6 card-hover relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-brand/5 via-transparent to-accent/10" />
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-4">
                      <span className="text-4xl font-bold text-brand/20">
                        {step.number}
                      </span>
                      <div className="rounded-lg bg-brand/10 p-2 text-brand group-hover:scale-110 transition-transform">
                        <step.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 bg-background-shell">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-3">
              Built for <span className="text-gradient">every team</span>
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              HR, support, ops, and leadership all get the answers they need
              from one assistant.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 card-hover flex flex-col"
              >
                <div className="mb-4 inline-flex rounded-lg bg-brand/10 p-3 text-brand">
                  <useCase.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{useCase.title}</h3>
                <p className="mb-4 text-sm text-foreground-secondary">
                  {useCase.outcome}
                </p>
                <div className="mt-auto space-y-2">
                  {useCase.examples.map((example, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2 rounded-full bg-background-shell px-3 py-2 text-xs text-foreground-secondary"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-brand shrink-0" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grouped - Bento Grid */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-3">
              Everything you{" "}
              <span className="text-gradient">need in one place</span>
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Documents, databases, analytics, and security — built into a
              single, production-ready platform.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Intelligent Router - Large 2x2 */}
            <BentoCard
              title="Intelligent Router"
              description="Automatically routes questions to documents or database based on context and intent. Watch the AI decide in real-time."
              icon={Zap}
              iconColor="info"
              size="large"
            >
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background-shell border border-border">
                  <span className="text-xs text-foreground-secondary">
                    "What's our refund policy?"
                  </span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FileText className="h-4 w-4 text-brand" />
                  </motion.div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background-shell border border-border">
                  <span className="text-xs text-foreground-secondary">
                    "Show orders from last week"
                  </span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Database className="h-4 w-4 text-accent" />
                  </motion.div>
                </div>
                <div className="flex items-center gap-2 justify-center pt-2">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-success"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-success font-medium">
                    Auto-routing active
                  </span>
                </div>
              </div>
            </BentoCard>

            {/* Security - Square 1x1 */}
            <BentoCard
              title="Enterprise Security"
              description="Role-based access, read-only database access, data isolation, and audit logs."
              icon={Shield}
              iconColor="success"
              size="square"
            >
              <div className="flex items-center justify-center pt-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="rounded-full bg-success/10 p-4"
                >
                  <Shield className="h-8 w-8 text-success" />
                </motion.div>
              </div>
            </BentoCard>

            {/* Analytics - Square 1x1 */}
            <BentoCard
              title="Analytics Dashboard"
              description="Track queries, success rates, popular questions, and usage patterns in real-time."
              icon={BarChart3}
              iconColor="accent"
              size="square"
            >
              <div className="flex items-center justify-center pt-4">
                <motion.div
                  className="space-y-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {[60, 80, 45, 90, 70].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex items-end gap-1"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <div
                        className="w-8 bg-accent/30 rounded-t"
                        style={{ height: `${height}px` }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </BentoCard>

            {/* RAG - Horizontal 2x1 */}
            <BentoCard
              title="Document Q&A (RAG)"
              description="Upload PDFs, policies, and FAQs. AI answers questions by searching your documents intelligently with semantic search."
              icon={FileText}
              iconColor="brand"
              size="horizontal"
            >
              <div className="flex items-center gap-3 pt-2">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="rounded-lg bg-brand/10 p-2"
                >
                  <FileText className="h-5 w-5 text-brand" />
                </motion.div>
                <div className="flex-1">
                  <div className="h-2 bg-brand/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-foreground-muted mt-1">
                    Vector search • 99.2% accuracy
                  </p>
                </div>
              </div>
            </BentoCard>

            {/* Text-to-SQL - Horizontal 2x1 */}
            <BentoCard
              title="Database Q&A (Text-to-SQL)"
              description="Connect read-only databases. AI translates natural language to SQL and returns answers safely."
              icon={Database}
              iconColor="accent"
              size="horizontal"
            >
              <div className="pt-2 space-y-2">
                <div className="rounded-lg bg-background-shell p-3 border border-border font-mono text-xs">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-accent"
                  >
                    SELECT
                  </motion.span>{" "}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-foreground"
                  >
                    COUNT(*)
                  </motion.span>{" "}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-accent"
                  >
                    FROM
                  </motion.span>{" "}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-foreground"
                  >
                    orders
                  </motion.span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-success">Read-only mode</span>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-background-shell" id="pricing">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-3">
              Simple, transparent{" "}
              <span className="text-gradient">pricing</span>
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Start free, scale as you grow. No hidden fees or usage surprises.
            </p>
          </motion.div>

          {/* Billing toggle (UI only) */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center rounded-full border border-border bg-background-shell text-xs">
              <button className="px-3 py-1 rounded-full bg-brand text-brand-foreground">
                Monthly
              </button>
              <button className="px-3 py-1 text-foreground-secondary">
                Yearly – 2 months free
              </button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + mini FAQ */}
      <section className="py-20 border-t border-border bg-background">
        <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Launch your AI assistant this week — not next quarter
            </h2>
            <p className="text-lg text-foreground-secondary mb-6 max-w-xl">
              Connect your sources, drop in one line of code, and start
              answering questions from day one. No MLOps team required.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-brand text-brand-foreground hover:bg-brand-dark gap-2 transition-all duration-200 active:scale-95 hover:shadow-lg"
                >
                  Start Free Today
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-background-shell transition-all duration-200 active:scale-95"
                >
                  Schedule a Demo
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-xs text-foreground-muted">
              Try it free. No credit card, no lock-in — keep your data in your
              own infrastructure.
            </p>
          </div>

          <div className="space-y-4 text-sm text-foreground-secondary">
            <details className="rounded-xl border border-border bg-background-shell px-4 py-3">
              <summary className="cursor-pointer font-medium text-foreground">
                Do you store our data?
              </summary>
              <p className="mt-2 text-xs text-foreground-secondary">
                You can connect databases with read-only credentials and choose
                how and where data is stored depending on your plan.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-background-shell px-4 py-3">
              <summary className="cursor-pointer font-medium text-foreground">
                How technical is the setup?
              </summary>
              <p className="mt-2 text-xs text-foreground-secondary">
                If you can connect a database and add a script tag, you can
                launch Universal AI. Most teams ship in under an afternoon.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background-shell py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img
                  src={Logo}
                  alt="OrcaBase Logo"
                  className="h-8 w-8 rounded-lg"
                />
                <span className="text-lg font-bold">
                  ORCA<span className="text-gradient">BASE</span>
                </span>
              </Link>
              <p className="text-sm text-foreground-secondary">
                The AI assistant that understands your documents and databases.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-foreground-secondary">
                <li>
                  <Link
                    to="/features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/changelog"
                    className="hover:text-foreground transition-colors"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-foreground-secondary">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground-secondary">
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/security"
                    className="hover:text-foreground transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground-muted">
              © {new Date().getFullYear()} OrcaBase. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button className="text-foreground-secondary hover:text-foreground transition-colors">
                <Building2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
