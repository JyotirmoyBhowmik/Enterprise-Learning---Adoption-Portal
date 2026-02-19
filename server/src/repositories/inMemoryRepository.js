/**
 * ============================================================================
 * MODULE: In-Memory Repository (Demo / Development Fallback)
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - This repository stores data in-memory for demo purposes when Firebase
 *   credentials are not available.
 * - It implements the same BaseRepository interface so the rest of the
 *   application works identically regardless of backend.
 * ============================================================================
 */
const BaseRepository = require('./baseRepository');

// Shared in-memory store across all InMemoryRepository instances
const store = {};

class InMemoryRepository extends BaseRepository {
    constructor(collectionName) {
        super(collectionName);
        if (!store[collectionName]) {
            store[collectionName] = [];
        }
    }

    _getStore() {
        return store[this.collectionName];
    }

    async getAll(filters = {}) {
        let results = [...this._getStore()];
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                results = results.filter(item => item[key] === value);
            }
        });
        return results;
    }

    async getById(id) {
        return this._getStore().find(item => item.id === id) || null;
    }

    async create(data) {
        const id = data.id || `${this.collectionName}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const record = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        this._getStore().push(record);
        return record;
    }

    async update(id, data) {
        const index = this._getStore().findIndex(item => item.id === id);
        if (index === -1) return null;
        this._getStore()[index] = { ...this._getStore()[index], ...data, updatedAt: new Date().toISOString() };
        return this._getStore()[index];
    }

    async delete(id) {
        const index = this._getStore().findIndex(item => item.id === id);
        if (index === -1) return false;
        this._getStore().splice(index, 1);
        return true;
    }

    async query(field, operator, value) {
        const ops = {
            '==': (a, b) => a === b,
            '!=': (a, b) => a !== b,
            '>': (a, b) => a > b,
            '<': (a, b) => a < b,
            '>=': (a, b) => a >= b,
            '<=': (a, b) => a <= b,
        };
        const fn = ops[operator];
        if (!fn) throw new Error(`Unsupported operator: ${operator}`);
        return this._getStore().filter(item => fn(item[field], value));
    }

    // Utility: bulk insert (for seeding)
    async bulkCreate(items) {
        const created = [];
        for (const item of items) {
            created.push(await this.create(item));
        }
        return created;
    }

    // Utility: clear collection (for testing)
    async clear() {
        store[this.collectionName] = [];
    }
}

module.exports = InMemoryRepository;
