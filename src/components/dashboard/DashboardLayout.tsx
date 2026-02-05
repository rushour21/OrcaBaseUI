import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Bot,
  LayoutDashboard,
  FileText,
  Database,
  MessageSquare,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Check,
  Lock,
  Globe,
  Sun,
  Moon,
  X,
  Loader2,
  Menu,
  BookOpen,
} from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthStore } from "@/store/useAuthStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Logo from "@/assets/Logo.png";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { inviteApi } from "@/api/invites";
import api from "@/api/axios"; // Keep for other potential usages or remove if unused

interface NavItem {
  title: string;
  icon: typeof LayoutDashboard;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Documents", icon: FileText, href: "/dashboard/documents" },
  { title: "Database", icon: Database, href: "/dashboard/database" },
  { title: "Customer Queries", icon: MessageSquare, href: "/dashboard/internal-chat" },
  { title: "Website Chatbot", icon: Globe, href: "/dashboard/chatbot" },
  { title: "Database Chat", icon: BarChart3, href: "/dashboard/analytics" },
  { title: "Team", icon: Users, href: "/dashboard/team" },
  { title: "Billing", icon: CreditCard, href: "/dashboard/billing" },
  { title: "Documentation", icon: BookOpen, href: "/documentation" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();
  const navigate = useNavigate();
  const { currentWorkspace, workspaces, switchWorkspace, isLoading } = useWorkspace();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthStore();
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    try {
      const data = await inviteApi.listMyInvites();
      setInvites(data);
    } catch (err) {
      console.error("Failed to fetch invites", err);
    }
  };

  const handleAcceptInvite = async (inviteId: string) => {
    try {
      await inviteApi.accept(inviteId);
      // Remove from list
      setInvites(invites.filter((i: any) => i.id !== inviteId));
      // Optionally reload workspaces or switch to new workspace
      window.location.reload();
    } catch (err) {
      console.error("Failed to accept invite", err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return "U";
    const email = user.email;
    const namePart = email.split("@")[0];
    const parts = namePart.split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return namePart.substring(0, 2).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (!currentWorkspace) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        No workspace found.
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  const getWorkspaceColor = (color: string) => {
    switch (color) {
      case "brand":
        return "bg-brand text-brand-foreground";
      case "success":
        return "bg-success text-success-foreground";
      default:
        return "bg-accent text-accent-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border bg-background-shell transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64",
          // Mobile: slide in/out
          "md:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={Logo} alt="OrcaBase Logo" className="h-8 w-8 shrink-0 rounded-lg" />
            {!collapsed && (
              <p className="text-lg font-bold text-foreground">ORCA<span className="text-gradient">BASE</span></p>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);

            const NavContent = (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-brand/10 text-brand"
                    : "text-foreground-secondary hover:bg-background-surface hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", active && "text-brand")} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div>{NavContent}</div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-background-surface border-border">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return NavContent;
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t border-border p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center text-foreground-secondary hover:text-foreground"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          // Desktop: margin for sidebar
          "md:ml-64",
          collapsed && "md:ml-16"
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-4 md:px-6">
          {/* Left: Mobile Menu + Workspace Selector */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Hamburger Menu (Mobile Only) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground-secondary hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2 text-foreground hover:bg-background-shell"
                >
                  <span className="font-medium">{currentWorkspace.name}</span>
                  <ChevronDown className="h-4 w-4 text-foreground-muted" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-background-surface border-border">
                <div className="px-2 py-1.5 text-xs font-medium text-foreground-muted uppercase tracking-wider">
                  Workspaces
                </div>
                {workspaces.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace.id}
                    className="gap-2 cursor-pointer"
                    onClick={() => switchWorkspace(workspace.id)}
                  >
                    <span className="flex-1">{workspace.name}</span>
                    {currentWorkspace.id === workspace.id && (
                      <Check className="h-4 w-4 text-brand" />
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="text-foreground-secondary cursor-pointer">
                  + Create workspace
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Role Badge */}

          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
              <Input
                placeholder="Search..."
                className="pl-9 bg-background-shell border-border text-foreground placeholder:text-foreground-muted"
              />
            </div>
          </div>

          {/* Right: Role Switcher (Demo), Notifications & User */}
          <div className="flex items-center gap-2">
            {/* Demo Role Switcher */}


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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-foreground-secondary hover:text-foreground hover:bg-background-shell"
                >
                  <Bell className="h-5 w-5" />
                  {invites.length > 0 && (
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-error" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-background-surface border-border">
                <div className="px-4 py-3 font-medium border-b border-border">
                  Notifications
                </div>
                {invites.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-foreground-secondary">
                    No new notifications
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {invites.map((invite: any) => (
                      <div key={invite.id} className="p-4 border-b border-border last:border-0 hover:bg-background-shell/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium text-foreground">
                              Invitation to join <span className="text-brand">{invite.workspace_name}</span>
                            </p>
                            <p className="text-xs text-foreground-secondary">
                              Role: <span className="capitalize">{invite.role}</span>
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="h-8 bg-brand text-brand-foreground hover:bg-brand-dark"
                            onClick={() => handleAcceptInvite(invite.id)}
                          >
                            Accept
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2 text-foreground hover:bg-background-shell"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand font-semibold">
                    {getUserInitials()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background-surface border-border">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.email || "User"}</p>
                  <p className="text-xs text-foreground-muted">{user?.email || ""}</p>

                </div>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
                  <Link to="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  className="gap-2 text-error cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
