/**
 * ============================================================================
 * MODULE: JWT Authentication Middleware
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - Validates JWTs from HTTP-only cookies.
 * - Injects req.user with decoded token payload.
 * - In Phase 3 this will integrate with Active Directory session state.
 * ============================================================================
 */
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'lumina-jwt-secret-change-in-production';

function authenticate(req, res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: { message: 'Authentication required' } });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: { message: 'Invalid or expired token' } });
    }
}

// Optional authentication — doesn't fail if no token, just sets req.user = null
function optionalAuth(req, _res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            req.user = jwt.verify(token, JWT_SECRET);
        } catch {
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
}

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    });
}

module.exports = { authenticate, optionalAuth, generateToken };
