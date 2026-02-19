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
            className="white-card p-6 block hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                    {module.difficulty}
                </span>

                <span className="text-xs text-text-muted flex items-center gap-1 bg-surface-muted px-2 py-1 rounded-md">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {module.duration || '30 min'}
                </span>
            </div>

            <h3 className="text-lg font-bold text-text mb-2 group-hover:text-lumina-600 transition-colors line-clamp-1">
                {module.title}
            </h3>

            <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-2">
                {module.description}
            </p>

            <div className="flex items-center justify-between text-sm text-text-muted">
                <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-lumina-100 flex items-center justify-center text-[10px] font-bold text-lumina-600 border border-white">L</div>
                    <div className="w-6 h-6 rounded-full bg-surface-muted flex items-center justify-center text-[10px] font-medium text-text-muted border border-white z-10">
                        {module.lessonCount || 0}
                    </div>
                </div>
                <span className="font-medium text-lumina-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    Start Learning →
                </span>
            </div>
        </Link>
    );
}
