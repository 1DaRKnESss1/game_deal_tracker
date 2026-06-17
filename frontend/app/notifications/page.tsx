'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { NotificationsService, Notification } from '@/services/notifications.service';

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }
    NotificationsService.getAll()
      .then(setNotifications)
      .catch(() => toast.error('Failed to load notifications'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const updated = await NotificationsService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? updated : n))
      );
    } catch {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await NotificationsService.delete(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      toast.success('Notification deleted');
    } catch {
      toast.error('Failed to delete notification');
    }
  };

  if (loading) return <div className="pt-24 text-center text-gray-400">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold text-white mb-8">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-400">No notifications yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-center gap-4 rounded-xl p-4 border ${
                n.isRead
                  ? 'bg-gray-800 border-gray-700 opacity-60'
                  : 'bg-gray-800 border-blue-600'
              }`}
            >
              <div className="flex-1">
                <p className="text-white">{n.message}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(n.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg transition cursor-pointer"
                  >
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n.id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded-lg transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
