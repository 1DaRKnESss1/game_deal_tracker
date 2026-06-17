import api from '@/lib/axios';

export interface AddToWishlistDto {
  gameId: string;
  title: string;
  price: number;
  thumb: string;
}

export const WishlistService = {
  addGame: async (dto: AddToWishlistDto) => {
    const response = await api.post('/wishlist', dto);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/wishlist');
    return response.data;
  },

  remove: async (id: string) => {
    const response = await api.delete(`/wishlist/${id}`);
    return response.data;
  },
};
