/**
 * MODULE: Home / Dashboard Page
 * SYSTEM: Lumina Learning
 * LEAD: Jyotirmoy Bhowmik
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import { useAuth } from '../context/AuthContext';
import ProgressRing from '../components/ProgressRing';

export default function Home() {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fallbacks since we haven't connected real progress API yet
    const progress = 35;
    const completedLessons = 8;
    const totalLessons = 24;

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const cats = await api.getCategories();
            setCategories(cats);
        } catch (err) {
            console.error('Failed to load categories:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold text-text">Hello, {user?.displayName || 'Learner'} 👋</h1>
                <p className="text-text-muted mt-2">Ready to master new enterprise skills today?</p>
            </div>

            {/* Top Adoption Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Continue Learning Card */}
                <div className="md:col-span-2 white-card p-6 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-lumina-50 to-white">
                    <div className="shrink-0 relative">
                        <ProgressRing progress={progress} size={80} strokeWidth={8} color="#14b8a6" />
                    </div>
                    <div className="flex-1">
                        <span className="badge mb-2">In Progress</span>
                        <h2 className="text-xl font-bold text-text mb-1">Copilot Prompt Engineering Lab</h2>
                        <p className="text-sm text-text-muted mb-4">You are currently on Lesson 2: Crafting Effective Prompts. 15 mins remaining.</p>
                        <Link to="/ai-sandbox" className="btn-primary inline-flex items-center gap-2">
                            Resume Learning
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="white-card p-6 flex flex-col justify-center">
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Adoption Velocity</h3>
                    <div className="flex items-end gap-3 mb-2">
                        <div className="text-4xl font-extrabold text-lumina-600">{completedLessons}</div>
                        <div className="text-sm text-text-muted mb-1">/ {totalLessons} lessons</div>
                    </div>
                    <p className="text-sm text-text-muted">You are in the top 15% of enterprise learners this week. Keep it up!</p>
                </div>
            </div>

            {/* AI Tutor Callout */}
            <div className="bg-text text-white rounded-2xl p-8 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lumina-500 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-lumina-300 mb-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-sm font-bold uppercase tracking-wider">New Feature</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Meet your Offline AI Tutor</h2>
                        <p className="text-gray-300 max-w-xl text-sm leading-relaxed">
                            Stuck on a concept? Our local enterprise LLM has read all the training material. Ask it anything about SharePoint, Teams, or compliance procedures — securely and completely offline.
                        </p>
                    </div>
                    <Link to="/ai-tutor" className="bg-white text-text font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap shadow-sm">
                        Chat with AI
                    </Link>
                </div>
            </div>

            {/* Categories Catalog */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="section-heading !mb-0">Explore Catalog</h2>
                    <Link to="/catalog" className="text-sm font-medium text-lumina-600 hover:text-lumina-700">View All →</Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="white-card p-6 h-48 animate-pulse bg-gray-50/50"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, idx) => (
                            <CategoryCard key={category.id} category={category} index={idx} />
                        ))}
                    </div>
                )}
            </section>

            <div className="h-8"></div> {/* Bottom spacer */}
        </div>
    );
}
