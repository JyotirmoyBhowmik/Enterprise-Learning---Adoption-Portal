/**
 * ============================================================================
 * MODULE: Express Server Entry Point
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE FOR FUTURE DEVELOPERS:
 * - This platform is strictly database-driven.
 * - All content is served via the REST API from the repository layer.
 * - The Repository Pattern abstracts the database. To switch from Firebase
 *   to PostgreSQL, only the repository connector needs to change.
 * ============================================================================
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const categoryRoutes = require('./routes/categories');
const moduleRoutes = require('./routes/modules');
const lessonRoutes = require('./routes/lessons');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// Middleware Stack
// ---------------------------------------------------------------------------
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// ---------------------------------------------------------------------------
// API Routes
// ---------------------------------------------------------------------------
app.use('/api/categories', categoryRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Lumina Learning Suite API', version: '1.0.0' });
});

// Global error handler
app.use((err, _req, res, _next) => {
    console.error('[Lumina API Error]', err.stack);
    res.status(err.status || 500).json({
        error: {
            message: process.env.NODE_ENV === 'production'
                ? 'Internal server error'
                : err.message,
        },
    });
});

app.listen(PORT, async () => {
    console.log(`\n✦  Lumina Learning Suite API running on http://localhost:${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);

    // Auto-seed demo data when running in-memory (no Firebase)
    const { db } = require('./config/firebase');
    if (!db) {
        const { createRepository } = require('./repositories/repositoryFactory');
        const catRepo = createRepository('categories');
        const existing = await catRepo.getAll();
        if (existing.length === 0) {
            console.log('   Auto-seeding demo data...');
            const { seed } = require('./seed');
            await seed();
        }
    }
    console.log('');
});
