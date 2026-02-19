/**
 * ============================================================================
 * MODULE: Role-Based Access Control Middleware
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - Uses a middleware factory pattern: rbac('admin') returns a middleware
 *   that checks req.user.role.
 * - In Phase 3, roles will be mapped from AD Security Groups.
 * ============================================================================
 */

/**
 * Middleware factory that restricts access to users with specified roles.
 * @param  {...string} allowedRoles - Roles permitted to access the route.
 * @returns {Function} Express middleware function.
 */
function rbac(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: { message: 'Authentication required' } });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: { message: 'Insufficient permissions. Required role(s): ' + allowedRoles.join(', ') },
            });
        }

        next();
    };
}

module.exports = { rbac };
