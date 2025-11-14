import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Nuursend</h1>
            <div className="flex gap-4">
              <a href="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</a>
              <a href="/campaigns" className="text-gray-700 hover:text-gray-900">Campaigns</a>
              <a href="/contacts" className="text-gray-700 hover:text-gray-900">Contacts</a>
              <a href="/billing" className="text-gray-700 hover:text-gray-900">Billing</a>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-6">
        {children}
      </main>
    </div>
  );
}

