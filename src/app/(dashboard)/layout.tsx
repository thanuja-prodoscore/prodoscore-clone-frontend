'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem('employee_user');
        if (!savedUser && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <div className="transition-all duration-300">
                <main className="p-10 transition-all duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
}
