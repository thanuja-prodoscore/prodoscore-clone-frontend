'use client';

import { Card } from '@/components/ui/primitives';
import { useDashboard } from '@/context/DashboardContext';
import { formatMinutes } from '@/lib/utils';
import {
    Activity,
    Clock,
    CalendarOff,
    TrendingUp,
    SmartphoneNfc
} from 'lucide-react';
import { useMemo } from 'react';

export function KPISection() {
    const { filteredUsage } = useDashboard();

    const stats = useMemo(() => {
        const activeDays = filteredUsage.filter(d => !d.isPTO);
        const totalMinutes = activeDays.reduce((acc, curr) => acc + curr.totalUsage, 0);
        const ptoCount = filteredUsage.filter(d => d.isPTO).length;
        const avgUsage = activeDays.length > 0 ? Math.floor(totalMinutes / activeDays.length) : 0;

        const activeProducts = 7;

        return [
            {
                label: 'Total Usage',
                value: formatMinutes(totalMinutes),
                icon: Clock,
                trend: '+12%',
                color: 'text-primary-600',
                bg: 'bg-primary-50',
            },
            {
                label: 'Avg. Daily Usage',
                value: formatMinutes(avgUsage),
                icon: Activity,
                trend: '-3%',
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
            },
            {
                label: 'Active Products',
                value: `${activeProducts}/7`,
                icon: SmartphoneNfc,
                trend: 'Stable',
                color: 'text-amber-600',
                bg: 'bg-amber-50',
            },
            {
                label: 'PTO Days',
                value: ptoCount.toString(),
                icon: CalendarOff,
                trend: '',
                color: 'text-rose-600',
                bg: 'bg-rose-50',
            },
        ];
    }, [filteredUsage]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
                <Card key={idx} className="p-5 border-none shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        {stat.trend && (
                            <div className={cn(
                                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                                stat.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" :
                                    stat.trend.startsWith('-') ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-500"
                            )}>
                                <TrendingUp size={12} className={stat.trend.startsWith('-') ? "rotate-180" : ""} />
                                {stat.trend}
                            </div>
                        )}
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </Card>
            ))}
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
