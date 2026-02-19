/**
 * ============================================================================
 * MODULE: Firebase Firestore Repository
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - Concrete Firestore implementation of BaseRepository.
 * - When migrating to PostgreSQL, create a postgresRepository.js that
 *   implements the same interface. Update repositoryFactory.js to return
 *   the new repository. No other code changes needed.
 * ============================================================================
 */
const BaseRepository = require('./baseRepository');
const { db } = require('../config/firebase');

class FirebaseRepository extends BaseRepository {
    constructor(collectionName) {
        super(collectionName);
        if (!db) throw new Error('Firebase DB not initialized');
        this.collection = db.collection(collectionName);
    }

    async getAll(filters = {}) {
        let query = this.collection;
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query = query.where(key, '==', value);
            }
        });
        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    }

    async create(data) {
        const id = data.id || this.collection.doc().id;
        const record = { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        delete record.id;
        await this.collection.doc(id).set(record);
        return { id, ...record };
    }

    async update(id, data) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) return null;
        const updated = { ...data, updatedAt: new Date().toISOString() };
        await this.collection.doc(id).update(updated);
        return { id, ...doc.data(), ...updated };
    }

    async delete(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) return false;
        await this.collection.doc(id).delete();
        return true;
    }

    async query(field, operator, value) {
        const snapshot = await this.collection.where(field, operator, value).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}

module.exports = FirebaseRepository;
