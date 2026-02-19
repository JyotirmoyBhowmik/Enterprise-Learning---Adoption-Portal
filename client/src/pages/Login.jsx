/**
 * MODULE: Login Page
 * SYSTEM: Lumina Learning & Adoption Suite
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) { navigate('/'); return null; }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-mesh min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-2xl mx-auto mb-4"
                        style={{ background: 'linear-gradient(135deg, #3478ff, #8b5cf6)' }}>L</div>
                    <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                    <p className="text-slate-400 mt-1">Sign in to Lumina Learning Suite</p>
                </div>
                <div className="glass-card p-8">
                    <div className="mb-6 p-3 rounded-xl text-xs" style={{ background: 'rgba(52,120,255,0.06)', border: '1px solid rgba(52,120,255,0.1)', color: '#94a3b8' }}>
                        <span className="text-lumina-400 font-medium">Demo Mode:</span> Use any email and password (min 4 chars). Use &quot;admin@company.com&quot; for admin access.
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <div className="p-3 rounded-xl text-sm text-red-300" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>{error}</div>}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-lumina-500/50 transition-all" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={4} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-lumina-500/50 transition-all" />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                            {loading ? (<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>) : 'Sign In'}
                        </button>
                    </form>
                    <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: 'var(--glass-border)' }}>
                        <p className="text-xs text-slate-500 mb-3">Enterprise SSO</p>
                        <button disabled className="w-full py-2.5 rounded-xl border text-sm text-slate-400 cursor-not-allowed opacity-50" style={{ borderColor: 'var(--glass-border)' }}>
                            Sign in with Active Directory (Phase 3)
                        </button>
                    </div>
                </div>
                <p className="text-center text-xs text-slate-600 mt-6"><Link to="/" className="hover:text-slate-400 transition-colors">← Back to Home</Link></p>
            </div>
        </div>
    );
}
