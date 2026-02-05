import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    Link as LinkIcon,
    Shield,
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
            { id: "security-first", title: "Security-First AI Workflows" },
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
            { id: "data-flow", title: "Data Flow Diagram" },
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
            { id: "chatbot-takeover", title: "Human Takeover" },
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
            { id: "allowed-tables", title: "Allowed Tables" },
            { id: "read-only", title: "Read-Only Enforcement" },
        ],
    },
    {
        id: "web-search",
        title: "Web Search Tool",
        icon: Globe,
        subsections: [
            { id: "hybrid-knowledge", title: "Hybrid Knowledge" },
            { id: "search-activation", title: "When It Activates" },
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
        <div className="relative rounded-lg bg-background-shell border border-border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background-surface">
                <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-foreground-muted" />
                    <span className="text-xs text-foreground-secondary font-mono">{language}</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 gap-1.5 text-foreground-secondary hover:text-foreground"
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5 text-success" />
                            <span className="text-xs">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5" />
                            <span className="text-xs">Copy</span>
                        </>
                    )}
                </Button>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-foreground">{code}</code>
            </pre>
        </div>
    );
}

export default function Documentation() {
    const [activeSection, setActiveSection] = useState("platform-overview");
    const [searchQuery, setSearchQuery] = useState("");

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="flex gap-6 h-[calc(100vh-8rem)]">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-6 space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-brand" />
                            Documentation
                        </h2>
                        <p className="text-sm text-foreground-secondary">
                            Complete guide to OrcaBase features
                        </p>
                    </div>

                    <Separator />

                    <ScrollArea className="h-[calc(100vh-16rem)]">
                        <nav className="space-y-1 pr-4">
                            {sections.map((section) => (
                                <div key={section.id}>
                                    <button
                                        onClick={() => scrollToSection(section.id)}
                                        className={cn(
                                            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                            activeSection === section.id
                                                ? "bg-brand/10 text-brand"
                                                : "text-foreground-secondary hover:bg-background-surface hover:text-foreground"
                                        )}
                                    >
                                        <section.icon className="h-4 w-4" />
                                        {section.title}
                                    </button>
                                    {section.subsections && activeSection === section.id && (
                                        <div className="ml-6 mt-1 space-y-1">
                                            {section.subsections.map((sub) => (
                                                <button
                                                    key={sub.id}
                                                    onClick={() => scrollToSection(sub.id)}
                                                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-foreground-secondary hover:bg-background-surface hover:text-foreground transition-colors"
                                                >
                                                    <ChevronRight className="h-3 w-3" />
                                                    {sub.title}
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

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                <ScrollArea className="h-full">
                    <div className="max-w-4xl mx-auto space-y-12 pb-12 pr-4">
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-brand/10 p-3">
                                    <BookOpen className="h-6 w-6 text-brand" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground">OrcaBase Documentation</h1>
                                    <p className="text-foreground-secondary mt-1">
                                        Comprehensive guide to integrating and using OrcaBase features
                                    </p>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="relative max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
                                <Input
                                    placeholder="Search documentation..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 bg-background-shell border-border"
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Platform Overview Section */}
                        <section id="platform-overview" className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Shield className="h-6 w-6 text-brand" />
                                <h2 className="text-2xl font-bold text-foreground">Platform Overview</h2>
                            </div>

                            <div id="what-orcabase-solves" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">What OrcaBase Solves</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    OrcaBase enables <strong>zero-trust AI database analytics</strong> through VPC-deployed agents. Unlike traditional solutions that require direct database access from SaaS platforms, OrcaBase keeps your data secure within your infrastructure.
                                </p>
                                <div className="grid gap-3">
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-3">
                                                <Zap className="h-5 w-5 text-success mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-foreground mb-1">Natural Language to SQL</h4>
                                                    <p className="text-sm text-foreground-secondary">
                                                        Transform business questions into accurate SQL queries through AI-powered semantic understanding
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-3">
                                                <FileText className="h-5 w-5 text-brand mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-foreground mb-1">Document Intelligence (RAG)</h4>
                                                    <p className="text-sm text-foreground-secondary">
                                                        Semantic search across PDFs, policies, and knowledge bases with source attribution
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-3">
                                                <Globe className="h-5 w-5 text-info mt-1" />
                                                <div>
                                                    <h4 className="font-medium text-foreground mb-1">Hybrid Knowledge Reasoning</h4>
                                                    <p className="text-sm text-foreground-secondary">
                                                        Combine database insights, document knowledge, and web search in a single query
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div id="security-first" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Security-First AI Workflows</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    OrcaBase is architected for enterprises that cannot compromise on security:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                                    <li><strong>Zero database credentials in SaaS</strong> — Your DB passwords never leave your network</li>
                                    <li><strong>Schema-only sync</strong> — Only table/column metadata is shared, never actual data</li>
                                    <li><strong>Read-only enforcement</strong> — Queries are restricted to SELECT statements only</li>
                                    <li><strong>Human approval workflow</strong> — Every SQL query requires manual approval before execution</li>
                                    <li><strong>Multi-tenant isolation</strong> — Complete workspace separation with role-based access</li>
                                </ul>
                            </div>
                        </section>

                        <Separator />

                        {/* Chatbot Integration Section */}
                        <section id="chatbot-integration" className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Bot className="h-6 w-6 text-brand" />
                                <h2 className="text-2xl font-bold text-foreground">Chatbot Integration</h2>
                            </div>

                            <div id="chatbot-setup" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-foreground-secondary" />
                                    Setup & Configuration
                                </h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    Get your workspace API key from the Settings page and configure your chatbot widget.
                                </p>
                                <Card className="bg-card border-border">
                                    <CardHeader>
                                        <CardTitle className="text-base">Get API Key</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <p className="text-sm text-foreground-secondary">
                                            Navigate to <strong>Settings</strong> → Copy your <strong>Public API Key</strong>
                                        </p>
                                        <div className="p-3 rounded-lg bg-background-shell border border-border">
                                            <code className="text-sm font-mono text-foreground">
                                                ws_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                            </code>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div id="chatbot-embed" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-foreground-secondary" />
                                    Embedding Widget
                                </h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    Add the OrcaBase chatbot to your website with a simple script tag:
                                </p>
                                <CodeBlock
                                    language="html"
                                    code={`<!-- Add before closing </body> tag -->
<script>
  window.orcabaseConfig = {
    apiKey: 'YOUR_PUBLIC_API_KEY',
    position: 'bottom-right', // or 'bottom-left'
    primaryColor: '#3b82f6',
    greeting: 'Hi! How can I help you today?'
  };
</script>
<script src="https://cdn.orcabase.ai/widget.js" async></script>`}
                                />
                            </div>

                            <div id="chatbot-customization" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Customization Options</h3>
                                <Card className="bg-card border-border">
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-border">
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <code className="text-sm font-mono text-brand">apiKey</code>
                                                        <p className="text-sm text-foreground-secondary mt-1">Your workspace public API key</p>
                                                    </div>
                                                    <Badge variant="outline">Required</Badge>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <code className="text-sm font-mono text-brand">position</code>
                                                        <p className="text-sm text-foreground-secondary mt-1">Widget position: 'bottom-right' or 'bottom-left'</p>
                                                    </div>
                                                    <Badge variant="outline" className="bg-background-shell">Optional</Badge>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <code className="text-sm font-mono text-brand">primaryColor</code>
                                                        <p className="text-sm text-foreground-secondary mt-1">Brand color for the widget (hex code)</p>
                                                    </div>
                                                    <Badge variant="outline" className="bg-background-shell">Optional</Badge>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <code className="text-sm font-mono text-brand">greeting</code>
                                                        <p className="text-sm text-foreground-secondary mt-1">Initial greeting message</p>
                                                    </div>
                                                    <Badge variant="outline" className="bg-background-shell">Optional</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div id="chatbot-api" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">API Reference</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    Send messages programmatically to the chatbot API:
                                </p>
                                <CodeBlock
                                    language="javascript"
                                    code={`// Send a chat message
const response = await fetch('/api/rag/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'YOUR_PUBLIC_API_KEY'
  },
  body: JSON.stringify({
    message: 'What are your business hours?',
    sessionId: 'user-session-123' // Optional
  })
});

const data = await response.json();
console.log('AI Response:', data.response);
console.log('Sources:', data.sources);`}
                                />
                            </div>
                        </section>

                        <Separator />

                        {/* Internal Chat Section */}
                        <section id="internal-chat" className="space-y-6">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="h-6 w-6 text-brand" />
                                <h2 className="text-2xl font-bold text-foreground">Internal Chat</h2>
                            </div>

                            <div id="internal-overview" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Overview</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    Internal Chat provides a private AI assistant for your team, with access to all workspace documents and databases. Unlike the public chatbot, internal chat supports advanced features like multi-document analysis and database queries.
                                </p>
                            </div>

                            <div id="internal-responses" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Response Generation</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    The internal chat uses a sophisticated RAG (Retrieval-Augmented Generation) pipeline:
                                </p>
                                <div className="space-y-3">
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <h4 className="font-medium text-foreground mb-2">1. Query Analysis</h4>
                                            <p className="text-sm text-foreground-secondary">
                                                The system analyzes your question to determine intent and extract key entities
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <h4 className="font-medium text-foreground mb-2">2. Context Retrieval</h4>
                                            <p className="text-sm text-foreground-secondary">
                                                Relevant document chunks are retrieved using semantic similarity search
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <h4 className="font-medium text-foreground mb-2">3. Response Synthesis</h4>
                                            <p className="text-sm text-foreground-secondary">
                                                GPT-4 generates a comprehensive answer using the retrieved context
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <h4 className="font-medium text-foreground mb-2">4. Source Attribution</h4>
                                            <p className="text-sm text-foreground-secondary">
                                                All responses include citations to source documents with chunk IDs
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div id="internal-context" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Context Management</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    The chat maintains conversation context across messages, allowing for follow-up questions and clarifications. Context window is managed automatically to stay within model limits.
                                </p>
                            </div>

                            <div id="internal-history" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Chat History</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    All conversations are stored and can be accessed later. Chat sessions are automatically saved with timestamps and can be searched or filtered.
                                </p>
                            </div>
                        </section>

                        <Separator />

                        {/* Database Setup Section */}
                        <section id="database-setup" className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Database className="h-6 w-6 text-brand" />
                                <h2 className="text-2xl font-bold text-foreground">Database Setup</h2>
                            </div>

                            <div id="db-registration" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Database Registration</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    Connect your databases to enable natural language querying. OrcaBase supports PostgreSQL, MySQL, and MongoDB.
                                </p>
                                <Card className="bg-card border-border">
                                    <CardHeader>
                                        <CardTitle className="text-base">Registration Steps</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <ol className="list-decimal list-inside space-y-2 text-foreground-secondary">
                                            <li>Navigate to the <strong>Database</strong> tab</li>
                                            <li>Click <strong>Connect Database</strong></li>
                                            <li>Enter connection details (host, port, credentials)</li>
                                            <li>Test connection and save</li>
                                            <li>OrcaBase will automatically discover your schema</li>
                                        </ol>
                                    </CardContent>
                                </Card>
                            </div>

                            <div id="db-connection" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Connection Configuration</h3>
                                <CodeBlock
                                    language="json"
                                    code={`{
  "type": "postgresql",
  "host": "your-db-host.com",
  "port": 5432,
  "database": "your_database",
  "username": "your_username",
  "password": "your_password",
  "ssl": true
}`}
                                />
                                <div className="rounded-lg bg-warning/10 border border-warning/30 p-4">
                                    <div className="flex gap-3">
                                        <Lock className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium text-foreground mb-1">Security Note</h4>
                                            <p className="text-sm text-foreground-secondary">
                                                Credentials are encrypted at rest and in transit. We recommend using read-only database users for maximum security.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="db-security" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Security & Permissions</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    Best practices for secure database connections:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                                    <li>Create a dedicated read-only user for OrcaBase</li>
                                    <li>Use SSL/TLS for all connections</li>
                                    <li>Whitelist OrcaBase IP addresses in your firewall</li>
                                    <li>Regularly rotate credentials</li>
                                    <li>Monitor query logs for unusual activity</li>
                                </ul>
                            </div>

                            <div id="db-schema" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Schema Discovery</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    Upon connection, OrcaBase automatically:
                                </p>
                                <div className="grid gap-3">
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <p className="text-sm text-foreground">
                                                ✓ Discovers all tables and views
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <p className="text-sm text-foreground">
                                                ✓ Maps column names and data types
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <p className="text-sm text-foreground">
                                                ✓ Identifies relationships and foreign keys
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <p className="text-sm text-foreground">
                                                ✓ Generates natural language descriptions
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </section>

                        <Separator />

                        {/* Database Chat Section */}
                        <section id="database-chat" className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Terminal className="h-6 w-6 text-brand" />
                                <h2 className="text-2xl font-bold text-foreground">Database Chat</h2>
                            </div>

                            <div id="db-chat-overview" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Natural Language Queries</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    Ask questions about your data in plain English. OrcaBase converts your questions into SQL queries and returns formatted results.
                                </p>
                                <Card className="bg-card border-border">
                                    <CardHeader>
                                        <CardTitle className="text-base">Example Queries</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-foreground">💬 "Show me the top 10 customers by revenue"</p>
                                            <p className="text-sm font-medium text-foreground">💬 "What's the average order value this month?"</p>
                                            <p className="text-sm font-medium text-foreground">💬 "List all products with low inventory"</p>
                                            <p className="text-sm font-medium text-foreground">💬 "Compare sales between Q1 and Q2"</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div id="db-chat-sql" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">SQL Generation</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    The AI agent analyzes your question and generates optimized SQL queries:
                                </p>
                                <CodeBlock
                                    language="sql"
                                    code={`-- Natural language: "Show me the top 10 customers by revenue"

SELECT 
  c.customer_id,
  c.customer_name,
  SUM(o.total_amount) as total_revenue
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
GROUP BY c.customer_id, c.customer_name
ORDER BY total_revenue DESC
LIMIT 10;`}
                                />
                                <p className="text-sm text-foreground-secondary">
                                    All generated queries are shown to you before execution, allowing review and modification if needed.
                                </p>
                            </div>

                            <div id="db-chat-tables" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Table Analysis</h3>
                                <p className="text-foreground-secondary leading-relaxed">
                                    The system can analyze table structures and provide insights:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                                    <li>Row counts and data distribution</li>
                                    <li>Column statistics (min, max, avg, null counts)</li>
                                    <li>Data quality issues and anomalies</li>
                                    <li>Relationship mapping between tables</li>
                                </ul>
                            </div>

                            <div id="db-chat-best-practices" className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">Best Practices</h3>
                                <div className="space-y-3">
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <h4 className="font-medium text-foreground mb-2">Be Specific</h4>
                                            <p className="text-sm text-foreground-secondary">
                                                Include time ranges, limits, and specific columns in your questions for more accurate results
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <h4 className="font-medium text-foreground mb-2">Review Generated SQL</h4>
                                            <p className="text-sm text-foreground-secondary">
                                                Always review the generated SQL before execution, especially for write operations
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <h4 className="font-medium text-foreground mb-2">Use Read-Only Mode</h4>
                                            <p className="text-sm text-foreground-secondary">
                                                For production databases, configure connections as read-only to prevent accidental modifications
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-background-shell border-border">
                                        <CardContent className="p-4">
                                            <h4 className="font-medium text-foreground mb-2">Provide Context</h4>
                                            <p className="text-sm text-foreground-secondary">
                                                The more context you provide about your data model, the better the AI can generate accurate queries
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </section>

                        {/* Footer */}
                        <div className="pt-8 border-t border-border">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-foreground-secondary">
                                    Need help? Contact support at{" "}
                                    <a href="mailto:support@orcabase.ai" className="text-brand hover:underline">
                                        support@orcabase.ai
                                    </a>
                                </p>
                                <Badge variant="outline" className="text-xs">
                                    Last updated: {new Date().toLocaleDateString()}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
