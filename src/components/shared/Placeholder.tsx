'use client';

import { Card } from '@/components/ui/primitives';
import { Construction } from 'lucide-react';

export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="h-[calc(100vh-12rem)] flex items-center justify-center p-8">
            <Card className="max-w-md w-full p-12 text-center space-y-6 border-dashed border-2 bg-slate-50/50">
                <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Construction size={32} />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    <p className="text-slate-500">
                        This module is currently under development. In a production environment, this page would contain advanced analytics and management tools for {title.toLowerCase()}.
                    </p>
                </div>
                <div className="pt-4 space-y-3">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 w-[65%] animate-pulse"></div>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Development Progress: 65%</p>
                </div>
            </Card>
        </div>
    );
}
