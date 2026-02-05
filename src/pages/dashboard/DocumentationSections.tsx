import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Upload,
    Lock,
    Zap,
    Settings,
    Globe,
    Shield,
    Terminal,
    CheckCircle2,
    AlertCircle,
    Database,
    FileText,
    Bot,
} from "lucide-react";

interface CodeBlockProps {
    code: string;
    language?: string;
}

// Import CodeBlock from parent or pass as prop
function PlatformOverviewSection({ CodeBlock }: { CodeBlock: React.ComponentType<CodeBlockProps> }) {
    return (
        <>
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
                                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
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
                                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
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
                                    <CheckCircle2 className="h-5 w-5 text-success mt-1" />
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
        </>
    );
}

function AgentArchitectureSection({ CodeBlock }: { CodeBlock: React.ComponentType<CodeBlockProps> }) {
    return (
        <>
            <section id="agent-architecture" className="space-y-6">
                <div className="flex items-center gap-3">
                    <Lock className="h-6 w-6 text-brand" />
                    <h2 className="text-2xl font-bold text-foreground">Agent Architecture & Security Model</h2>
                </div>

                <div id="vpc-agent-model" className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Shield className="h-5 w-5 text-foreground-secondary" />
                        VPC Agent Model
                    </h3>
                    <p className="text-foreground-secondary leading-relaxed">
                        OrcaBase uses a <strong>VPC-deployed agent architecture</strong> to ensure your database credentials and data never leave your infrastructure.
                    </p>

                    <div className="rounded-lg bg-brand/10 border border-brand/30 p-4">
                        <h4 className="font-semibold text-brand mb-2">How It Works</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-foreground-secondary">
                            <li>Customer deploys <strong>OrcaBase Agent</strong> inside their infrastructure (Docker container)</li>
                            <li>Agent connects to database <strong>locally</strong> using credentials that never leave the network</li>
                            <li>Agent syncs <strong>schema snapshot only</strong> (table names, columns, types) to OrcaBase SaaS</li>
                            <li>When user asks a question, SaaS generates SQL and sends to agent</li>
                            <li>Agent executes query <strong>read-only</strong> and returns results</li>
                            <li>All queries require <strong>human approval</strong> before execution</li>
                        </ol>
                    </div>

                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-base">Architecture Diagram</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg bg-background-shell border border-border p-6 font-mono text-xs">
                                <pre className="text-foreground-secondary">
                                    {`┌─────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   User      │────────▶│  OrcaBase SaaS   │         │  Customer VPC   │
│  Browser    │         │                  │         │                 │
└─────────────┘         │  • AI Engine     │         │  ┌───────────┐  │
                        │  • Schema Store  │◀────────┼──│   Agent   │  │
                        │  • SQL Generator │         │  │  (Docker) │  │
                        │  • UI Dashboard  │         │  └─────┬─────┘  │
                        └──────────────────┘         │        │        │
                                                     │        ▼        │
                                                     │  ┌───────────┐  │
                                                     │  │ Database  │  │
                                                     │  │ (Postgres)│  │
                                                     │  └───────────┘  │
                                                     └─────────────────┘

Key: ──▶ HTTPS/Token Auth    ◀── Schema Sync Only    ▼ Local Connection`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div id="docker-deployment" className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Terminal className="h-5 w-5 text-foreground-secondary" />
                        Docker Deployment
                    </h3>
                    <p className="text-foreground-secondary leading-relaxed">
                        Deploy the OrcaBase Agent in your infrastructure using Docker:
                    </p>
                    <CodeBlock
                        language="bash"
                        code={`# Pull the latest agent image
docker pull rushour21/db-agent:latest

# Run the agent with your configuration
docker run -d \\
  --name orcabase-agent \\
  --restart unless-stopped \\
  -p 3001:3001 \\
  -e AGENT_TOKEN=<your-agent-token-from-dashboard> \\
  -e DB_HOST=<your-database-host> \\
  -e DB_PORT=5432 \\
  -e DB_USER=<read-only-db-user> \\
  -e DB_PASSWORD=<db-password> \\
  -e DB_NAME=<database-name> \\
  -e DB_TYPE=postgresql \\
  rushour21/db-agent:latest

# Verify agent is running
docker logs orcabase-agent`}
                    />

                    <div className="rounded-lg bg-warning/10 border border-warning/30 p-4">
                        <div className="flex gap-3">
                            <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-foreground mb-1">Security Best Practice</h4>
                                <p className="text-sm text-foreground-secondary">
                                    Create a dedicated <strong>read-only database user</strong> for the agent. Never use admin credentials.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="zero-trust" className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Zero Trust Architecture</h3>
                    <p className="text-foreground-secondary leading-relaxed">
                        OrcaBase implements a zero-trust security model:
                    </p>
                    <div className="grid gap-3">
                        <Card className="bg-background-shell border-border">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <Badge className="bg-brand/10 text-brand border-brand/30 mt-1">1</Badge>
                                    <div>
                                        <h4 className="font-medium text-foreground mb-1">SaaS Never Touches DB</h4>
                                        <p className="text-sm text-foreground-secondary">
                                            OrcaBase SaaS platform never connects directly to your database
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-background-shell border-border">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <Badge className="bg-brand/10 text-brand border-brand/30 mt-1">2</Badge>
                                    <div>
                                        <h4 className="font-medium text-foreground mb-1">Agent Runs Inside Customer Network</h4>
                                        <p className="text-sm text-foreground-secondary">
                                            Agent deployed in your VPC/infrastructure with local DB access
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-background-shell border-border">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <Badge className="bg-brand/10 text-brand border-brand/30 mt-1">3</Badge>
                                    <div>
                                        <h4 className="font-medium text-foreground mb-1">Schema Snapshot Only</h4>
                                        <p className="text-sm text-foreground-secondary">
                                            Only table/column metadata synced to SaaS, never actual data rows
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-background-shell border-border">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <Badge className="bg-brand/10 text-brand border-brand/30 mt-1">4</Badge>
                                    <div>
                                        <h4 className="font-medium text-foreground mb-1">Token-Based Authentication</h4>
                                        <p className="text-sm text-foreground-secondary">
                                            Agent authenticates with SaaS using secure, rotatable tokens
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div id="data-flow" className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Data Flow Diagram</h3>
                    <Card className="bg-card border-border">
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-brand/10 p-2 text-brand">
                                        <span className="text-xs font-bold">1</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">User asks: "Show revenue this month"</p>
                                        <p className="text-xs text-foreground-muted">Question sent to OrcaBase SaaS</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-brand/10 p-2 text-brand">
                                        <span className="text-xs font-bold">2</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">AI generates SQL using schema snapshot</p>
                                        <p className="text-xs text-foreground-muted">Query rewriter → Schema mapper → SQL generator</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-warning/10 p-2 text-warning">
                                        <span className="text-xs font-bold">3</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">SQL shown to user for approval</p>
                                        <p className="text-xs text-foreground-muted">Human-in-the-loop security checkpoint</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-brand/10 p-2 text-brand">
                                        <span className="text-xs font-bold">4</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">Approved SQL sent to VPC Agent</p>
                                        <p className="text-xs text-foreground-muted">Encrypted HTTPS with token auth</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-success/10 p-2 text-success">
                                        <span className="text-xs font-bold">5</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">Agent executes query (read-only)</p>
                                        <p className="text-xs text-foreground-muted">Local connection within customer VPC</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-brand/10 p-2 text-brand">
                                        <span className="text-xs font-bold">6</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">Results returned to SaaS → User</p>
                                        <p className="text-xs text-foreground-muted">AI analyzes and formats response</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator />
        </>
    );
}

// Export all sections
export { PlatformOverviewSection, AgentArchitectureSection };
