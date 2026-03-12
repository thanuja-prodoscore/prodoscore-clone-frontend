'use client';

import { useDashboard } from '@/context/DashboardContext';
import { KPISection } from '@/components/shared/KPISection';
import { DateRangePicker } from '@/components/shared/DateRangePicker';
import { UsageChart } from '@/components/charts/UsageChart';
import { Badge, Card, Avatar } from '@/components/ui/primitives';
import { Info, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/primitives';
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useAuth } from '@/context/AuthContext';
import { basicEmployeeDetails } from '@/services/api';


export default function DashboardPage() {
    const { selectedEmployee } = useDashboard();
    const [userInfo, setUserInfo] = useState({ email: "", name: "", image: "" });
    const { user } = useAuth()

    useEffect(() => {
    const idToken = localStorage.getItem("token");
    if (!idToken) return;

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          console.log("Token claims:", tokenResult.claims);
          console.log(user)
          setUserInfo({
            email: user.email || (tokenResult.claims.email as string) || "",
            name: user.displayName || (tokenResult.claims.name as string) || "",
            image: user.photoURL || (tokenResult.claims.photoURL as string) || "",
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        const decoded = JSON.parse(atob(idToken.split(".")[1]));
        setUserInfo({
          email: decoded.email || "",
          name: decoded.name || "",
          image: decoded.photoURL || "",
        });
      }
    });

    return () => unsubscribe();
  }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-5">
                    <Avatar src={userInfo.image} initials={selectedEmployee.avatarInitials} className="w-16 h-16 text-xl" />
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
                            <Badge variant="info">{user?.designation}</Badge>
                        </div>
                        <p className="text-slate-500 mt-1">
                            Team: <span className="font-semibold text-slate-700">{user?.team?.name}</span> •
                            Email: <span className="text-slate-600 ml-1">{user?.email}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <DateRangePicker />
                    <Button variant="outliDemo Userne" size="md" className="gap-2 bg-white">
                        <Download size={16} />
                        <span className="hidden sm:inline">Export</span>
                    </Button>
                </div>
            </div>

            <KPISection />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Product Usage Breakdown</h3>
                        <p className="text-sm text-slate-500">Daily usage in minutes across active products.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                        <Info size={14} />
                        <span>Click on bars to manage PTO</span>
                    </div>
                </div>

                <UsageChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-6 border-none shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900">Recent Activity Log</h3>
                        {/* <Button variant="ghost" size="sm" className="text-primary-600">View All</Button> */}
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-50 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                <p className="text-sm font-medium text-slate-800">Gmail session active for 45m</p>
                            </div>
                            <span className="text-xs text-slate-400">2h ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-50 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <p className="text-sm font-medium text-slate-800">GitHub push: feature/dashboard-chart</p>
                            </div>
                            <span className="text-xs text-slate-400">4h ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-50 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                <p className="text-sm font-medium text-slate-800">Google Meet: Team Sync (32m)</p>
                            </div>
                            <span className="text-xs text-slate-400">Yesterday</span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-none shadow-sm bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                    <h3 className="font-bold text-lg mb-2">Usage Insights</h3>
                    <p className="text-primary-100 text-sm leading-relaxed mb-6">
                        {userInfo.name} is most productive between 10 AM and 2 PM. GitHub usage has increased by 15% this week.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-primary-200 uppercase font-bold tracking-wider">Top Product</span>
                            <span className="font-bold">GitHub</span>
                        </div>
                        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-white h-full w-[75%] rounded-full"></div>
                        </div>
                        <Button variant="outline" className="w-full border-white/20 bg-white/10 hover:bg-white text-white hover:text-primary-600 mt-4">
                            View Insights
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
