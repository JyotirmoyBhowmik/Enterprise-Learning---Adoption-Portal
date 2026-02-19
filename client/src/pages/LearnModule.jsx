/**
 * MODULE: Learn Module (Rich Content Viewer)
 * SYSTEM: Lumina Learning
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import ReactMarkdown from 'react-markdown';

export default function LearnModule() {
    const { id } = useParams();
    const [moduleData, setModuleData] = useState(null);
    const [contentItems, setContentItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [id]);

    async function loadData() {
        setLoading(true);
        try {
            const [mod, items] = await Promise.all([
                api.getModule(id),
                api.getContentItems(id),
            ]);
            setModuleData(mod);
            setContentItems(items);
        } catch (err) {
            console.error('Failed to load content:', err);
        } finally {
            setLoading(false);
        }
    }

    // --- Content Block Renderers ---
    const renderTextBlock = (item) => (
        <div className="prose prose-slate max-w-none prose-a:text-lumina-600 prose-img:rounded-xl">
            <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>
    );

    const renderVideoBlock = (item) => (
        <div className="rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center relative group shadow-md border border-surface-border my-6">
            {/* Fake video player for offline simulation */}
            {item.media_url ? (
                <video src={item.media_url} controls className="w-full h-full object-cover" />
            ) : (
                <div className="text-center p-8">
                    <svg className="w-16 h-16 text-white/50 mx-auto mb-4 group-hover:text-white transition-colors cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-white/70 font-medium">Video Content: {item.title}</p>
                    <p className="text-white/40 text-sm mt-2 font-mono">{item.media_url || 'enterprise-video-stream.mp4'}</p>
                </div>
            )}
        </div>
    );

    const renderPhotoBlock = (item) => (
        <div className="my-6">
            <img
                src={item.media_url || `https://source.unsplash.com/random/800x400?enterprise,learning&sig=${item.id}`}
                alt={item.title}
                className="rounded-xl w-full object-cover shadow-sm border border-surface-border bg-gray-100 min-h-[300px]"
            />
            {item.content && <p className="text-sm text-center text-text-muted mt-2 italic">{item.content}</p>}
        </div>
    );

    const renderDocumentBlock = (item) => (
        <div className="my-6 white-card p-6 flex flex-col md:flex-row items-center gap-6 border-l-4 border-l-blue-500">
            <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-lg text-text mb-1">{item.title}</h3>
                <p className="text-sm text-text-muted mb-3">{item.content || 'Embedded Document (.pdf, .docx, .xlsx)'}</p>
                <button className="btn-secondary text-sm py-1.5 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download / View Full Screen
                </button>
            </div>
        </div>
    );

    const renderQuizBlock = (item) => {
        let quizData = { question: "Knowledge Check", options: ["Option A", "Option B"] };
        try { if (item.content) quizData = JSON.parse(item.content); } catch (e) { }

        return (
            <div className="my-8 white-card p-8 border-t-4 border-t-lumina-500 bg-lumina-50/30">
                <div className="flex items-center gap-2 mb-6">
                    <span className="badge !bg-lumina-100 !text-lumina-700 !border-lumina-200">Knowledge Check</span>
                    <h3 className="font-bold text-lg text-text flex-1">{item.title}</h3>
                </div>
                <p className="text-text font-medium text-lg mb-6">{quizData.question}</p>
                <div className="space-y-3">
                    {quizData.options.map((opt, i) => (
                        <label key={i} className="flex items-center gap-4 p-4 rounded-lg border border-surface-border bg-white hover:border-lumina-500 hover:bg-lumina-50 transition-colors cursor-pointer group">
                            <input type="radio" name={`quiz-${item.id}`} className="w-5 h-5 text-lumina-600 border-gray-300 focus:ring-lumina-500" />
                            <span className="text-text group-hover:text-lumina-700 font-medium">{opt}</span>
                        </label>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                    <button className="btn-primary">Submit Answer</button>
                </div>
            </div>
        );
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Loading module content...</div>;
    if (!moduleData) return <div className="p-8 text-center text-red-500">Module not found.</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">

            {/* Heavy Header */}
            <div className="bg-text text-white p-8 md:p-12 mb-8 relative overflow-hidden">
                {/* Decorative pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-lumina-500 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 font-medium">
                        <Link to={`/category/${moduleData.categoryId}`} className="hover:text-white transition-colors">Category</Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link to={`/module/${moduleData.id}`} className="hover:text-white transition-colors">{moduleData.title}</Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-lumina-300">Learning Mode</span>
                    </nav>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{moduleData.title}</h1>
                    <p className="text-lg text-gray-300 max-w-2xl">{moduleData.description}</p>
                </div>
            </div>

            <div className="px-6 md:px-12">
                {contentItems.length === 0 ? (
                    <div className="text-center py-12 white-card">
                        <p className="text-text-muted mb-4">No content has been authored for this module yet.</p>
                        <Link to={`/module/${moduleData.id}`} className="btn-secondary">Go Back</Link>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {contentItems.map((item, index) => (
                            <div key={item.id} className="content-block relative">

                                {/* Visual Connector / Numbering (Optional subtle touch) */}
                                <div className="hidden lg:flex absolute -left-16 top-0 bottom-0 w-10 flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-surface-muted border border-surface-border text-text-muted flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-sm">
                                        {index + 1}
                                    </div>
                                    {index < contentItems.length - 1 && <div className="w-px h-full bg-surface-border my-2"></div>}
                                </div>

                                {/* Render block based on type */}
                                {item.type === 'text' && renderTextBlock(item)}
                                {item.type === 'video' && renderVideoBlock(item)}
                                {item.type === 'photo' && renderPhotoBlock(item)}
                                {item.type === 'document' && renderDocumentBlock(item)}
                                {item.type === 'quiz' && renderQuizBlock(item)}
                            </div>
                        ))}

                        {/* Completion Footer */}
                        <div className="mt-16 pt-8 border-t border-surface-border flex items-center justify-between">
                            <div>
                                <h4 className="text-lg font-bold text-text mb-1">Module Completed!</h4>
                                <p className="text-sm text-text-muted">You've reached the end of this learning path.</p>
                            </div>
                            <button className="btn-primary">
                                Mark as Checked
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
