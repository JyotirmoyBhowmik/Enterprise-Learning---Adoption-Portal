/**
 * ============================================================================
 * MODULE: Authentication API Routes
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - Phase 1: Simple email/password demo auth with JWT.
 * - Phase 3: Replace with passport-ldapauth / passport-azure-ad for
 *   Active Directory SSO integration.
 * ============================================================================
 */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { authenticate, generateToken } = require('../middleware/auth');
const { createRepository } = require('../repositories/repositoryFactory');

const userRepo = createRepository('users');

// POST /api/auth/login — Demo login (Phase 1)
router.post('/login', [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 4 }).trim().escape().withMessage('Password min 4 chars'),
    validate,
], async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // In demo mode, find user by email or create a demo user
        let users = await userRepo.getAll({ email });
        let user = users[0];

        if (!user) {
            // Demo: auto-create user on first login
            user = await userRepo.create({
                email,
                displayName: email.split('@')[0],
                role: email.includes('admin') ? 'admin' : 'learner',
                adGroups: [],
            });
        }

        // Demo: accept any password >= 4 chars (Phase 1 only)
        const token = generateToken({
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
        });

        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24h
        });

        res.json({
            data: {
                user: { id: user.id, email: user.email, displayName: user.displayName, role: user.role },
                token,
            },
        });
    } catch (err) {
        next(err);
    }
});

// POST /api/auth/logout
router.post('/logout', (_req, res) => {
    res.clearCookie('token');
    res.json({ data: { message: 'Logged out successfully' } });
});

// GET /api/auth/me — Get current user
router.get('/me', authenticate, async (req, res) => {
    res.json({
        data: {
            id: req.user.id,
            email: req.user.email,
            displayName: req.user.displayName,
            role: req.user.role,
        },
    });
});

module.exports = router;
