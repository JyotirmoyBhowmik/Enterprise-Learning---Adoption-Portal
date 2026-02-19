/**
 * ============================================================================
 * MODULE: Navigation Bar Component
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * ============================================================================
 */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/ai-sandbox', label: 'AI Sandbox' },
];

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b backdrop-blur-xl"
            style={{
                background: 'rgba(2, 6, 23, 0.8)',
                borderColor: 'var(--glass-border)',
            }}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                            style={{ background: 'linear-gradient(135deg, #3478ff, #8b5cf6)' }}>
                            L
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-bold text-white text-lg tracking-tight">Lumina</span>
                            <span className="text-xs text-slate-400 block -mt-1 tracking-wider">LEARNING SUITE</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.to
                                        ? 'text-white bg-white/10'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                                        style={{ background: 'linear-gradient(135deg, #3478ff, #8b5cf6)' }}>
                                        {user?.displayName?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span className="hidden sm:block text-sm text-slate-300">{user?.displayName}</span>
                                </Link>
                                <button onClick={logout} className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-primary text-sm">
                                Sign In
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-slate-400 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileOpen && (
                    <div className="md:hidden py-4 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 rounded-lg text-sm font-medium mb-1 ${location.pathname === link.to
                                        ? 'text-white bg-white/10'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}
