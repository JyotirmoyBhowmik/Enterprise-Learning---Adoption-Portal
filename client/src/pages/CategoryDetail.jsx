/**
 * ============================================================================
 * MODULE: Category Detail Page
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * ============================================================================
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import ModuleCard from '../components/ModuleCard';

export default function CategoryDetail() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [id]);

    async function loadData() {
        setLoading(true);
        try {
            const [cat, mods] = await Promise.all([
                api.getCategory(id),
                api.getModules(id),
            ]);
            setCategory(cat);
            setModules(mods);
        } catch (err) {
            console.error('Failed to load category:', err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="animate-pulse">
                    <div className="h-4 bg-slate-800 rounded w-24 mb-8" />
                    <div className="h-8 bg-slate-800 rounded w-64 mb-3" />
                    <div className="h-5 bg-slate-800 rounded w-96 mb-10" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="glass-card p-6">
                                <div className="h-6 bg-slate-800 rounded w-20 mb-4" />
                                <div className="h-5 bg-slate-800 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-slate-800 rounded w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Category not found</h2>
                <Link to="/" className="text-lumina-400 hover:underline">← Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-mesh min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-white">{category.name}</span>
                </nav>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: `${category.color}15`, color: category.color }}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{category.name}</h1>
                            <p className="text-slate-400">{category.description}</p>
                        </div>
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white mb-1">Training Modules</h2>
                    <p className="text-sm text-slate-400">{modules.length} modules available</p>
                </div>

                {modules.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <p className="text-slate-400">No modules available yet for this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modules.map((mod, index) => (
                            <ModuleCard key={mod.id} module={mod} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
