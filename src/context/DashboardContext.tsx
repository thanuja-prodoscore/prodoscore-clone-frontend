'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
// import { MOCK_EMPLOYEES } from '@/data/mock-data';
import { MOCK_EMPLOYEES } from '@/data/mock-data';
// import { Employee, UsageEntry } from '@/types';
import { Employee, UsageEntry } from '@/types';
import { subDays, startOfToday, isWithinInterval, parseISO } from 'date-fns';

interface DashboardContextType {
    selectedEmployee: Employee;
    setSelectedEmployeeId: (id: string) => void;
    dateRange: { from: Date; to: Date };
    setDateRange: (range: { from: Date; to: Date }) => void;
    filteredUsage: UsageEntry[];
    togglePTO: (date: string) => void;
    ptoOverrides: Record<string, boolean>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(MOCK_EMPLOYEES[0].id);
    const [dateRange, setDateRange] = useState({
        from: subDays(startOfToday(), 7),
        to: startOfToday(),
    });
    const [ptoOverrides, setPtoOverrides] = useState<Record<string, boolean>>({});

    const selectedEmployee = useMemo(() => {
        return MOCK_EMPLOYEES.find((e) => e.id === selectedEmployeeId) || MOCK_EMPLOYEES[0];
    }, [selectedEmployeeId]);

    const filteredUsage = useMemo(() => {
        return selectedEmployee.dailyUsage.map(entry => ({
            ...entry,
            isPTO: ptoOverrides[entry.date] !== undefined ? ptoOverrides[entry.date] : entry.isPTO
        })).filter((entry) => {
            const entryDate = parseISO(entry.date);
            return isWithinInterval(entryDate, { start: dateRange.from, end: dateRange.to });
        });
    }, [selectedEmployee, dateRange, ptoOverrides]);

    const togglePTO = (date: string) => {
        setPtoOverrides(prev => {
            const current = prev[date] !== undefined
                ? prev[date]
                : (selectedEmployee.dailyUsage.find(e => e.date === date)?.isPTO || false);
            return { ...prev, [date]: !current };
        });
    };

    return (
        <DashboardContext.Provider
            value={{
                selectedEmployee,
                setSelectedEmployeeId,
                dateRange,
                setDateRange,
                filteredUsage,
                togglePTO,
                ptoOverrides,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}
