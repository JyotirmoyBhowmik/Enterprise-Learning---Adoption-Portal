/**
 * MODULE: Category Detail Page
 * SYSTEM: Lumina Learning
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
            <div className="p-6 max-w-7xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-8" />
                    <div className="h-8 bg-gray-200 rounded w-64 mb-3" />
                    <div className="h-5 bg-gray-200 rounded w-96 mb-10" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="white-card p-6 h-48 bg-gray-50/50" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="p-6 max-w-7xl mx-auto text-center py-20">
                <h2 className="text-2xl font-bold text-text mb-2">Category not found</h2>
                <Link to="/" className="text-lumina-600 hover:underline">← Back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-text-muted mb-8 font-medium">
                <Link to="/" className="hover:text-text transition-colors">Dashboard</Link>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <span className="text-text">{category.name}</span>
            </nav>

            {/* Header */}
            <div className="mb-10 white-card p-8 bg-gradient-to-br from-lumina-50 to-white border-l-4 border-l-lumina-500 rounded-lg">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm"
                        style={{ color: category.color || '#14b8a6' }}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-text mb-2">{category.name}</h1>
                        <p className="text-text-muted max-w-2xl">{category.description}</p>
                    </div>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="section-heading !mb-0">Training Modules</h2>
                <span className="badge">{modules.length} modules</span>
            </div>

            {modules.length === 0 ? (
                <div className="white-card p-12 text-center bg-gray-50/50">
                    <p className="text-text-muted">Content is currently being prepared for this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((mod, index) => (
                        <ModuleCard key={mod.id} module={mod} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}
