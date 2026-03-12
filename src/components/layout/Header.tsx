'use client';

import { useDashboard } from '@/context/DashboardContext';
import { MOCK_EMPLOYEES } from '@/data/mock-data';
import { Avatar, Button } from '@/components/ui/primitives';
import { Bell, Search, ChevronDown, UserCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Header() {
    const { selectedEmployee, setSelectedEmployeeId } = useDashboard();
    const { user } = useAuth();

    return (
        <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-6">
            <div className="flex items-center gap-8">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-xs text-slate-500 font-medium">Workspace Analytics</p>
                </div>

                <div className="hidden md:flex items-center bg-slate-100 rounded-lg p-1 gap-1">
                    {MOCK_EMPLOYEES.map((emp) => (
                        <button
                            key={emp.id}
                            onClick={() => setSelectedEmployeeId(emp.id)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${selectedEmployee.id === emp.id
                                ? 'bg-white text-primary-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            {emp.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="w-9 px-0 rounded-full">
                        <Search size={18} />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-9 px-0 rounded-full relative">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                    </Button>
                </div>

                <div className="h-8 w-px bg-slate-200 mx-2" />

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-slate-500">Workspace Admin</p>
                    </div>
                    <Avatar initials={user?.avatarInitials || 'AU'} className="w-9 h-9" />
                    <ChevronDown size={16} className="text-slate-400" />
                </div>
            </div>
        </header>
    );
}
