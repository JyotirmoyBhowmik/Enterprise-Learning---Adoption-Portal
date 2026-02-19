/**
 * ============================================================================
 * MODULE: Progress Ring Component (SVG)
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * ============================================================================
 */

export default function ProgressRing({ progress = 0, size = 80, strokeWidth = 6 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="-rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.1)"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                />
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3478ff" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
            </svg>
            <span className="absolute text-sm font-bold text-white">
                {Math.round(progress)}%
            </span>
        </div>
    );
}
