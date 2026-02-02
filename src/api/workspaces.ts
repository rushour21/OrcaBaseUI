import api from './axios';

export const workspaceApi = {
    listMembers: async (workspaceId: string) => {
        const response = await api.get(`/api/workspaces/${workspaceId}/members`);
        return response.data;
    },

    // Add other workspace related calls here as needed
    list: async () => {
        const response = await api.get('/api/workspaces');
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/api/workspaces', data);
        return response.data;
    }
};
