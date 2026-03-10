// import { Employee, UsageEntry, ProductUsage } from '@/types';
import { Employee, UsageEntry, ProductUsage } from '@/types';
import { subDays, format, startOfToday } from 'date-fns';

const PRODUCTS = ['gmail', 'googleChat', 'googleMeet', 'calendar', 'slack', 'github', 'figma'] as const;

function generateMockUsage(days: number): UsageEntry[] {
    const usage: UsageEntry[] = [];
    const today = startOfToday();

    for (let i = days; i >= 0; i--) {
        const date = subDays(today, i);
        const dateStr = format(date, 'yyyy-MM-dd');


        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isPTO = isWeekend || Math.random() < 0.05;

        const dailyUsage: ProductUsage = {
            gmail: isPTO ? 0 : Math.floor(Math.random() * 60) + 20,
            googleChat: isPTO ? 0 : Math.floor(Math.random() * 45) + 10,
            googleMeet: isPTO ? 0 : Math.floor(Math.random() * 120) + 30,
            calendar: isPTO ? 0 : Math.floor(Math.random() * 45) + 5,
            slack: isPTO ? 0 : Math.floor(Math.random() * 90) + 20,
            github: isPTO ? 0 : Math.floor(Math.random() * 180) + 40,
            figma: isPTO ? 0 : Math.floor(Math.random() * 120) + 10,
        };

        const totalUsage = Object.values(dailyUsage).reduce((acc, curr) => acc + curr, 0);

        usage.push({
            date: dateStr,
            usage: dailyUsage,
            totalUsage,
            isPTO,
        });
    }

    return usage;
}

export const MOCK_EMPLOYEES: Employee[] = [
    {
        id: 'emp-1',
        name: 'Alex Rivera',
        designation: 'Senior Software Engineer',
        team: 'Core Platform',
        email: 'alex.rivera@acme.corp',
        avatarInitials: 'AR',
        dailyUsage: generateMockUsage(30),
    },
    {
        id: 'emp-2',
        name: 'Sarah Chen',
        designation: 'Staff Product Designer',
        team: 'User Experience',
        email: 'sarah.chen@acme.corp',
        avatarInitials: 'SC',
        dailyUsage: generateMockUsage(30),
    },
    {
        id: 'emp-3',
        name: 'Marcus Thorne',
        designation: 'Lead Product Manager',
        team: 'Product Strategy',
        email: 'marcus.thorne@acme.corp',
        avatarInitials: 'MT',
        dailyUsage: generateMockUsage(30),
    },
];
