import api from './axios';

export const registerAgent = async (data: { agent_url: string; agent_token: string }) => {
    const response = await api.post('/api/db/agent/register', data);
    return response.data;
};

export const testAgentConnection = async (data?: { agent_url: string; agent_token: string }) => {
    const response = await api.post('/api/db/agent/test', data);
    return response.data;
};

export const syncSchema = async () => {
    const response = await api.post('/api/db/agent/sync-schema');
    return response.data;
};

export const getTables = async () => {
    const response = await api.get('/api/db/tables');
    return response.data;
};

export const updateTableAccess = async (table: string, allowed: boolean) => {
    const response = await api.patch('/api/db/tables/access', { table, allowed });
    return response.data;
};

export const connectAgent = async (data: { agent_url: string; agent_token: string }) => {
    const response = await api.post('/api/db/agent/connect', data);
    return response.data;
};
