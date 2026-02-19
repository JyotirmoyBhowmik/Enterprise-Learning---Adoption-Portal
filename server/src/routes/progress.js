/**
 * ============================================================================
 * MODULE: Progress Tracking API Routes
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - Tracks user completion rates, last accessed timestamps.
 * - Progress data drives automated certification generation.
 * ============================================================================
 */
const express = require('express');
const router = express.Router();
const { createRepository } = require('../repositories/repositoryFactory');
const { authenticate } = require('../middleware/auth');

const progressRepo = createRepository('progress');

// GET /api/progress — Get current user's progress
router.get('/', authenticate, async (req, res, next) => {
    try {
        const progress = await progressRepo.getAll({ userId: req.user.id });
        res.json({ data: progress });
    } catch (err) {
        next(err);
    }
});

// POST /api/progress — Mark a lesson as complete
router.post('/', authenticate, async (req, res, next) => {
    try {
        const { lessonId, moduleId, score } = req.body;

        // Check if already completed
        const existing = await progressRepo.getAll({
            userId: req.user.id,
            lessonId,
        });

        if (existing.length > 0) {
            // Update existing progress
            const updated = await progressRepo.update(existing[0].id, {
                score: score || existing[0].score,
                lastAccessedAt: new Date().toISOString(),
            });
            return res.json({ data: updated });
        }

        // Create new progress record
        const progress = await progressRepo.create({
            userId: req.user.id,
            lessonId,
            moduleId,
            score: score || 100,
            completedAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString(),
        });

        res.status(201).json({ data: progress });
    } catch (err) {
        next(err);
    }
});

// GET /api/progress/summary — Get aggregated progress summary
router.get('/summary', authenticate, async (req, res, next) => {
    try {
        const allProgress = await progressRepo.getAll({ userId: req.user.id });
        const moduleIds = [...new Set(allProgress.map(p => p.moduleId))];

        const summary = {
            totalCompleted: allProgress.length,
            modulesStarted: moduleIds.length,
            averageScore: allProgress.length > 0
                ? Math.round(allProgress.reduce((sum, p) => sum + (p.score || 0), 0) / allProgress.length)
                : 0,
            recentActivity: allProgress
                .sort((a, b) => new Date(b.lastAccessedAt) - new Date(a.lastAccessedAt))
                .slice(0, 5),
        };

        res.json({ data: summary });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
