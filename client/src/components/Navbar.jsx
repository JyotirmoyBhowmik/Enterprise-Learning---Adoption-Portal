import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-surface-border sticky top-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">

            {/* Search Bar / Welcome */}
            <div className="flex-1 flex items-center gap-4">
                <div className="hidden sm:flex relative w-full max-w-md">
                    <svg className="w-5 h-5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search modules, lessons, or ask AI..."
                        className="w-full pl-10 pr-4 py-2 bg-surface-muted border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lumina-500/20 focus:border-lumina-500 transition-all text-text"
                    />
                </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 hover:bg-surface-muted p-1.5 rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-lumina-100 text-lumina-600 flex items-center justify-center font-bold text-sm">
                                {user?.displayName?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <span className="text-sm font-medium text-text hidden sm:block">{user?.displayName}</span>
                            <svg className="w-4 h-4 text-text-muted hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 white-card py-1 z-50 animate-fade-in shadow-lg">
                                <Link to="/profile" className="block px-4 py-2 text-sm text-text hover:bg-surface-muted">
                                    My Profile
                                </Link>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="block px-4 py-2 text-sm text-text hover:bg-surface-muted">
                                        Admin Dashboard
                                    </Link>
                                )}
                                <div className="border-t border-surface-border my-1" />
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="btn-primary py-2 text-sm">
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
