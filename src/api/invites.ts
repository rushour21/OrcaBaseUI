import api from './axios';

export const inviteApi = {
    create: async (data: { email: string; role: string; workspaceId: string }) => {
        const response = await api.post('/api/invites', data);
        return response.data;
    },

    listMyInvites: async () => {
        const response = await api.get('/api/invites');
        return response.data;
    },

    accept: async (inviteId: string) => {
        const response = await api.post(`/api/invites/${inviteId}/accept`);
        return response.data;
    }
};
