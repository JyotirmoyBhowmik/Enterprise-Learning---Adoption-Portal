/**
 * MODULE: Module Detail Page
 * SYSTEM: Lumina Learning
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';

const difficultyColors = {
    'Beginner': { bg: '#f0fdfa', text: '#0d9488', border: '#ccfbf1' },
    'Intermediate': { bg: '#fffbeb', text: '#d97706', border: '#fef3c7' },
    'Advanced': { bg: '#fef2f2', text: '#dc2626', border: '#fee2e2' },
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
            <div className="p-6 max-w-4xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-8" />
                    <div className="h-8 bg-gray-200 rounded w-64 mb-3" />
                    <div className="h-5 bg-gray-200 rounded w-96 mb-10" />
                </div>
            </div>
        );
    }

    if (!module) {
        return (
            <div className="p-6 max-w-4xl mx-auto text-center py-20">
                <h2 className="text-2xl font-bold text-text mb-2">Module not found</h2>
                <Link to="/" className="text-lumina-600 hover:underline">← Back to Dashboard</Link>
            </div>
        );
    }

    const colors = difficultyColors[module.difficulty] || difficultyColors['Beginner'];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-text-muted mb-8 font-medium">
                <Link to="/" className="hover:text-text transition-colors">Dashboard</Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <Link to={`/category/${module.categoryId}`} className="hover:text-text transition-colors">Category</Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <span className="text-text">{module.title}</span>
            </nav>

            {/* Module Header */}
            <div className="white-card p-8 mb-8 bg-gradient-to-br from-lumina-50 to-white">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                        {module.difficulty}
                    </span>
                    <span className="text-sm text-text-muted flex items-center gap-1 bg-surface-muted px-2 py-1 rounded-md">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {module.duration}
                    </span>
                </div>
                <h1 className="text-3xl font-bold text-text mb-3">{module.title}</h1>
                <p className="text-text-muted leading-relaxed text-lg">{module.description}</p>
            </div>

            {/* Lessons List */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="section-heading !mb-0">Learning Path</h2>
                <span className="text-sm font-medium text-text-muted">{lessons.length} sections</span>
            </div>

            <div className="space-y-3">
                {lessons.map((lesson, index) => (
                    <Link
                        key={lesson.id}
                        to={`/lesson/${lesson.id}`}
                        className="white-card p-5 flex items-center gap-4 group cursor-pointer hover:shadow-md transition-shadow"
                    >
                        {/* Number Indicator */}
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors bg-lumina-50 text-lumina-600 group-hover:bg-lumina-500 group-hover:text-white">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-text font-bold group-hover:text-lumina-600 transition-colors truncate text-lg">
                                {lesson.title}
                            </h3>
                            <p className="text-sm text-text-muted mt-1 truncate">
                                Interactive content module
                            </p>
                        </div>

                        {/* Status / Arrow */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-lumina-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                                Start
                            </span>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-lumina-600 group-hover:translate-x-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>

            {lessons.length === 0 && (
                <div className="white-card p-12 text-center bg-gray-50/50">
                    <p className="text-text-muted">Content is currently being prepared for this module.</p>
                </div>
            )}
        </div>
    );
}
