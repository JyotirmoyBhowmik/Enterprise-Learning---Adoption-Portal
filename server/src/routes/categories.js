/**
 * ============================================================================
 * MODULE: Categories API Routes
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE FOR FUTURE DEVELOPERS:
 * - DO NOT hardcode new training categories into the React components.
 * - All new content must be inserted via the database `categories` table
 *   to maintain the integrity of the original architecture.
 * ============================================================================
 */
const express = require('express');
const router = express.Router();
const { createRepository } = require('../repositories/repositoryFactory');
const { authenticate } = require('../middleware/auth');
const { rbac } = require('../middleware/rbac');

const categoryRepo = createRepository('categories');

// GET /api/categories — List all categories
router.get('/', async (_req, res, next) => {
    try {
        const categories = await categoryRepo.getAll();
        // Sort by 'order' field for consistent display
        categories.sort((a, b) => (a.order || 0) - (b.order || 0));
        res.json({ data: categories });
    } catch (err) {
        next(err);
    }
});

// GET /api/categories/:id — Get single category
router.get('/:id', async (req, res, next) => {
    try {
        const category = await categoryRepo.getById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: { message: 'Category not found' } });
        }
        res.json({ data: category });
    } catch (err) {
        next(err);
    }
});

// POST /api/categories — Create category (admin only)
router.post('/', authenticate, rbac('admin'), async (req, res, next) => {
    try {
        const category = await categoryRepo.create(req.body);
        res.status(201).json({ data: category });
    } catch (err) {
        next(err);
    }
});

// PUT /api/categories/:id — Update category (admin only)
router.put('/:id', authenticate, rbac('admin'), async (req, res, next) => {
    try {
        const category = await categoryRepo.update(req.params.id, req.body);
        if (!category) {
            return res.status(404).json({ error: { message: 'Category not found' } });
        }
        res.json({ data: category });
    } catch (err) {
        next(err);
    }
});

// DELETE /api/categories/:id — Delete category (admin only)
router.delete('/:id', authenticate, rbac('admin'), async (req, res, next) => {
    try {
        const deleted = await categoryRepo.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: { message: 'Category not found' } });
        }
        res.json({ data: { message: 'Category deleted' } });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
