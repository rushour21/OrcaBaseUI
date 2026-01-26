import api from './axios';

export interface ChatResponse {
    type: 'text' | 'sql_generated' | 'visualization_request' | 'blocked';
    text?: string;
    sql?: string;
    explanation?: string;
    chartConfig?: any; // Recharts config
    reasoning?: string;
    sessionId?: string;
    approvalRequired?: boolean;
}

export const sendChatQuery = async (data: { query: string; sessionId?: string }) => {
    const response = await api.post('/api/database-chat/query', data);
    return response.data;
};

export const approveChatSql = async (data: { sql: string; sessionId?: string }) => {
    const response = await api.post('/api/database-chat/approve', data);
    return response.data;
};

export const getSessions = async () => {
    const response = await api.get('/api/database-chat/sessions');
    return response.data;
};

export const getSessionMessages = async (sessionId: string) => {
    const response = await api.get(`/api/database-chat/sessions/${sessionId}/messages`);
    return response.data;
};

export const toggleWebSearch = async (sessionId: string, enabled: boolean) => {
    const response = await api.put(`/api/database-chat/sessions/${sessionId}/web-search`, { enabled });
    return response.data;
};

export const createSession = async (title?: string) => {
    const response = await api.post('/api/database-chat/sessions', { title });
    return response.data;
};
