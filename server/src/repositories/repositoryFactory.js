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
const { db } = require('../config/firebase');

function createRepository(collectionName) {
    if (db) {
        const FirebaseRepository = require('./firebaseRepository');
        return new FirebaseRepository(collectionName);
    }
    // Fallback: in-memory store for demo / dev without Firebase
    const InMemoryRepository = require('./inMemoryRepository');
    return new InMemoryRepository(collectionName);
}

module.exports = { createRepository };
