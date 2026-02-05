import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Workspaces from "./pages/Workspaces";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Security from "./pages/Security";
import Docs from "./pages/Docs";
import Documentation from "./pages/Documentation";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Documents from "./pages/dashboard/Documents";
import DatabasePage from "./pages/dashboard/Database";
import Chatbot from "./pages/dashboard/Chatbot";
import InternalChat from "./pages/dashboard/InternalChat";
import Analytics from "./pages/dashboard/Analytics";
import Automation from "./pages/dashboard/Automation";
import Reports from "./pages/dashboard/Reports";
import SavedInsights from "./pages/dashboard/SavedInsights";
import AuditLogs from "./pages/dashboard/AuditLogs";
import Team from "./pages/dashboard/Team";
import Billing from "./pages/dashboard/Billing";
import SettingsPage from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";
import EmbedChat from "./pages/EmbedChat";
import OAuthSuccess from "./pages/OAuthSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WorkspaceProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Marketing Pages */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/workspaces" element={<Workspaces />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/security" element={<Security />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/embed/chat" element={<EmbedChat />} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />

              {/* Dashboard Pages */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="documents" element={<Documents />} />
                <Route path="database" element={<DatabasePage />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route path="internal-chat" element={<InternalChat />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="automation" element={<Automation />} />
                <Route path="reports" element={<Reports />} />
                <Route path="saved-insights" element={<SavedInsights />} />
                <Route path="audit-logs" element={<AuditLogs />} />
                <Route path="team" element={<Team />} />
                <Route path="billing" element={<Billing />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </WorkspaceProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
