/**
 * ============================================================================
 * MODULE: Protected Route Component
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * ============================================================================
 */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-lumina-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v.01M12 12v-4m0 0a1 1 0 112 0v4a1 1 0 11-2 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
                <p className="text-slate-400">You don't have permission to access this page.</p>
            </div>
        );
    }

    return children;
}
