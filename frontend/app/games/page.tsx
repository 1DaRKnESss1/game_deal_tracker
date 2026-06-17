'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { GamesService } from '@/services/games.service';
import { WishlistService } from '@/services/wishlist.service';
import { Game } from '@/types/game.types';

export default function GamesPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async (game: Game) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('Please login to add games to wishlist');
      router.push('/login');
      return;
    }
    try {
      await WishlistService.addGame({
        gameId: game.gameID,
        title: game.external,
        price: parseFloat(game.cheapest),
        thumb: game.thumb,
      });
      toast.success(`${game.external} added to wishlist!`);
    } catch {
      toast.error('Failed to add game. It may already be in your wishlist.');
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const data = await GamesService.search(query);
      setResults(data);
      if (data.length === 0) toast('No games found');
    } catch {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold text-white mb-8">Search Games</h1>
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 border border-gray-700"
          placeholder="Search for a game..."
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition cursor-pointer"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {results.map((game) => (
          <div key={game.gameID} className="flex items-center gap-4 bg-gray-800 rounded-xl p-4 border border-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={game.thumb} alt={game.external} width={120} height={45} className="rounded object-cover" />
            <div className="flex-1">
              <h2 className="text-white font-semibold">{game.external}</h2>
              <p className="text-green-400 text-sm">From ${game.cheapest}</p>
            </div>
            <button
              onClick={() => handleAddToWishlist(game)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
            >
              Add to Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
