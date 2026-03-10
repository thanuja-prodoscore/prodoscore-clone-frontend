'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
    avatarInitials: string;
}

interface AuthContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem('mock_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = () => {
        const mockUser = {
            name: 'Admin User',
            email: 'admin@acme.corp',
            avatarInitials: 'AU',
        };
        setUser(mockUser);
        localStorage.setItem('mock_user', JSON.stringify(mockUser));
        router.push('/dashboard');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mock_user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
