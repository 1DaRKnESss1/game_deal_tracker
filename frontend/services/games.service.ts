import api from '@/lib/axios';

export const GamesService = {
  search: async (title: string) => {
    const response = await api.get(`/games/search?title=${encodeURIComponent(title)}`);
    return response.data;
  },
};
