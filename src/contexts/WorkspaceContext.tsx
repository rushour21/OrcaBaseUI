import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";

export interface Workspace {
  id: string;
  name: string;
  public_api_key: string; // From your new DB column
  created_at: string;
}

interface WorkspaceContextType {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  switchWorkspace: (id: string) => void;
  createWorkspace: (name: string) => Promise<Workspace>;
  refreshWorkspaces: () => Promise<void>;
  isLoading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  // Load workspaces from Backend
  const refreshWorkspaces = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const res = await api.get("/api/workspaces");
      setWorkspaces(res.data);

      // Restore from localStorage or default to first
      const storedId = localStorage.getItem("currentWorkspaceId");
      const matched = res.data.find(w => w.id === storedId);

      if (matched) {
        setCurrentWorkspace(matched);
      } else if (res.data.length > 0) {
        setCurrentWorkspace(res.data[0]);
        localStorage.setItem("currentWorkspaceId", res.data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch workspaces", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createWorkspace = async (name: string) => {
    const res = await api.post("/api/workspaces", { name });
    const newWs = res.data;
    setWorkspaces((prev) => [...prev, newWs]);
    setCurrentWorkspace(newWs);
    return newWs;
  };

  const switchWorkspace = (id: string) => {
    const ws = workspaces.find(w => w.id === id);
    if (ws) {
      setCurrentWorkspace(ws);
      localStorage.setItem("currentWorkspaceId", ws.id);
    }
  };

  // Auto-fetch when user logs in
  useEffect(() => {
    refreshWorkspaces();
  }, [token]);

  return (
    <WorkspaceContext.Provider value={{
      currentWorkspace,
      workspaces,
      switchWorkspace,
      createWorkspace,
      refreshWorkspaces,
      isLoading
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return context;
};