/**
 * ============================================================================
 * MODULE: AI Sandbox — Interactive Copilot Prompt Engineering Lab
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - The AI Sandbox is a dedicated interactive module for GenAI training.
 * - Prompt templates and exercises are stored in the database.
 * - This is a client-side simulation — actual Copilot integration requires
 *   the enterprise Microsoft 365 Copilot license in production.
 * ============================================================================
 */
import { useState } from 'react';

const promptTemplates = [
    {
        id: 1,
        app: 'Word',
        title: 'Draft a Policy Document',
        prompt: 'Draft a comprehensive Work From Home Policy for our organization. Include eligibility criteria, equipment requirements, communication expectations, and security requirements. Tone: Professional but approachable.',
        category: 'Content Creation',
    },
    {
        id: 2,
        app: 'Excel',
        title: 'Analyze Sales Data',
        prompt: 'Analyze this sales data and: 1) Create a pivot table showing sales by region and quarter, 2) Highlight the top 3 performing products, 3) Add a forecast for the next quarter, 4) Create a chart visualizing the trend.',
        category: 'Data Analysis',
    },
    {
        id: 3,
        app: 'Teams',
        title: 'Meeting Summary',
        prompt: 'From today\'s project status meeting: List all action items with owners and deadlines, summarize the three main discussion topics, flag any decisions that need follow-up approval, and draft a follow-up email to the team.',
        category: 'Collaboration',
    },
    {
        id: 4,
        app: 'PowerPoint',
        title: 'Create Presentation',
        prompt: 'Create a 10-slide executive presentation on our digital transformation roadmap. Include: current state assessment, proposed initiatives, timeline, budget overview, and expected ROI. Design: Modern, professional with our brand colors.',
        category: 'Content Creation',
    },
    {
        id: 5,
        app: 'Outlook',
        title: 'Professional Email',
        prompt: 'Draft a professional email to our client informing them about the project timeline extension. Be empathetic, explain the reasons clearly, propose new milestones, and end with a positive outlook. Keep it under 200 words.',
        category: 'Communication',
    },
    {
        id: 6,
        app: 'Word',
        title: 'Technical Documentation',
        prompt: 'Create a user guide for setting up Multi-Factor Authentication on mobile devices. Our users range from tech-savvy to beginners. We use Microsoft Authenticator. Include step-by-step instructions with troubleshooting tips.',
        category: 'Documentation',
    },
];

const appColors = {
    'Word': { bg: 'rgba(0, 120, 212, 0.1)', text: '#4da6ff', border: 'rgba(0, 120, 212, 0.2)' },
    'Excel': { bg: 'rgba(34, 197, 94, 0.1)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.2)' },
    'Teams': { bg: 'rgba(98, 100, 167, 0.1)', text: '#a5a7e2', border: 'rgba(98, 100, 167, 0.2)' },
    'PowerPoint': { bg: 'rgba(216, 59, 1, 0.1)', text: '#ff7c4d', border: 'rgba(216, 59, 1, 0.2)' },
    'Outlook': { bg: 'rgba(0, 114, 198, 0.1)', text: '#47b2ff', border: 'rgba(0, 114, 198, 0.2)' },
};

export default function AISandbox() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [userPrompt, setUserPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', ...new Set(promptTemplates.map(t => t.category))];

    const filtered = activeFilter === 'All'
        ? promptTemplates
        : promptTemplates.filter(t => t.category === activeFilter);

    function selectTemplate(template) {
        setSelectedTemplate(template);
        setUserPrompt(template.prompt);
        setResponse('');
    }

    function simulateResponse() {
        setIsGenerating(true);
        setResponse('');

        // Simulated AI response for demo
        const simulatedResponse = `## AI Response Preview\n\nThis is a **simulated response** demonstrating how Microsoft 365 Copilot would process your prompt.\n\n### What Copilot would do:\n\n1. **Analyze** your prompt for intent and context\n2. **Access** relevant organizational data within your M365 tenant\n3. **Generate** content following your specifications\n4. **Present** results directly within the ${selectedTemplate?.app || 'M365'} application\n\n### Key Prompt Analysis:\n- **Clarity Score**: Excellent ✓\n- **Specificity**: Well-defined requirements ✓\n- **Context Provided**: Sufficient for accurate results ✓\n\n> 💡 **Tip**: In production, this would connect to your organization's Microsoft 365 Copilot instance for real AI-powered responses.\n\n---\n*Lumina AI Sandbox — Practice prompt engineering in a safe environment.*`;

        let index = 0;
        const interval = setInterval(() => {
            if (index < simulatedResponse.length) {
                setResponse(simulatedResponse.slice(0, index + 3));
                index += 3;
            } else {
                clearInterval(interval);
                setIsGenerating(false);
            }
        }, 10);
    }

    return (
        <div className="bg-mesh min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4"
                        style={{
                            background: 'rgba(139, 92, 246, 0.08)',
                            border: '1px solid rgba(139, 92, 246, 0.15)',
                            color: '#a78bfa',
                        }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                        Interactive Learning Lab
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        AI Sandbox
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Practice crafting effective prompts for Microsoft 365 Copilot. Select a template,
                        customize it, and see how AI would process your instructions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Template Selection */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Prompt Templates</h2>
                        </div>

                        {/* Category filter */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${activeFilter === cat
                                            ? 'bg-lumina-600 text-white'
                                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                            {filtered.map((template) => {
                                const colors = appColors[template.app] || appColors['Word'];
                                return (
                                    <button
                                        key={template.id}
                                        onClick={() => selectTemplate(template)}
                                        className={`glass-card p-4 w-full text-left transition-all duration-200 ${selectedTemplate?.id === template.id
                                                ? 'ring-1 ring-lumina-500/50'
                                                : ''
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                                                style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                                                {template.app}
                                            </span>
                                            <span className="text-xs text-slate-500">{template.category}</span>
                                        </div>
                                        <h3 className="text-sm font-semibold text-white mb-1">{template.title}</h3>
                                        <p className="text-xs text-slate-400 line-clamp-2">{template.prompt}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Prompt Editor & Response */}
                    <div className="space-y-6">
                        {/* Prompt Editor */}
                        <div className="glass-card p-6">
                            <h2 className="text-lg font-semibold text-white mb-3">Your Prompt</h2>
                            <textarea
                                value={userPrompt}
                                onChange={(e) => setUserPrompt(e.target.value)}
                                placeholder="Select a template or write your own prompt..."
                                className="w-full h-40 bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:ring-1 focus:ring-lumina-500/50 focus:border-lumina-500/50 transition-all"
                            />
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-xs text-slate-500">{userPrompt.length} characters</span>
                                <button
                                    onClick={simulateResponse}
                                    disabled={!userPrompt.trim() || isGenerating}
                                    className="btn-primary text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isGenerating ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                            Run Prompt
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Response Display */}
                        <div className="glass-card p-6">
                            <h2 className="text-lg font-semibold text-white mb-3">AI Response</h2>
                            {response ? (
                                <div className="prose-sm text-slate-300 leading-relaxed whitespace-pre-wrap text-sm"
                                    style={{ minHeight: '200px' }}>
                                    {response.split('\n').map((line, i) => {
                                        if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-white mt-4 mb-2">{line.slice(3)}</h2>;
                                        if (line.startsWith('### ')) return <h3 key={i} className="text-base font-semibold text-white mt-3 mb-1">{line.slice(4)}</h3>;
                                        if (line.startsWith('> ')) return <blockquote key={i} className="pl-3 border-l-2 border-lumina-500 text-slate-300 italic my-2">{line.slice(2)}</blockquote>;
                                        if (line.startsWith('- ')) return <li key={i} className="ml-4 text-slate-300 list-disc list-inside">{line.slice(2).replace(/\*\*(.+?)\*\*/g, '$1')}</li>;
                                        if (line.startsWith('---')) return <hr key={i} className="border-slate-700 my-4" />;
                                        if (line.match(/^\d+\./)) return <li key={i} className="ml-4 text-slate-300 list-decimal list-inside">{line.slice(line.indexOf('.') + 2).replace(/\*\*(.+?)\*\*/g, '$1')}</li>;
                                        return <p key={i} className="mb-1">{line.replace(/\*\*(.+?)\*\*/g, '$1')}</p>;
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                                    <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                    </svg>
                                    <p className="text-sm">Select a template and click "Run Prompt" to see the AI response.</p>
                                </div>
                            )}
                        </div>

                        {/* Tips Card */}
                        <div className="glass-card p-5" style={{ background: 'rgba(139, 92, 246, 0.03)', borderColor: 'rgba(139, 92, 246, 0.1)' }}>
                            <h3 className="text-sm font-semibold text-violet-300 mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Prompt Engineering Tips
                            </h3>
                            <ul className="text-xs text-slate-400 space-y-1">
                                <li>• Use the <span className="text-violet-300 font-medium">RICE framework</span>: Role, Instructions, Context, Examples</li>
                                <li>• Be specific about the <span className="text-violet-300 font-medium">format</span> and <span className="text-violet-300 font-medium">tone</span> you want</li>
                                <li>• Iterate on prompts — refine based on initial output</li>
                                <li>• Always review AI-generated content before sharing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
