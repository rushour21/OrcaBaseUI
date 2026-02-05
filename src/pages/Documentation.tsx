import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import {
    BookOpen,
    FileText,
    Bot,
    MessageSquare,
    Database,
    Search,
    Copy,
    Check,
    ChevronRight,
    Code,
    Terminal,
    Globe,
    Lock,
    Zap,
    Settings,
    Upload,
    Shield,
    Bell,
    Users,
    CheckCircle2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface Section {
    id: string;
    title: string;
    icon: typeof BookOpen;
    subsections?: { id: string; title: string }[];
}

const sections: Section[] = [
    {
        id: "platform-overview",
        title: "Platform Overview",
        icon: BookOpen,
        subsections: [
            { id: "what-orcabase-solves", title: "What OrcaBase Solves" },
            { id: "security-first", title: "Security-First Architecture" },
        ],
    },
    {
        id: "agent-architecture",
        title: "Agent Architecture & Security",
        icon: Lock,
        subsections: [
            { id: "vpc-agent-model", title: "VPC Agent Model" },
            { id: "docker-deployment", title: "Docker Deployment" },
            { id: "zero-trust", title: "Zero Trust Architecture" },
            { id: "data-flow", title: "Data Flow" },
        ],
    },
    {
        id: "document-ai",
        title: "Document AI (RAG)",
        icon: FileText,
        subsections: [
            { id: "doc-upload", title: "Upload Pipeline" },
            { id: "doc-chunking", title: "Chunking & Embeddings" },
            { id: "doc-retrieval", title: "Retrieval Flow" },
            { id: "doc-escalation", title: "Human Escalation" },
        ],
    },
    {
        id: "chatbot-integration",
        title: "Chatbot Embedding",
        icon: Bot,
        subsections: [
            { id: "chatbot-embed", title: "Widget Integration" },
            { id: "chatbot-customization", title: "Customization" },
            { id: "chatbot-human-mode", title: "Human Mode & Admin Response" },
        ],
    },
    {
        id: "database-agent",
        title: "Database Agent Setup",
        icon: Database,
        subsections: [
            { id: "agent-deployment", title: "Agent Deployment" },
            { id: "token-generation", title: "Token Generation" },
            { id: "agent-health", title: "Health Checks" },
        ],
    },
    {
        id: "ai-workflow",
        title: "AI Query Processing",
        icon: Zap,
        subsections: [
            { id: "query-rewrite", title: "Query Rewriter" },
            { id: "schema-mapping", title: "Schema Mapping" },
            { id: "sql-generation", title: "SQL Generation" },
            { id: "approval-workflow", title: "Approval Workflow" },
            { id: "execution", title: "Execution via Agent" },
            { id: "result-analysis", title: "Result Analysis" },
        ],
    },
    {
        id: "access-control",
        title: "Access Control",
        icon: Settings,
        subsections: [
            { id: "allowed-tables", title: "Table-Level Permissions" },
            { id: "read-only", title: "Read-Only Enforcement" },
        ],
    },
    {
        id: "session-management",
        title: "Session & Context",
        icon: MessageSquare,
        subsections: [
            { id: "followup-queries", title: "Follow-up Queries" },
            { id: "context-awareness", title: "Context Awareness" },
        ],
    },
];

interface CodeBlockProps {
    code: string;
    language?: string;
}

function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast({
            title: "Copied!",
            description: "Code copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <div className="absolute right-3 top-3 z-10">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-success" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </Button>
            </div>
            <pre className="rounded-lg bg-background-shell border border-border p-4 overflow-x-auto">
                <code className={`language-${language} text-sm font-mono text-foreground`}>
                    {code}
                </code>
            </pre>
        </div>
    );
}

export default function Documentation() {
    const [activeSection, setActiveSection] = useState("platform-overview");

    // Scroll to section when hash changes
    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setActiveSection(hash);
            }
        }
    }, []);

    // Handle section click
    const handleSectionClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(sectionId);
            window.location.hash = sectionId;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
                            <Bot className="h-5 w-5 text-brand-foreground" />
                        </div>
                        <span className="text-lg font-bold text-foreground">OrcaBase</span>
                    </Link>

                    <div className="hidden items-center gap-8 md:flex">
                        <Link to="/features" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
                            Features
                        </Link>
                        <Link to="/pricing" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
                            Pricing
                        </Link>
                        <Link to="/documentation" className="text-sm text-foreground hover:text-foreground transition-colors font-medium">
                            Documentation
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

            {/* Main Content */}
            <div className="pt-16 flex">
                {/* Sidebar */}
                <aside className="hidden lg:block w-64 border-r border-border bg-background-shell sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-sm font-semibold text-foreground-muted mb-4">DOCUMENTATION</h2>
                        <ScrollArea className="h-full">
                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <div key={section.id}>
                                        <button
                                            onClick={() => handleSectionClick(section.id)}
                                            className={cn(
                                                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                                                activeSection === section.id
                                                    ? "bg-brand/10 text-brand font-medium"
                                                    : "text-foreground-secondary hover:text-foreground hover:bg-background"
                                            )}
                                        >
                                            <section.icon className="h-4 w-4" />
                                            {section.title}
                                        </button>
                                        {section.subsections && (
                                            <div className="ml-6 mt-1 space-y-1">
                                                {section.subsections.map((subsection) => (
                                                    <button
                                                        key={subsection.id}
                                                        onClick={() => handleSectionClick(subsection.id)}
                                                        className={cn(
                                                            "w-full text-left px-3 py-1.5 rounded text-xs transition-colors",
                                                            activeSection === subsection.id
                                                                ? "text-brand font-medium"
                                                                : "text-foreground-muted hover:text-foreground"
                                                        )}
                                                    >
                                                        {subsection.title}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </ScrollArea>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <ScrollArea className="h-[calc(100vh-4rem)]">
                        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
                            {/* Header */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-brand/10 p-3">
                                        <BookOpen className="h-6 w-6 text-brand" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-foreground">OrcaBase Documentation</h1>
                                        <p className="text-foreground-secondary mt-1">
                                            Enterprise-grade AI platform with VPC-deployed agents
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Platform Overview Section */}
                            <section id="platform-overview" className="space-y-6 scroll-mt-20">
                                <div className="flex items-center gap-3">
                                    <Shield className="h-6 w-6 text-brand" />
                                    <h2 className="text-2xl font-bold text-foreground">Platform Overview</h2>
                                </div>

                                <div id="what-orcabase-solves" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">What OrcaBase Solves</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        OrcaBase enables <strong>zero-trust AI database analytics</strong> through VPC-deployed agents. The platform addresses critical enterprise requirements for AI-powered data access while maintaining strict security boundaries.
                                    </p>
                                    <div className="grid gap-3">
                                        <Card className="bg-background-shell border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <Zap className="h-5 w-5 text-success mt-1 shrink-0" />
                                                    <div>
                                                        <h4 className="font-medium text-foreground mb-1">Natural Language to SQL</h4>
                                                        <p className="text-sm text-foreground-secondary">
                                                            Transform business questions into accurate SQL queries through multi-agent AI workflow with semantic schema understanding
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-background-shell border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <FileText className="h-5 w-5 text-brand mt-1 shrink-0" />
                                                    <div>
                                                        <h4 className="font-medium text-foreground mb-1">Document Intelligence (RAG)</h4>
                                                        <p className="text-sm text-foreground-secondary">
                                                            Semantic search across enterprise documents with source attribution and human escalation for complex queries
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-background-shell border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <Users className="h-5 w-5 text-info mt-1 shrink-0" />
                                                    <div>
                                                        <h4 className="font-medium text-foreground mb-1">Human-in-the-Loop AI</h4>
                                                        <p className="text-sm text-foreground-secondary">
                                                            Seamless escalation to human agents with conversation context preservation and admin response interface
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                <div id="security-first" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Security-First Architecture</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        OrcaBase implements enterprise-grade security controls designed for regulated industries:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                                        <li><strong>Zero database credentials in SaaS</strong> — Database passwords remain within customer infrastructure</li>
                                        <li><strong>Schema-only synchronization</strong> — Only table and column metadata is transmitted, never actual data</li>
                                        <li><strong>Read-only enforcement</strong> — SQL validation prevents data modification operations</li>
                                        <li><strong>Human approval workflow</strong> — Manual review required before query execution</li>
                                        <li><strong>Multi-tenant isolation</strong> — Complete workspace separation with role-based access control</li>
                                    </ul>
                                </div>
                            </section>

                            <Separator />

                            {/* Agent Architecture Section */}
                            <section id="agent-architecture" className="space-y-6 scroll-mt-20">
                                <div className="flex items-center gap-3">
                                    <Lock className="h-6 w-6 text-brand" />
                                    <h2 className="text-2xl font-bold text-foreground">Agent Architecture & Security</h2>
                                </div>

                                <div id="vpc-agent-model" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">VPC Agent Model</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        OrcaBase employs a <strong>distributed architecture</strong> where database connectivity is handled by agents deployed within customer infrastructure. This design ensures database credentials never leave the customer's network perimeter.
                                    </p>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-6">
                                            <h4 className="font-medium text-foreground mb-3">Architecture Components</h4>
                                            <ul className="space-y-2 text-sm text-foreground-secondary">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                                    <span><strong>OrcaBase SaaS Platform</strong> — Hosts AI models, user interface, and orchestration logic</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                                    <span><strong>VPC Agent</strong> — Lightweight service deployed in customer VPC/network</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                                    <span><strong>Customer Database</strong> — Remains isolated within customer infrastructure</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                                    <span><strong>Secure Communication Channel</strong> — Token-authenticated WebSocket connection</span>
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div id="docker-deployment" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Docker Deployment</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Deploy the OrcaBase agent as a Docker container within your infrastructure. The agent establishes an outbound-only connection to the OrcaBase platform.
                                    </p>
                                    <CodeBlock
                                        language="bash"
                                        code={`docker run -d \\
  --name orcabase-agent \\
  --restart unless-stopped \\
  -e AGENT_TOKEN="your_agent_token_here" \\
  -e DB_HOST="localhost" \\
  -e DB_PORT="5432" \\
  -e DB_NAME="your_database" \\
  -e DB_USER="readonly_user" \\
  -e DB_PASSWORD="secure_password" \\
  orcabase/agent:latest`}
                                    />
                                    <div className="rounded-lg bg-info/10 border border-info/30 p-4">
                                        <div className="flex gap-3">
                                            <Shield className="h-5 w-5 text-info shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-medium text-foreground mb-1">Security Best Practice</h4>
                                                <p className="text-sm text-foreground-secondary">
                                                    Use read-only database credentials. The agent validates all SQL queries to prevent write operations, but defense-in-depth requires database-level restrictions.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="zero-trust" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Zero Trust Architecture</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        OrcaBase implements zero-trust principles to ensure data security and compliance:
                                    </p>
                                    <div className="grid gap-3">
                                        <Card className="bg-background-shell border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <Lock className="h-5 w-5 text-brand mt-1 shrink-0" />
                                                    <div>
                                                        <h4 className="font-medium text-foreground mb-1">No Credential Storage</h4>
                                                        <p className="text-sm text-foreground-secondary">
                                                            Database credentials are configured in the agent environment. The SaaS platform never receives or stores connection strings.
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-background-shell border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <Database className="h-5 w-5 text-brand mt-1 shrink-0" />
                                                    <div>
                                                        <h4 className="font-medium text-foreground mb-1">Schema-Only Sync</h4>
                                                        <p className="text-sm text-foreground-secondary">
                                                            Agent transmits table names, column names, and data types. Row data never leaves customer infrastructure.
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-background-shell border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle2 className="h-5 w-5 text-success mt-1 shrink-0" />
                                                    <div>
                                                        <h4 className="font-medium text-foreground mb-1">Approval Workflow</h4>
                                                        <p className="text-sm text-foreground-secondary">
                                                            Generated SQL queries require explicit user approval before execution, providing audit trail and preventing unauthorized access.
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                <div id="data-flow" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Data Flow</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Understanding the complete query lifecycle:
                                    </p>
                                    <CodeBlock
                                        language="text"
                                        code={`1. User Query → OrcaBase Platform
   "Show me top customers by revenue this quarter"

2. AI Processing → SQL Generation
   Platform generates SQL using schema metadata

3. Approval Request → User Review
   User reviews and approves generated query

4. Execution Command → VPC Agent
   Approved query sent to agent via secure channel

5. Database Query → Local Execution
   Agent executes query within customer network

6. Results → Platform → User
   Query results transmitted back to platform`}
                                    />
                                </div>
                            </section>

                            <Separator />

                            {/* Document AI Section */}
                            <section id="document-ai" className="space-y-6 scroll-mt-20">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-6 w-6 text-brand" />
                                    <h2 className="text-2xl font-bold text-foreground">Document AI (RAG)</h2>
                                </div>

                                <div id="doc-upload" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Upload Pipeline</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        OrcaBase processes enterprise documents through a production-grade ingestion pipeline supporting PDF, DOCX, TXT, and Markdown formats.
                                    </p>
                                    <CodeBlock
                                        language="text"
                                        code={`Document Upload → Format Detection → Text Extraction → Preprocessing`}
                                    />
                                </div>

                                <div id="doc-chunking" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Chunking & Embeddings</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Documents are segmented using semantic chunking algorithms that preserve context boundaries. Each chunk is converted to vector embeddings for similarity search.
                                    </p>
                                </div>

                                <div id="doc-retrieval" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Retrieval Flow</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        User queries are embedded and matched against document vectors. Retrieved chunks are ranked by relevance and provided to the AI model with source attribution.
                                    </p>
                                </div>

                                <div id="doc-escalation" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Human Escalation</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        When the AI system cannot provide a confident answer, queries are automatically escalated to human administrators for review and response.
                                    </p>
                                </div>
                            </section>

                            <Separator />

                            {/* Chatbot Integration Section */}
                            <section id="chatbot-integration" className="space-y-6 scroll-mt-20">
                                <div className="flex items-center gap-3">
                                    <Bot className="h-6 w-6 text-brand" />
                                    <h2 className="text-2xl font-bold text-foreground">Chatbot Embedding</h2>
                                </div>

                                <div id="chatbot-embed" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Widget Integration</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Embed the OrcaBase chatbot on your website with a single script tag:
                                    </p>
                                    <CodeBlock
                                        language="html"
                                        code={`<script>
  window.orcabaseConfig = {
    apiKey: 'YOUR_PUBLIC_API_KEY',
    position: 'bottom-right',
    theme: 'light'
  };
</script>
<script src="https://cdn.orcabase.com/widget.js"></script>`}
                                    />
                                </div>

                                <div id="chatbot-customization" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Customization</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Configure widget appearance, behavior, and branding through the dashboard or programmatically via configuration object.
                                    </p>
                                </div>

                                <div id="chatbot-human-mode" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Human Mode & Admin Response</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        OrcaBase supports seamless escalation from AI to human agents, enabling hybrid customer support workflows.
                                    </p>

                                    <Card className="bg-background-shell border-border">
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <Users className="h-5 w-5 text-brand" />
                                                Enabling Human Mode
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <p className="text-sm text-foreground-secondary">
                                                Configure human mode triggers in your widget configuration:
                                            </p>
                                            <CodeBlock
                                                language="javascript"
                                                code={`window.orcabaseConfig = {
  apiKey: 'YOUR_PUBLIC_API_KEY',
  humanMode: {
    enabled: true,
    triggerKeywords: ['speak to human', 'agent', 'representative'],
    autoEscalate: true // Auto-escalate when AI confidence is low
  }
};`}
                                            />
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-background-shell border-border">
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <Bell className="h-5 w-5 text-brand" />
                                                Admin Notification System
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm text-foreground-secondary">
                                                <li className="flex items-start gap-2">
                                                    <ChevronRight className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                                                    <span>Real-time notifications in dashboard when users request human assistance</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <ChevronRight className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                                                    <span>Email alerts for human mode requests (configurable)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <ChevronRight className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                                                    <span>Conversation queue management with priority sorting</span>
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-background-shell border-border">
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <MessageSquare className="h-5 w-5 text-brand" />
                                                Admin Response Interface
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-foreground-secondary mb-3">
                                                Administrators access a dedicated interface in the dashboard to manage human mode conversations:
                                            </p>
                                            <ul className="space-y-2 text-sm text-foreground-secondary">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                                    <span>View pending conversations requiring human response</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                                    <span>Access complete conversation history and context</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                                    <span>Respond directly to customer queries in real-time</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                                    <span>Mark conversations as resolved or transfer back to AI</span>
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-background-shell border-border">
                                        <CardHeader>
                                            <CardTitle className="text-base">Conversation Handoff Workflow</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CodeBlock
                                                language="text"
                                                code={`1. User requests human assistance
   → Trigger: keyword match or low AI confidence

2. AI acknowledges and notifies admin
   → "Connecting you with a team member..."

3. Admin receives real-time notification
   → Dashboard alert + optional email

4. Admin views conversation history
   → Full context preserved

5. Admin responds directly to user
   → Real-time bidirectional communication

6. Conversation continues with human agent
   → Session maintained with full history

7. Admin marks conversation as resolved
   → Optional: transfer back to AI for follow-up`}
                                            />
                                        </CardContent>
                                    </Card>

                                    <div className="rounded-lg bg-success/10 border border-success/30 p-4">
                                        <div className="flex gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-medium text-foreground mb-1">Session Continuity</h4>
                                                <p className="text-sm text-foreground-secondary">
                                                    Full conversation history is preserved across AI-human transitions. Context is maintained for compliance and quality assurance, with complete audit trail available.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Database Agent Setup Section */}
                            <section id="database-agent" className="space-y-6 scroll-mt-20">
                                <div className="flex items-center gap-3">
                                    <Database className="h-6 w-6 text-brand" />
                                    <h2 className="text-2xl font-bold text-foreground">Database Agent Setup</h2>
                                </div>

                                <div id="agent-deployment" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Agent Deployment</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Deploy the agent in your infrastructure using Docker, Kubernetes, or as a standalone binary. The agent requires network access to your database and outbound HTTPS to the OrcaBase platform.
                                    </p>
                                </div>

                                <div id="token-generation" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Token Generation</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Generate agent authentication tokens from the dashboard. Each token is workspace-specific and can be revoked independently for security.
                                    </p>
                                </div>

                                <div id="agent-health" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Health Checks</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Monitor agent connectivity and database health through the dashboard. Agents report status every 30 seconds with automatic reconnection on network interruption.
                                    </p>
                                </div>
                            </section>

                            <Separator />

                            {/* AI Query Processing Section */}
                            <section id="ai-workflow" className="space-y-6 scroll-mt-20">
                                <div className="flex items-center gap-3">
                                    <Zap className="h-6 w-6 text-brand" />
                                    <h2 className="text-2xl font-bold text-foreground">AI Query Processing Pipeline</h2>
                                </div>

                                <p className="text-foreground-secondary leading-relaxed">
                                    OrcaBase employs a multi-agent AI workflow to transform natural language questions into accurate SQL queries. Each stage is optimized for specific aspects of query generation.
                                </p>

                                <div id="query-rewrite" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">1. Query Rewriter</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Normalizes user input, resolves ambiguities, and expands abbreviations. Handles follow-up questions by incorporating conversation context.
                                    </p>
                                </div>

                                <div id="schema-mapping" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">2. Schema Mapping</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Identifies relevant tables and columns using semantic understanding. Maps business terminology to database schema elements.
                                    </p>
                                </div>

                                <div id="sql-generation" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">3. SQL Generation</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Generates optimized SQL queries with proper joins, filters, and aggregations. Validates syntax and enforces read-only constraints.
                                    </p>
                                </div>

                                <div id="approval-workflow" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">4. Approval Workflow</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Presents generated SQL to user for review. Users can approve, modify, or reject queries before execution, ensuring transparency and control.
                                    </p>
                                </div>

                                <div id="execution" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">5. Execution via VPC Agent</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Approved queries are transmitted to the VPC agent for local execution. Results are returned through the secure channel without exposing database credentials.
                                    </p>
                                </div>

                                <div id="result-analysis" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">6. Result Analysis</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Query results are analyzed and formatted into natural language responses. Includes data visualization recommendations and insights extraction.
                                    </p>
                                </div>
                            </section>

                            <Separator />

                            {/* Access Control Section */}
                            <section id="access-control" className="space-y-6 scroll-mt-20">
                                <div className="flex items-center gap-3">
                                    <Settings className="h-6 w-6 text-brand" />
                                    <h2 className="text-2xl font-bold text-foreground">Access Control</h2>
                                </div>

                                <div id="allowed-tables" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Table-Level Permissions</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        Configure which database tables are accessible to AI queries. Sensitive tables can be excluded from schema synchronization entirely.
                                    </p>
                                </div>

                                <div id="read-only" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Read-Only Enforcement</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        All generated SQL queries are validated to prevent INSERT, UPDATE, DELETE, or DDL operations. Multiple validation layers ensure data integrity.
                                    </p>
                                </div>
                            </section>

                            <Separator />

                            {/* Session Management Section */}
                            <section id="session-management" className="space-y-6 scroll-mt-20">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="h-6 w-6 text-brand" />
                                    <h2 className="text-2xl font-bold text-foreground">Session & Context Management</h2>
                                </div>

                                <div id="followup-queries" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Follow-up Queries</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        OrcaBase maintains conversation context to handle follow-up questions naturally. References to "last month" or "those customers" are resolved using conversation history.
                                    </p>
                                </div>

                                <div id="context-awareness" className="space-y-4 scroll-mt-20">
                                    <h3 className="text-xl font-semibold text-foreground">Context Awareness</h3>
                                    <p className="text-foreground-secondary leading-relaxed">
                                        The system tracks previously executed queries, referenced entities, and user preferences to provide contextually relevant responses across multi-turn conversations.
                                    </p>
                                </div>
                            </section>

                        </div>
                    </ScrollArea>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-border bg-background-shell py-8">
                <div className="container mx-auto px-4 text-center text-sm text-foreground-muted">
                    © 2024 OrcaBase. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
