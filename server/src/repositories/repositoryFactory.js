/**
 * ============================================================================
 * MODULE: Repository Factory
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - This factory decides which repository implementation to use.
 * - To switch from Firebase to PostgreSQL, simply change the factory
 *   logic to return a PostgresRepository instance.
 * - All route handlers and business logic call createRepository() —
 *   they never import a specific database implementation directly.
 * ============================================================================
 */
const PostgresRepository = require('./PostgresRepository');

function createRepository(collectionName) {
    // The v2.0 pivot exclusively uses PostgreSQL
    return new PostgresRepository(collectionName);
}

module.exports = { createRepository };
