/**
 * ============================================================================
 * MODULE: Lesson Viewer Page
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * ============================================================================
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Simple markdown renderer (basic formatting)
function renderMarkdown(md) {
    if (!md) return '';
    return md
        .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-white mt-6 mb-2">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-3">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^- (.+)$/gm, '<li class="ml-4 text-slate-300 mb-1 list-disc list-inside">$1</li>')
        .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-slate-300 mb-1 list-decimal list-inside">$1</li>')
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-lumina-400 text-sm font-mono">$1</code>')
        .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 overflow-x-auto my-4"><code class="text-sm text-slate-300 font-mono">$2</code></pre>')
        .replace(/^> (.+)$/gm, '<blockquote class="pl-4 border-l-2 border-lumina-500 text-slate-300 italic my-3">$1</blockquote>')
        .replace(/🚩/g, '<span class="text-red-400">🚩</span>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');
}

export default function LessonPage() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [completing, setCompleting] = useState(false);

    useEffect(() => {
        loadData();
    }, [id]);

    async function loadData() {
        setLoading(true);
        try {
            const les = await api.getLesson(id);
            setLesson(les);
        } catch (err) {
            console.error('Failed to load lesson:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleComplete() {
        if (!isAuthenticated) return;
        setCompleting(true);
        try {
            await api.markComplete(lesson.id, lesson.moduleId);
            setCompleted(true);
        } catch (err) {
            console.error('Failed to mark complete:', err);
        } finally {
            setCompleting(false);
        }
    }

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
                <div className="h-4 bg-slate-800 rounded w-48 mb-8" />
                <div className="h-8 bg-slate-800 rounded w-96 mb-6" />
                <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-4 bg-slate-800 rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
                    ))}
                </div>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Lesson not found</h2>
                <Link to="/" className="text-lumina-400 hover:underline">← Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-mesh min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    {lesson.moduleId && (
                        <>
                            <Link to={`/module/${lesson.moduleId}`} className="hover:text-white transition-colors">Module</Link>
                            <span>/</span>
                        </>
                    )}
                    <span className="text-white truncate">{lesson.title}</span>
                </nav>

                {/* Lesson Content Card */}
                <article className="glass-card p-8 sm:p-10 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">{lesson.title}</h1>

                    {/* Rendered markdown content */}
                    <div
                        className="text-slate-300 leading-relaxed prose-lumina"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }}
                    />
                </article>

                {/* Completion Bar */}
                <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-white font-semibold mb-1">
                            {completed ? '🎉 Lesson Completed!' : 'Ready to continue?'}
                        </h3>
                        <p className="text-sm text-slate-400">
                            {completed
                                ? 'Great job! Your progress has been saved.'
                                : isAuthenticated
                                    ? 'Mark this lesson as complete to track your progress.'
                                    : 'Sign in to track your progress.'}
                        </p>
                    </div>

                    {isAuthenticated ? (
                        <button
                            onClick={handleComplete}
                            disabled={completed || completing}
                            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shrink-0 ${completed
                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default'
                                    : 'btn-primary'
                                }`}
                        >
                            {completing ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </span>
                            ) : completed ? (
                                '✓ Completed'
                            ) : (
                                'Mark Complete'
                            )}
                        </button>
                    ) : (
                        <Link to="/login" className="btn-primary text-sm">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
