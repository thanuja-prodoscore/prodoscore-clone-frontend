export type ProductKey = 'gmail' | 'googleChat' | 'googleMeet' | 'calendar' | 'slack' | 'github' | 'figma';

export interface ProductUsage {
    gmail: number;
    googleChat: number;
    googleMeet: number;
    calendar: number;
    slack: number;
    github: number;
    figma: number;
}

export interface UsageEntry {
    date: string;
    usage: ProductUsage;
    totalUsage: number;
    isPTO: boolean;
}

export interface Employee {
    id: string;
    name: string;
    designation: string;
    team: string;
    email: string;
    avatarInitials: string;
    dailyUsage: UsageEntry[];
}

export interface DashboardState {
    selectedEmployeeId: string;
    dateRange: {
        from: Date;
        to: Date;
    };
    ptoOverrides: Record<string, boolean>;
}
