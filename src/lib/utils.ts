import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    return `${hours}h ${mins}m`;
}

export function getProductColor(product: string): string {
    const colors: Record<string, string> = {
        gmail: '#EA4335',
        googleChat: '#00897B',
        googleMeet: '#00AC47',
        calendar: '#4285F4',
        slack: '#4A154B',
        github: '#181717',
        figma: '#F24E1E',
    };
    return colors[product] || '#64748b';
}

export const PRODUCT_LABELS: Record<string, string> = {
    gmail: 'Gmail',
    googleChat: 'Google Chat',
    googleMeet: 'Google Meet',
    calendar: 'Calendar',
    slack: 'Slack',
    github: 'GitHub',
    figma: 'Figma',
};
