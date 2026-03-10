'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDashboard } from '@/context/DashboardContext';
import { PRODUCT_LABELS, getProductColor, formatMinutes } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
// import { Modal } from '@/components/ui/modal';
import { Modal } from '../ui/modal';
import { Button } from '../ui/primitives';
import { CalendarOff, CalendarCheck } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function UsageChart() {
    const { filteredUsage, togglePTO } = useDashboard();
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const labels = filteredUsage.map((d) => format(parseISO(d.date), 'MMM dd'));

    const datasets = Object.keys(PRODUCT_LABELS).map((key) => ({
        label: PRODUCT_LABELS[key],
        data: filteredUsage.map((d) => (d.isPTO ? 0 : (d.usage as any)[key])),
        backgroundColor: filteredUsage.map((d) => d.isPTO ? '#e2e8f0' : getProductColor(key)),
        borderRadius: 4,
    }));

    const data: ChartData<'bar'> = {
        labels,
        datasets,
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                    font: { size: 12, weight: 'bold' },
                    color: '#64748b',
                },
            },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                callbacks: {
                    label: (context) => {
                        const entry = filteredUsage[context.dataIndex];
                        if (entry.isPTO) return ' PTO (Time Off)';
                        return ` ${context.dataset.label}: ${formatMinutes(context.raw as number)}`;
                    },
                    afterBody: (context) => {
                        const entry = filteredUsage[context[0].dataIndex];
                        return entry.isPTO ? '\nStatus: Paid Time Off' : `\nTotal: ${formatMinutes(entry.totalUsage)}`;
                    }
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: { color: '#94a3b8' },
            },
            y: {
                stacked: true,
                grid: { color: '#f1f5f9' },
                ticks: {
                    color: '#94a3b8',
                    callback: (value) => `${value}m`
                },
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                setSelectedDay(filteredUsage[index].date);
            }
        },
    };

    const currentEntry = selectedDay ? filteredUsage.find(e => e.date === selectedDay) : null;

    return (
        <div className="h-[400px] w-full bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <Bar options={options} data={data} />

            <Modal
                isOpen={!!selectedDay}
                onClose={() => setSelectedDay(null)}
                title={selectedDay ? format(parseISO(selectedDay), 'EEEE, MMMM dd, yyyy') : ''}
            >
                <div className="space-y-4">
                    <p className="text-slate-600 text-sm">
                        Manage productivity status for this date. Marking a day as PTO will exclude it from usage aggregates.
                    </p>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg", currentEntry?.isPTO ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600")}>
                                {currentEntry?.isPTO ? <CalendarOff size={20} /> : <CalendarCheck size={20} />}
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">{currentEntry?.isPTO ? 'Status: PTO' : 'Status: Working'}</p>
                                <p className="text-xs text-slate-500">{currentEntry?.isPTO ? 'Usage is disabled' : `Usage recorded: ${currentEntry?.totalUsage}m`}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            className="flex-1"
                            variant={currentEntry?.isPTO ? "outline" : "danger"}
                            onClick={() => {
                                if (selectedDay) togglePTO(selectedDay);
                                setSelectedDay(null);
                            }}
                        >
                            {currentEntry?.isPTO ? 'Mark as Working' : 'Mark as PTO'}
                        </Button>
                        <Button className="flex-1" variant="ghost" onClick={() => setSelectedDay(null)}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
