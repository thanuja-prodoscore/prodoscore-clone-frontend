'use client';

import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/context/DashboardContext';

export function DateRangePicker() {
    const { dateRange, setDateRange } = useDashboard();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <Button
                variant="outline"
                size="md"
                className="gap-2 bg-white font-semibold"
                onClick={() => setIsOpen(!isOpen)}
            >
                <CalendarIcon size={16} className="text-slate-400" />
                <span className="text-slate-700">
                    {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                </span>
                <ChevronDown size={14} className={cn("text-slate-400 transition-transform", isOpen && "rotate-180")} />
            </Button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 z-50 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200 origin-top-right">
                    <DayPicker
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => range?.from && range?.to && setDateRange({ from: range.from, to: range.to })}
                        numberOfMonths={1}
                        className="p-0 m-0"
                        classNames={{
                            caption: "text-slate-900",
                            head_cell: "text-slate-600",
                            day_selected: "bg-[#0c90eb] text-white",
                            day_today: "text-[#0c90eb] font-bold"
                        }}
                    />
                    <div className="mt-4 flex justify-end">
                        <Button size="sm" onClick={() => setIsOpen(false)}>Apply Range</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
