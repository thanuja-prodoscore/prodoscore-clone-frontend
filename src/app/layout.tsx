import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DashboardProvider } from "@/context/DashboardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Empower | Product Usage Dashboard",
    description: "Advanced employee workspace analytics and product usage insights.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full bg-slate-50">
            <body className={`${inter.className} h-full`}>
                <AuthProvider>
                    <DashboardProvider>
                        {children}
                    </DashboardProvider>
                </AuthProvider>
            </body>
        </html>
    ); 
}
