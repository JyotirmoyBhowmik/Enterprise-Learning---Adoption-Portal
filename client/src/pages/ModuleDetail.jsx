/**
 * ============================================================================
 * MODULE: Module Detail Page
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * ============================================================================
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';

const difficultyColors = {
    'Beginner': { bg: 'rgba(34, 197, 94, 0.1)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.15)' },
    'Intermediate': { bg: 'rgba(245, 158, 11, 0.1)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.15)' },
    'Advanced': { bg: 'rgba(239, 68, 68, 0.1)', text: '#f87171', border: 'rgba(239, 68, 68, 0.15)' },
};

export default function ModuleDetail() {
    const { id } = useParams();
    const [module, setModule] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [id]);

    async function loadData() {
        setLoading(true);
        try {
            const [mod, les] = await Promise.all([
                api.getModule(id),
                api.getLessons(id),
            ]);
            setModule(mod);
            setLessons(les);
        } catch (err) {
            console.error('Failed to load module:', err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="animate-pulse">
                    <div className="h-4 bg-slate-800 rounded w-32 mb-8" />
                    <div className="h-8 bg-slate-800 rounded w-64 mb-3" />
                    <div className="h-5 bg-slate-800 rounded w-96 mb-10" />
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="glass-card p-5 mb-3">
                            <div className="h-5 bg-slate-800 rounded w-3/4" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!module) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Module not found</h2>
                <Link to="/" className="text-lumina-400 hover:underline">← Back to Home</Link>
            </div>
        );
    }

    const colors = difficultyColors[module.difficulty] || difficultyColors['Beginner'];

    return (
        <div className="bg-mesh min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link to={`/category/${module.categoryId}`} className="hover:text-white transition-colors">Category</Link>
                    <span>/</span>
                    <span className="text-white">{module.title}</span>
                </nav>

                {/* Module Header */}
                <div className="glass-card p-8 mb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                            style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                            {module.difficulty}
                        </span>
                        <span className="text-sm text-slate-400 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {module.duration}
                        </span>
                        <span className="text-sm text-slate-400">•</span>
                        <span className="text-sm text-slate-400">{lessons.length} lessons</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">{module.title}</h1>
                    <p className="text-slate-400 leading-relaxed">{module.description}</p>
                </div>

                {/* Lessons List */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-1">Lessons</h2>
                    <p className="text-sm text-slate-400">Complete all lessons to earn your certificate</p>
                </div>

                <div className="space-y-3">
                    {lessons.map((lesson, index) => (
                        <Link
                            key={lesson.id}
                            to={`/lesson/${lesson.id}`}
                            className="glass-card p-5 flex items-center gap-4 group cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            {/* Lesson number */}
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-300 group-hover:scale-110"
                                style={{
                                    background: 'rgba(52, 120, 255, 0.08)',
                                    color: '#599eff',
                                    border: '1px solid rgba(52, 120, 255, 0.1)',
                                }}>
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            {/* Title */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-medium group-hover:text-lumina-400 transition-colors truncate">
                                    {lesson.title}
                                </h3>
                            </div>

                            {/* Arrow */}
                            <svg className="w-5 h-5 text-slate-500 group-hover:text-lumina-400 group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ))}
                </div>

                {lessons.length === 0 && (
                    <div className="glass-card p-12 text-center">
                        <p className="text-slate-400">No lessons available yet for this module.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
