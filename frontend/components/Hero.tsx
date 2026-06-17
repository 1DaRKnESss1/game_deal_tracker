'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <h1 className="text-5xl font-bold text-white mb-4">
        Game Deal Tracker
      </h1>
      <p className="text-gray-400 text-xl max-w-xl mb-10">
        Track prices on your favourite games and get notified when they drop.
        Never miss a deal again.
      </p>
      <div className="flex gap-4">
        <Link
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="border border-gray-500 hover:border-white text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition"
        >
          Login
        </Link>
      </div>
    </section>
  );
}
