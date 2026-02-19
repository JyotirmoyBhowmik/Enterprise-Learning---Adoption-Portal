/**
 * ============================================================================
 * MODULE: Input Validation & Sanitization Middleware
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - All user inputs are validated and sanitized before reaching business logic.
 * - This prevents SQL injection and XSS attacks as per security requirements.
 * ============================================================================
 */
const { validationResult } = require('express-validator');

/**
 * Middleware that checks express-validator results and returns 400 on failures.
 */
function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: {
                message: 'Validation failed',
                details: errors.array().map(e => ({ field: e.path, message: e.msg })),
            },
        });
    }
    next();
}

module.exports = { validate };
