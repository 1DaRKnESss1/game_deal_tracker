'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { WishlistService } from '@/services/wishlist.service';

interface WishlistItem {
  id: string;
  gameId: string;
  title: string;
  price: number;
  thumb: string;
}

export default function WishlistPage() {
  const router = useRouter();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }
    WishlistService.getAll()
      .then(setItems)
      .catch(() => toast.error('Failed to load wishlist'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleRemove = async (id: string) => {
    try {
      await WishlistService.remove(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Removed from wishlist');
    } catch {
      toast.error('Failed to remove game');
    }
  };

  if (loading) return <div className="pt-24 text-center text-gray-400">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold text-white mb-8">My Wishlist</h1>
      {items.length === 0 ? (
        <p className="text-gray-400">Your wishlist is empty. Search for games to add!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-gray-800 rounded-xl p-4 border border-gray-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.thumb} alt={item.title} width={120} height={45} className="rounded object-cover" />
              <div className="flex-1">
                <h2 className="text-white font-semibold">{item.title}</h2>
                <p className="text-green-400 text-sm">${item.price}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
