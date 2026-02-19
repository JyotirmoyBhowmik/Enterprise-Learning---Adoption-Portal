/**
 * ============================================================================
 * MODULE: Authentication Context (React)
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - Manages authentication state across the entire React application.
 * - In Phase 3, this will integrate with Active Directory SSO via
 *   passport-azure-ad redirects.
 * ============================================================================
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const userData = await api.getMe();
            setUser(userData);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login(email, password) {
        const result = await api.login(email, password);
        setUser(result.user);
        return result;
    }

    async function logout() {
        await api.logout();
        setUser(null);
    }

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
