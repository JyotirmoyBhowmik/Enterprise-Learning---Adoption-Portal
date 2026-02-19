/**
 * MODULE: User Profile / Progress Dashboard
 * SYSTEM: Lumina Learning & Adoption Suite
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProgressRing from '../components/ProgressRing';
import { api } from '../services/api';

export default function Profile() {
    const { user, isAuthenticated } = useAuth();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) loadProgress();
        else setLoading(false);
    }, [isAuthenticated]);

    async function loadProgress() {
        try {
            const data = await api.getProgressSummary();
            setSummary(data);
        } catch { setSummary(null); }
        finally { setLoading(false); }
    }

    if (!isAuthenticated) {
        return (
            <div className="bg-mesh min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Sign in to view your progress</h2>
                    <Link to="/login" className="btn-primary inline-block mt-4">Sign In</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-mesh min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Profile Header */}
                <div className="glass-card p-8 mb-8 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
                        style={{ background: 'linear-gradient(135deg, #3478ff, #8b5cf6)' }}>
                        {user?.displayName?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-white">{user?.displayName}</h1>
                        <p className="text-slate-400">{user?.email}</p>
                        <span className="badge mt-2 inline-flex">{user?.role === 'admin' ? '🔑 Administrator' : '📚 Learner'}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="glass-card p-6 text-center">
                        <ProgressRing progress={summary?.totalCompleted ? Math.min((summary.totalCompleted / 16) * 100, 100) : 0} />
                        <p className="text-sm text-slate-400 mt-3">Overall Progress</p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <div className="text-3xl font-bold gradient-text mb-1">{summary?.totalCompleted || 0}</div>
                        <p className="text-sm text-slate-400">Lessons Completed</p>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <div className="text-3xl font-bold gradient-text mb-1">{summary?.averageScore || 0}%</div>
                        <p className="text-sm text-slate-400">Average Score</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-800 rounded-lg animate-pulse" />)}
                        </div>
                    ) : summary?.recentActivity?.length > 0 ? (
                        <div className="space-y-3">
                            {summary.recentActivity.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white truncate">Lesson completed</p>
                                        <p className="text-xs text-slate-500">{new Date(item.completedAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className="badge-success text-xs">{item.score}%</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-slate-400 mb-2">No activity yet</p>
                            <Link to="/" className="text-lumina-400 text-sm hover:underline">Start learning →</Link>
                        </div>
                    )}
                </div>

                {/* Attribution */}
                <p className="text-center text-xs text-slate-600 mt-8">
                    Lumina Learning Suite v1.0 | Architected and Developed by Jyotirmoy Bhowmik
                </p>
            </div>
        </div>
    );
}
