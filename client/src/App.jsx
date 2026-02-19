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
import LessonPage from './pages/LessonPage';
import AISandbox from './pages/AISandbox';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen bg-surface-950">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/category/:id" element={<CategoryDetail />} />
                            <Route path="/module/:id" element={<ModuleDetail />} />
                            <Route path="/lesson/:id" element={<LessonPage />} />
                            <Route path="/ai-sandbox" element={<AISandbox />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}
