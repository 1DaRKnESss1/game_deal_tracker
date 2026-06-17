'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = () => setIsLoggedIn(!!localStorage.getItem('accessToken'));
    checkToken();
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    toast.success('Logged out');
    router.push('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900 border-b border-gray-800 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg">
          GameDeal
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/games" className="text-gray-400 hover:text-white transition">
            Search Games
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/wishlist" className="text-gray-400 hover:text-white transition">
                Wishlist
              </Link>
              <Link href="/notifications" className="text-gray-400 hover:text-white transition">
                Notifications
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
