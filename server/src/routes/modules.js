/**
 * ============================================================================
 * MODULE: Modules API Routes
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE FOR FUTURE DEVELOPERS:
 * - Modules belong to Categories. Always insert via the database.
 * - Use categoryId filter to query modules for a specific category.
 * ============================================================================
 */
const express = require('express');
const router = express.Router();
const { createRepository } = require('../repositories/repositoryFactory');
const { authenticate } = require('../middleware/auth');
const { rbac } = require('../middleware/rbac');

const moduleRepo = createRepository('modules');

// GET /api/modules?categoryId= — List modules, optionally filtered by category
router.get('/', async (req, res, next) => {
    try {
        const filters = {};
        if (req.query.categoryId) filters.categoryId = req.query.categoryId;
        const modules = await moduleRepo.getAll(filters);
        modules.sort((a, b) => (a.order || 0) - (b.order || 0));
        res.json({ data: modules });
    } catch (err) {
        next(err);
    }
});

// GET /api/modules/:id — Get single module
router.get('/:id', async (req, res, next) => {
    try {
        const mod = await moduleRepo.getById(req.params.id);
        if (!mod) {
            return res.status(404).json({ error: { message: 'Module not found' } });
        }
        res.json({ data: mod });
    } catch (err) {
        next(err);
    }
});

// POST /api/modules — Create module (admin only)
router.post('/', authenticate, rbac('admin'), async (req, res, next) => {
    try {
        const mod = await moduleRepo.create(req.body);
        res.status(201).json({ data: mod });
    } catch (err) {
        next(err);
    }
});

// PUT /api/modules/:id — Update module (admin only)
router.put('/:id', authenticate, rbac('admin'), async (req, res, next) => {
    try {
        const mod = await moduleRepo.update(req.params.id, req.body);
        if (!mod) return res.status(404).json({ error: { message: 'Module not found' } });
        res.json({ data: mod });
    } catch (err) {
        next(err);
    }
});

// DELETE /api/modules/:id — Delete module (admin only)
router.delete('/:id', authenticate, rbac('admin'), async (req, res, next) => {
    try {
        const deleted = await moduleRepo.delete(req.params.id);
        if (!deleted) return res.status(404).json({ error: { message: 'Module not found' } });
        res.json({ data: { message: 'Module deleted' } });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
