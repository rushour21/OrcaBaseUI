import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Bot, ArrowRight, Github, Check } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export default function Signup() {
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        email: formData.email,
        password: formData.password,
      });

      // 1. Destructure the exact data you mentioned
      const { user, accessToken } = response.data;

      // 2. Update Global Store (This persists to LocalStorage automatically)
      setAuth(user, accessToken);

      // 3. Navigate to workspace setup
      navigate("/workspaces");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "100 free queries per month",
    "No credit card required",
    "Full access to all features",
    "Cancel anytime",
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
                <Bot className="h-6 w-6 text-brand-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Universal AI</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="text-foreground-secondary mt-2">Start building your AI assistant in minutes</p>
          </div>

          {/* Signup Card */}
          <div className="rounded-2xl border border-border bg-card p-8">
            {/* Social Signup */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                className="w-full border-border text-foreground hover:bg-background-shell gap-2"
                onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full border-border text-foreground hover:bg-background-shell gap-2"
                onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`}
              >
                <Github className="h-4 w-4" />
                Continue with GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-foreground-muted">Or continue with</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background-shell border-border text-foreground placeholder:text-foreground-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-background-shell border-border text-foreground placeholder:text-foreground-muted"
                />
                <p className="text-xs text-foreground-muted">Must be at least 8 characters</p>
              </div>

              <Button type="submit" className="w-full bg-brand text-brand-foreground hover:bg-brand-dark gap-2">
                Create account <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="text-xs text-foreground-muted text-center mt-4">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-brand hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-brand hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Login link */}
          <p className="text-center mt-6 text-foreground-secondary">
            Already have an account?{" "}
            <Link to="/login" className="text-brand hover:text-brand-soft transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Benefits (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-background-shell border-l border-border p-8">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-6">
            Start building your <span className="text-gradient">AI assistant</span> today
          </h2>
          <p className="text-foreground-secondary mb-8">
            Join thousands of companies using Universal AI to power their customer and employee experiences.
          </p>

          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10">
                  <Check className="h-4 w-4 text-brand" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Testimonial */}
          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <p className="text-foreground-secondary italic mb-4">
              "Universal AI reduced our support tickets by 40% in the first month. The Text-to-SQL feature is a game
              changer for our operations team."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand/20 flex items-center justify-center">
                <span className="text-brand font-semibold">SK</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Sarah Kim</p>
                <p className="text-sm text-foreground-muted">Head of Operations, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
