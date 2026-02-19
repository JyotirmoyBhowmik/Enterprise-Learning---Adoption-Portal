/**
 * ============================================================================
 * MODULE: Lessons API Routes
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 * ============================================================================
 */
const express = require('express');
const router = express.Router();
const { createRepository } = require('../repositories/repositoryFactory');
const { authenticate } = require('../middleware/auth');
const { rbac } = require('../middleware/rbac');

const lessonRepo = createRepository('lessons');

// GET /api/lessons?moduleId= — List lessons, optionally filtered by module
router.get('/', async (req, res, next) => {
    try {
        const filters = {};
        if (req.query.moduleId) filters.moduleId = req.query.moduleId;
        const lessons = await lessonRepo.getAll(filters);
        lessons.sort((a, b) => (a.order || 0) - (b.order || 0));
        res.json({ data: lessons });
    } catch (err) {
        next(err);
    }
});

// GET /api/lessons/:id — Get single lesson
router.get('/:id', async (req, res, next) => {
    try {
        const lesson = await lessonRepo.getById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ error: { message: 'Lesson not found' } });
        }
        res.json({ data: lesson });
    } catch (err) {
        next(err);
    }
});

// POST /api/lessons — Create lesson (admin only)
router.post('/', authenticate, rbac('admin'), async (req, res, next) => {
    try {
        const lesson = await lessonRepo.create(req.body);
        res.status(201).json({ data: lesson });
    } catch (err) {
        next(err);
    }
});

// PUT /api/lessons/:id — Update lesson (admin only)
router.put('/:id', authenticate, rbac('admin'), async (req, res, next) => {
    try {
        const lesson = await lessonRepo.update(req.params.id, req.body);
        if (!lesson) return res.status(404).json({ error: { message: 'Lesson not found' } });
        res.json({ data: lesson });
    } catch (err) {
        next(err);
    }
});

// DELETE /api/lessons/:id — Delete lesson (admin only)
router.delete('/:id', authenticate, rbac('admin'), async (req, res, next) => {
    try {
        const deleted = await lessonRepo.delete(req.params.id);
        if (!deleted) return res.status(404).json({ error: { message: 'Lesson not found' } });
        res.json({ data: { message: 'Lesson deleted' } });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
