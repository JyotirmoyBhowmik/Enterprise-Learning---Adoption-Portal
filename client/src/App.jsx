/**
 * ============================================================================
 * MODULE: Root Application Component
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 * ============================================================================
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryDetail from './pages/CategoryDetail';
import ModuleDetail from './pages/ModuleDetail';
import AISandbox from './pages/AISandbox';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute'; // Assuming this component exists for protected routes
import LearnModule from './pages/LearnModule'; // New rich content viewer
import AdminDashboard from './pages/admin/AdminDashboard'; // Admin CMS

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="flex h-screen bg-surface-muted overflow-hidden">
                    {/* Left Navigation */}
                    <Sidebar />

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                        {/* Top Bar Navigation */}
                        <Navbar />

                        {/* Scrollable Page Content */}
                        <main className="flex-1 overflow-y-auto">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/category/:id" element={<CategoryDetail />} />
                                <Route path="/module/:id" element={<ModuleDetail />} />

                                {/* Protected Routes */}
                                <Route path="/module/:id/learn" element={
                                    <ProtectedRoute><LearnModule /></ProtectedRoute>
                                } />
                                <Route path="/ai-sandbox" element={
                                    <ProtectedRoute><AISandbox /></ProtectedRoute>
                                } />
                                <Route path="/profile" element={
                                    <ProtectedRoute><Profile /></ProtectedRoute>
                                } />

                                {/* Admin Routes (Role Guarded) */}
                                <Route path="/admin/*" element={
                                    <ProtectedRoute requiredRole="admin">
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                } />

                                {/* Auth */}
                                <Route path="/login" element={<Login />} />
                            </Routes>

                            <Footer />
                        </main>
                    </div>
                </div>
            </AuthProvider>
        </Router>
    );
}
