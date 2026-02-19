/**
 * ============================================================================
 * MODULE: Home Page — Dynamic Category Bento Grid
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE FOR FUTURE DEVELOPERS:
 * - This platform is strictly database-driven.
 * - DO NOT hardcode new training categories into the React components.
 * - All new content must be inserted via the PostgreSQL `categories` and
 *   `modules` tables to maintain the integrity of the original architecture.
 * ============================================================================
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import CategoryCard from '../components/CategoryCard';

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ categories: 0, modules: 0, learners: 0 });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const cats = await api.getCategories();
            setCategories(cats);
            const mods = await api.getModules();
            setStats({
                categories: cats.length,
                modules: mods.length,
                learners: '500+',
            });
        } catch (err) {
            console.error('Failed to load categories:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-mesh min-h-screen">
            {/* ─── Hero Section ─── */}
            <section className="relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-15"
                        style={{ background: 'radial-gradient(ellipse, #3478ff, transparent)' }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 animate-fade-in"
                            style={{
                                background: 'rgba(52, 120, 255, 0.08)',
                                border: '1px solid rgba(52, 120, 255, 0.15)',
                                color: '#599eff',
                            }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Enterprise Learning Platform
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 animate-slide-up">
                            <span className="text-white">Master the Future of </span>
                            <span className="gradient-text">Work with AI</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
                            Accelerate your team's adoption of SharePoint, Teams, and Microsoft 365 Copilot with
                            interactive, enterprise-grade training modules.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
                            <a href="#categories" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3">
                                Explore Training
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </a>
                            <Link to="/ai-sandbox" className="btn-secondary inline-flex items-center gap-2 text-base px-8 py-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                </svg>
                                AI Sandbox
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Stats Bar ─── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
                <div className="glass-card p-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl sm:text-3xl font-bold gradient-text">{stats.categories}</div>
                        <div className="text-xs sm:text-sm text-slate-400 mt-1">Training Categories</div>
                    </div>
                    <div className="border-x" style={{ borderColor: 'var(--glass-border)' }}>
                        <div className="text-2xl sm:text-3xl font-bold gradient-text">{stats.modules}</div>
                        <div className="text-xs sm:text-sm text-slate-400 mt-1">Learning Modules</div>
                    </div>
                    <div>
                        <div className="text-2xl sm:text-3xl font-bold gradient-text">{stats.learners}</div>
                        <div className="text-xs sm:text-sm text-slate-400 mt-1">Active Learners</div>
                    </div>
                </div>
            </section>

            {/* ─── Bento Grid Categories ─── */}
            <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="mb-10">
                    <h2 className="section-heading text-white">Training Categories</h2>
                    <p className="section-subheading">Choose a category to start your learning journey</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="glass-card p-6 animate-pulse">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 mb-4" />
                                <div className="h-5 bg-slate-800 rounded w-2/3 mb-2" />
                                <div className="h-4 bg-slate-800 rounded w-full mb-1" />
                                <div className="h-4 bg-slate-800 rounded w-4/5" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <CategoryCard key={category.id} category={category} index={index} />
                        ))}
                    </div>
                )}
            </section>

            {/* ─── AI Spotlight Banner ─── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="glass-card p-8 sm:p-12 relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 opacity-10 blur-3xl rounded-full"
                        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <span className="badge mb-4 inline-flex" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', borderColor: 'rgba(139, 92, 246, 0.15)' }}>
                                ✦ Featured
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                The AI Sandbox
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Dive into interactive prompt engineering exercises. Master Microsoft 365 Copilot
                                with hands-on labs designed for real enterprise scenarios.
                            </p>
                            <Link to="/ai-sandbox" className="btn-primary inline-flex items-center gap-2">
                                Launch AI Sandbox
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(52, 120, 255, 0.1))' }}>
                            <svg className="w-16 h-16 sm:w-20 sm:h-20 text-violet-400 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
