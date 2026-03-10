'use client';

import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    BarChart3,
    CalendarCheck,
    Users,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Product Usage', href: '/product-usage', icon: BarChart3 },
    { name: 'PTO Management', href: '/pto', icon: CalendarCheck },
    { name: 'Team Insights', href: '/team-insights', icon: Users },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 bg-slate-900 text-slate-400 transition-all duration-300 z-50 flex flex-col border-r border-slate-800",
            collapsed ? "w-20" : "w-64"
        )}>
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white shrink-0">
                        <BarChart3 size={20} />
                    </div>
                    {!collapsed && <span className="font-bold text-lg text-white truncate">Empower</span>}
                </div>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group overflow-hidden",
                                active ? "bg-primary-600 text-white" : "hover:bg-slate-800 hover:text-slate-200"
                            )}
                        >
                            <item.icon size={20} className={cn("shrink-0", active ? "text-white" : "group-hover:text-primary-400")} />
                            {!collapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
                            {active && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-slate-800 space-y-1">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all group overflow-hidden"
                >
                    <LogOut size={20} className="shrink-0" />
                    {!collapsed && <span className="font-medium">Logout</span>}
                </button>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-all overflow-hidden"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    {!collapsed && <span className="font-medium">Collapse</span>}
                </button>
            </div>
        </aside>
    );
}
