import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import api from "@/api/axios";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  FileText,
  Upload,
  Search,
  MoreVertical,
  RefreshCw,
  Trash2,
  Eye,
  FileCheck,
  Sparkles,
  Database,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  Hash,
  MessageSquareQuote,
  Layers,
  BookOpen,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

interface Document {
  id: string; // Changed to string as likely UUID from DB
  name: string;
  file_type: string;
  status: "indexed" | "processing" | "error" | "pending";
  created_at: string;
  // Optional fields that might come in future or be calculated
  size?: string;
  pages?: number;
  chunks?: number;
  processingProgress?: number;
  exampleQuestions?: string[];
  chunkPreviews?: { id: number; content: string; tokens: number }[];
  usedInAnswers?: number;
}

// Source Attribution Badge Component
export function SourceAttributionBadge({
  documentName,
  chunkId,
  confidence = "high"
}: {
  documentName: string;
  chunkId?: number;
  confidence?: "high" | "medium" | "low";
}) {
  const confidenceStyles = {
    high: "border-success/30 bg-success/10 text-success",
    medium: "border-warning/30 bg-warning/10 text-warning",
    low: "border-foreground-muted/30 bg-foreground-muted/10 text-foreground-muted",
  };

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 text-xs ${confidenceStyles[confidence]}`}
    >
      <FileText className="h-3 w-3" />
      <span className="max-w-[150px] truncate">{documentName}</span>
      {chunkId && <span className="opacity-60">#{chunkId}</span>}
    </Badge>
  );
}

// Processing Status Indicator Component
function ProcessingIndicator({ status, progress }: { status: string; progress?: number }) {
  if (status === "indexed") {
    return (
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <span className="text-sm text-success">Indexed</span>
      </div>
    );
  }

  if (status === "processing") {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 text-warning animate-spin" />
          <span className="text-sm text-warning">Processing...</span>
        </div>
        {progress !== undefined && (
          <Progress value={progress} className="h-1.5 w-24" />
        )}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-error" />
        <span className="text-sm text-error">Failed</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-foreground-muted" />
      <span className="text-sm text-foreground-muted">Pending</span>
    </div>
  );
}

// Chunk Preview Drawer
function ChunkPreviewDrawer({
  document,
  open,
  onClose
}: {
  document: Document | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!document) return null;

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full sm:max-w-lg border-border bg-background">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand/10 p-2">
                <FileText className="h-5 w-5 text-brand" />
              </div>
              <div>
                <SheetTitle className="text-left">{document.name}</SheetTitle>
                <p className="text-sm text-foreground-secondary">
                  {document.pages || "?"} pages • {document.size || "?"}
                </p>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Document Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-surface-secondary p-3 text-center">
              <Layers className="h-4 w-4 text-brand mx-auto mb-1" />
              <p className="text-lg font-semibold">{document.chunks || 0}</p>
              <p className="text-xs text-foreground-secondary">Chunks</p>
            </div>
            <div className="rounded-lg bg-surface-secondary p-3 text-center">
              <MessageSquareQuote className="h-4 w-4 text-accent mx-auto mb-1" />
              <p className="text-lg font-semibold">{document.usedInAnswers || 0}</p>
              <p className="text-xs text-foreground-secondary">Citations</p>
            </div>
            <div className="rounded-lg bg-surface-secondary p-3 text-center">
              <ProcessingIndicator status={document.status} />
            </div>
          </div>

          <Separator />

          {/* Chunk Previews */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Hash className="h-4 w-4 text-foreground-secondary" />
                Chunk Previews
              </h4>
              <Badge variant="secondary" className="text-xs">
                {document.chunkPreviews?.length || 0} shown
              </Badge>
            </div>

            <ScrollArea className="h-[200px]">
              <div className="space-y-2 pr-4">
                {document.chunkPreviews && document.chunkPreviews.length > 0 ? (
                  document.chunkPreviews.map((chunk) => (
                    <div
                      key={chunk.id}
                      className="rounded-lg border border-border bg-surface-secondary p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          Chunk #{chunk.id}
                        </Badge>
                        <span className="text-xs text-foreground-muted">
                          {chunk.tokens} tokens
                        </span>
                      </div>
                      <p className="text-sm text-foreground-secondary line-clamp-3">
                        {chunk.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-foreground-secondary text-sm">
                    {document.status === "processing"
                      ? "Chunks will appear after processing completes"
                      : "No chunks available. (Backend integration pending)"}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          {/* Example Questions from Document */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Example Questions
            </h4>

            {document.exampleQuestions && document.exampleQuestions.length > 0 ? (
              <div className="space-y-2">
                {document.exampleQuestions.map((question, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-lg border border-border bg-surface-secondary p-3"
                  >
                    <BookOpen className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground">{question}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-foreground-secondary text-sm">
                No example questions generated yet
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get("/api/rag/documents");
      setDocuments(res.data || []);
    } catch (error: any) {
      console.error("Failed to fetch documents", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to fetch documents";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // Handle single file for now
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      await api.post("/api/rag/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
      fetchDocuments(); // Refresh list
    } catch (error) {
      console.error("Upload failed", error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setDragActive(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      await api.delete(`/api/rag/documents/${id}`);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      toast({
        title: "Success",
        description: "Document deleted",
      });
    } catch (error) {
      console.error("Delete failed", error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    }
  };

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexedCount = documents.filter(d => d.status === "indexed").length;
  const processingCount = documents.filter(d => d.status === "processing").length;
  const totalChunks = documents.reduce((sum, d) => sum + (d.chunks || 0), 0);

  const handleViewChunks = (doc: Document) => {
    setSelectedDocument(doc);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-foreground-secondary mt-1 text-sm md:text-base">
            Upload and manage documents for your AI assistant
          </p>
        </div>
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
            accept=".pdf,.txt,.md,.docx"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-brand text-brand-foreground hover:bg-brand-dark gap-2 w-full sm:w-auto"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{isUploading ? "Uploading..." : "Upload Documents"}</span>
            <span className="sm:hidden">{isUploading ? "Uploading..." : "Upload"}</span>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand/10 p-2">
                <FileText className="h-5 w-5 text-brand" />
              </div>
              <div>
                <p className="text-2xl font-bold">{documents.length}</p>
                <p className="text-xs text-foreground-secondary">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{indexedCount}</p>
                <p className="text-xs text-foreground-secondary">Indexed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2">
                <Loader2 className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{processingCount}</p>
                <p className="text-xs text-foreground-secondary">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <Layers className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalChunks}</p>
                <p className="text-xs text-foreground-secondary">Total Chunks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Zone */}
      <div
        className={`rounded-xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${dragActive
          ? "border-brand bg-brand/5"
          : "border-border hover:border-brand/50"
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full bg-brand/10 p-4">
            <Upload className="h-8 w-8 text-brand" />
          </div>
          <p className="text-lg font-medium text-foreground mb-1">
            Drag and drop files here
          </p>
          <p className="text-sm text-foreground-secondary mb-4">
            or click to browse from your computer
          </p>
          <p className="text-xs text-foreground-muted">
            Supported formats: PDF, DOCX, TXT, MD
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background-shell border-border text-foreground placeholder:text-foreground-muted"
          />
        </div>
        <div className="text-sm text-foreground-secondary">
          {filteredDocs.length} documents
        </div>
      </div>

      {/* Documents Table/Cards */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-brand mb-3" />
            <p className="text-sm text-foreground-secondary">Loading documents...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-error/10 p-4 mb-4">
              <AlertCircle className="h-8 w-8 text-error" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Failed to load documents</h3>
            <p className="text-foreground-secondary max-w-md mb-4">
              {error}
            </p>
            <Button
              onClick={fetchDocuments}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        ) : documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-background-shell p-4 mb-4">
              <FileText className="h-8 w-8 text-foreground-muted" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No documents yet</h3>
            <p className="text-foreground-secondary max-w-sm mb-4">
              Upload your first document to get started with the AI assistant. Supported formats include PDF, DOCX, TXT, and MD.
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-brand text-brand-foreground hover:bg-brand-dark gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-background-shell p-4 mb-4">
              <Search className="h-8 w-8 text-foreground-muted" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
            <p className="text-foreground-secondary max-w-sm mb-4">
              No documents match your search query "{searchQuery}". Try a different search term.
            </p>
            <Button
              onClick={() => setSearchQuery("")}
              variant="outline"
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear Search
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-foreground-secondary">Name</TableHead>
                    <TableHead className="text-foreground-secondary">Type</TableHead>
                    <TableHead className="text-foreground-secondary">Size</TableHead>
                    <TableHead className="text-foreground-secondary">Chunks</TableHead>
                    <TableHead className="text-foreground-secondary">Status</TableHead>
                    <TableHead className="text-foreground-secondary">Uploaded</TableHead>
                    <TableHead className="text-foreground-secondary w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocs.map((doc) => (
                    <TableRow
                      key={doc.id}
                      className="border-border hover:bg-background-shell/50 cursor-pointer"
                      onClick={() => handleViewChunks(doc)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-brand/10 p-2">
                            <FileText className="h-4 w-4 text-brand" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{doc.name}</p>
                            <p className="text-xs text-foreground-muted">{doc.pages ? `${doc.pages} pages` : ''}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground-secondary">{doc.file_type || 'PDF'}</TableCell>
                      <TableCell className="text-foreground-secondary">{doc.size || '—'}</TableCell>
                      <TableCell className="text-foreground-secondary">{doc.chunks || "—"}</TableCell>
                      <TableCell>
                        <ProcessingIndicator status={doc.status} progress={doc.processingProgress} />
                      </TableCell>
                      <TableCell className="text-foreground-secondary text-sm">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-foreground-secondary hover:text-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewChunks(doc);
                            }}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-foreground-secondary hover:text-foreground"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-background-surface border-border"
                            >
                              <DropdownMenuItem className="gap-2" onClick={() => handleViewChunks(doc)}>
                                <Eye className="h-4 w-4" />
                                View content
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-error" onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(doc.id);
                              }}>
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-border">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 hover:bg-background-shell/50 cursor-pointer transition-colors"
                  onClick={() => handleViewChunks(doc)}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="rounded-lg bg-brand/10 p-2 shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{doc.name}</p>
                        <p className="text-xs text-foreground-muted mt-0.5">
                          {doc.file_type || 'PDF'} • {doc.size || '—'}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-foreground-secondary hover:text-foreground shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-background-surface border-border"
                      >
                        <DropdownMenuItem className="gap-2" onClick={() => handleViewChunks(doc)}>
                          <Eye className="h-4 w-4" />
                          View content
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-error" onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(doc.id);
                        }}>
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-foreground-muted" />
                      <span className="text-foreground-secondary">{doc.chunks || "—"} chunks</span>
                    </div>
                    <div className="flex-1">
                      <ProcessingIndicator status={doc.status} progress={doc.processingProgress} />
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-foreground-muted">
                    {new Date(doc.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Chunk Preview Drawer */}
      <ChunkPreviewDrawer
        document={selectedDocument}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedDocument(null);
        }}
      />
    </div>
  );
}
