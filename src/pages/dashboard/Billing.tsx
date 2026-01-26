import { Button } from "@/components/ui/button";
import { PlanCard } from "@/components/ui/PlanCard";
import {
  CreditCard,
  Check,
  ArrowRight,
  Zap,
  Calendar,
  Receipt,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const currentPlan = {
  name: "Pro",
  price: "₹7,999",
  period: "/month",
  queriesUsed: 32450,
  queriesLimit: 50000,
  renewalDate: "February 15, 2024",
};

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "For testing and small projects",
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
    description: "For growing teams",
    features: [
      "5,000 queries/month",
      "50 documents",
      "Custom branding",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "₹7,999",
    description: "Full power for businesses",
    features: [
      "50,000 queries/month",
      "Unlimited documents",
      "Database integration",
      "Priority support",
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
    ],
  },
];

const invoices = [
  { id: "INV-2024-001", date: "Jan 15, 2024", amount: "₹7,999", status: "paid" },
  { id: "INV-2023-012", date: "Dec 15, 2023", amount: "₹7,999", status: "paid" },
  { id: "INV-2023-011", date: "Nov 15, 2023", amount: "₹7,999", status: "paid" },
];

export default function Billing() {
  const usagePercentage = (currentPlan.queriesUsed / currentPlan.queriesLimit) * 100;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Billing</h1>
        <p className="text-foreground-secondary mt-1">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <div className="rounded-xl border border-brand/30 bg-brand/5 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="h-6 w-6 text-brand" />
              <h2 className="text-2xl font-bold text-foreground">{currentPlan.name} Plan</h2>
              <span className="rounded-full bg-brand px-3 py-0.5 text-xs font-medium text-brand-foreground">
                Current
              </span>
            </div>
            <p className="text-foreground-secondary">
              <span className="text-2xl font-bold text-foreground">{currentPlan.price}</span>
              {currentPlan.period}
            </p>
          </div>
          <Button
            variant="outline"
            className="border-border text-foreground hover:bg-background-shell"
          >
            Manage Subscription
          </Button>
        </div>

        {/* Usage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-secondary">Query Usage</span>
            <span className="text-foreground font-medium">
              {currentPlan.queriesUsed.toLocaleString()} / {currentPlan.queriesLimit.toLocaleString()}
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2 bg-background-shell" />
          <p className="text-xs text-foreground-muted">
            {(currentPlan.queriesLimit - currentPlan.queriesUsed).toLocaleString()} queries remaining this billing period
          </p>
        </div>

        {/* Renewal Info */}
        <div className="mt-6 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-foreground-muted" />
            <span className="text-foreground-secondary">
              Renews on <span className="text-foreground">{currentPlan.renewalDate}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-foreground-muted" />
            <span className="text-foreground-secondary">
              Visa ending in <span className="text-foreground">4242</span>
            </span>
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">Compare Plans</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              {...plan}
              buttonText={plan.name === currentPlan.name ? "Current Plan" : "Upgrade"}
            />
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Billing History</h2>
          <Button
            variant="outline"
            size="sm"
            className="border-border text-foreground-secondary hover:text-foreground"
          >
            <Receipt className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>

        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background-shell"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-brand/10 p-2">
                  <Receipt className="h-4 w-4 text-brand" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{invoice.id}</p>
                  <p className="text-sm text-foreground-muted">{invoice.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium text-foreground">{invoice.amount}</span>
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success capitalize">
                  {invoice.status}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground-secondary hover:text-foreground"
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Payment Method</h2>
        <div className="flex items-center justify-between p-4 rounded-lg bg-background-shell">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-accent/10 p-2">
              <CreditCard className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">Visa ending in 4242</p>
              <p className="text-sm text-foreground-muted">Expires 12/2025</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-border text-foreground-secondary hover:text-foreground"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
