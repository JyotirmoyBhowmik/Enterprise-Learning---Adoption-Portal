/**
 * ============================================================================
 * MODULE: Footer Component
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 *
 * NOTE: The attribution text is a permanent, required element per SoW §4.1.
 * ============================================================================
 */
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="border-t mt-auto" style={{ borderColor: 'var(--glass-border)', background: 'rgba(2, 6, 23, 0.9)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                                style={{ background: 'linear-gradient(135deg, #3478ff, #8b5cf6)' }}>
                                L
                            </div>
                            <span className="font-bold text-white">Lumina Learning Suite</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Enterprise-grade training portal driving adoption of modern workplace tools and AI technologies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/ai-sandbox" className="text-sm text-slate-400 hover:text-white transition-colors">AI Sandbox</Link></li>
                            <li><Link to="/profile" className="text-sm text-slate-400 hover:text-white transition-colors">My Progress</Link></li>
                        </ul>
                    </div>

                    {/* Training Categories */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Training</h4>
                        <ul className="space-y-2">
                            <li><Link to="/category/cat-sharepoint" className="text-sm text-slate-400 hover:text-white transition-colors">SharePoint</Link></li>
                            <li><Link to="/category/cat-teams" className="text-sm text-slate-400 hover:text-white transition-colors">Microsoft Teams</Link></li>
                            <li><Link to="/category/cat-genai" className="text-sm text-slate-400 hover:text-white transition-colors">GenAI & Copilot</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Attribution Line — Required per SoW §4.1 */}
                <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
                    style={{ borderColor: 'var(--glass-border)' }}>
                    <p className="text-xs text-slate-500">
                        Lumina Learning Suite v1.0 | Architected and Developed by Jyotirmoy Bhowmik
                    </p>
                    <p className="text-xs text-slate-600">
                        © {new Date().getFullYear()} Surya Nepal Pvt. Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
