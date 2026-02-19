/**
 * ============================================================================
 * MODULE: Module Card Component
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * ============================================================================
 */
import { Link } from 'react-router-dom';

const difficultyColors = {
    'Beginner': { bg: 'rgba(34, 197, 94, 0.1)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.15)' },
    'Intermediate': { bg: 'rgba(245, 158, 11, 0.1)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.15)' },
    'Advanced': { bg: 'rgba(239, 68, 68, 0.1)', text: '#f87171', border: 'rgba(239, 68, 68, 0.15)' },
};

export default function ModuleCard({ module, index }) {
    const colors = difficultyColors[module.difficulty] || difficultyColors['Beginner'];

    return (
        <Link
            to={`/module/${module.id}`}
            className="glass-card group p-6 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div className="flex items-start justify-between mb-3">
                <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                >
                    {module.difficulty}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {module.duration}
                </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-lumina-400 transition-colors">
                {module.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {module.description}
            </p>

            <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                    {module.lessonCount || 0} lessons
                </span>
                <span className="text-sm font-medium text-lumina-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    Start
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </span>
            </div>
        </Link>
    );
}
