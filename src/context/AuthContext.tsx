'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { basicEmployeeDetails } from '@/services/api';
import { json } from 'stream/consumers';

interface User {
    name: string;
    email: string;
    designation: string,
    team?: { id: number; name: string };
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User) => void 
    login: (idToken: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem('employee_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async(idToken : string) => {
        try{
            const data = await basicEmployeeDetails(idToken)
            setUser(data)
            localStorage.setItem("employee_user", JSON.stringify(data))
            router.push("/dashboard")
        }catch(error){
            console.error('Failed to fetch user details', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('employee_user');
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
