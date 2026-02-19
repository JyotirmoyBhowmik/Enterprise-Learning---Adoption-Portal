/**
 * MODULE: Admin / Content Studio Dashboard
 * SYSTEM: Lumina Learning
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('workflow');

    // If a non-admin tries to hit this directly (guarded by ProtectedRoute too, but double check)
    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    const [drafts, setDrafts] = useState([
        { id: '1', title: 'Q3 Compliance Updates', type: 'document', status: 'draft', author: 'Sarah J.' },
        { id: '2', title: 'Intro to pgvector in Node', type: 'video', status: 'review', author: 'Mark T.' },
        { id: '3', title: 'Phishing Awareness Quiz', type: 'quiz', status: 'review', author: 'Sarah J.' }
    ]);

    const handleApprove = (id) => {
        setDrafts(prev => prev.map(d => d.id === id ? { ...d, status: 'published' } : d));
    };

    const handleReject = (id) => {
        setDrafts(prev => prev.map(d => d.id === id ? { ...d, status: 'draft' } : d));
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text mb-2">Content Studio</h1>
                    <p className="text-text-muted">Manage modules, rich media, and approve workflow drafts.</p>
                </div>
                <button className="btn-primary shrink-0 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Create New Content
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-surface-border mb-8 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('workflow')}
                    className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'workflow' ? 'border-lumina-500 text-lumina-600' : 'border-transparent text-text-muted hover:text-text'}`}
                >
                    Approval Workflow
                </button>
                <button
                    onClick={() => setActiveTab('content')}
                    className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'content' ? 'border-lumina-500 text-lumina-600' : 'border-transparent text-text-muted hover:text-text'}`}
                >
                    All Content Inventory
                </button>
                <button
                    onClick={() => setActiveTab('categories')}
                    className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'categories' ? 'border-lumina-500 text-lumina-600' : 'border-transparent text-text-muted hover:text-text'}`}
                >
                    Category Tree Builder
                </button>
            </div>

            {activeTab === 'workflow' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-text">Pending Reviews</h2>
                        <span className="badge">{drafts.filter(d => d.status === 'review').length} action items</span>
                    </div>

                    <div className="bg-white border border-surface-border rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-muted text-text-muted text-xs uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Content Title</th>
                                    <th className="p-4 font-semibold">Type</th>
                                    <th className="p-4 font-semibold">Author</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-border">
                                {drafts.filter(d => d.status !== 'published').map(draft => (
                                    <tr key={draft.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-text">{draft.title}</td>
                                        <td className="p-4 text-text-muted capitalize">
                                            <span className="flex items-center gap-1.5">
                                                <div className={`w-2 h-2 rounded-full ${draft.type === 'video' ? 'bg-purple-500' : draft.type === 'quiz' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                                                {draft.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-text-muted">{draft.author}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${draft.status === 'review' ? 'bg-amber-100 text-amber-800 border items-center border-amber-200' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {draft.status === 'review' ? 'Pending Review' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="text-xs font-medium text-lumina-600 bg-lumina-50 hover:bg-lumina-100 px-3 py-1.5 rounded transition-colors">
                                                    Preview
                                                </button>
                                                {draft.status === 'review' && (
                                                    <>
                                                        <button onClick={() => handleApprove(draft.id)} className="text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded transition-colors">
                                                            Approve
                                                        </button>
                                                        <button onClick={() => handleReject(draft.id)} className="text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors">
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {drafts.filter(d => d.status !== 'published').length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-text-muted">
                                            No drafts pending review. Clean inbox!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab !== 'workflow' && (
                <div className="white-card p-12 text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-lg font-bold text-text mb-2">Under Construction</h3>
                    <p className="text-text-muted">The {activeTab} view is being wired up to the PostgreSQL backend.</p>
                </div>
            )}
        </div>
    );
}
