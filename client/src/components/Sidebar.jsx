import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
    const { pathname } = useLocation();
    const { user } = useAuth();

    const menuItems = [
        { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/' },
        { name: 'Training Catalog', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', path: '/catalog' },
        { name: 'AI Tutor', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z', path: '/ai-tutor' },
        { name: 'My Progress', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', path: '/profile' }
    ];

    return (
        <aside className="w-64 bg-white border-r border-surface-border flex-shrink-0 hidden md:flex flex-col h-full sticky top-0 overflow-hidden">
            <div className="p-6 border-b border-surface-border">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-lumina-500 text-white flex items-center justify-center font-bold text-xl leading-none">
                        L
                    </div>
                    <span className="text-xl font-bold text-text group-hover:text-lumina-600 transition-colors">
                        Lumina
                    </span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto sidebar-scroll py-4 px-3 flex flex-col gap-1">
                <p className="px-3 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Main Menu</p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${isActive
                                    ? 'bg-lumina-50 text-lumina-700'
                                    : 'text-text-muted hover:bg-surface-muted hover:text-text'
                                }`}
                        >
                            <svg className={`w-5 h-5 ${isActive ? 'text-lumina-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2 : 1.5} d={item.icon} />
                            </svg>
                            {item.name}
                        </Link>
                    );
                })}

                {user?.role === 'admin' && (
                    <>
                        <div className="mt-8 mb-2 px-3">
                            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Administration</p>
                        </div>
                        <Link
                            to="/admin"
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${pathname.startsWith('/admin')
                                    ? 'bg-gray-100 text-gray-900 border border-gray-200'
                                    : 'text-text-muted hover:bg-surface-muted hover:text-text'
                                }`}
                        >
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Admin CMS
                        </Link>
                    </>
                )}
            </div>

            <div className="p-4 border-t border-surface-border">
                <div className="bg-surface-muted rounded-lg p-3 relative overflow-hidden text-center">
                    {/* Soft background shape */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-lumina-100 rounded-bl-full opacity-50"></div>
                    <p className="text-xs font-semibold text-text z-10 relative">Enterprise Adoption</p>
                    <p className="text-[10px] text-text-muted mt-0.5 z-10 relative">Lumina Learning Suite v2.0</p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
