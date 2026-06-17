'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { RegisterDto } from '@/types/auth.types';
import { AuthService } from '@/services/auth.service';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<RegisterDto>();

  const onSubmit = async (data: RegisterDto) => {
    try {
      await AuthService.register(data);
      toast.success('Account created! Please login.');
      router.push('/login');
    } catch {
      toast.error('Registration failed. Email or username already exists.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-8 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6">Create Account</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Username</label>
            <input
              {...register('username', { required: 'Username is required' })}
              type="text"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="your_username"
            />
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Password</label>
            <input
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              type="password"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition cursor-pointer mt-2"
          >
            {isSubmitting ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
