/**
 * ============================================================================
 * MODULE: Base Repository (Abstract Interface)
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE FOR FUTURE DEVELOPERS:
 * - This abstract class defines the contract for all data access.
 * - Concrete implementations (FirebaseRepository, PostgresRepository)
 *   must implement every method listed here.
 * - Business logic and routes depend ONLY on this interface.
 * ============================================================================
 */
class BaseRepository {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    async getAll(_filters = {}) {
        throw new Error('getAll() must be implemented by subclass');
    }

    async getById(_id) {
        throw new Error('getById() must be implemented by subclass');
    }

    async create(_data) {
        throw new Error('create() must be implemented by subclass');
    }

    async update(_id, _data) {
        throw new Error('update() must be implemented by subclass');
    }

    async delete(_id) {
        throw new Error('delete() must be implemented by subclass');
    }

    async query(_field, _operator, _value) {
        throw new Error('query() must be implemented by subclass');
    }
}

module.exports = BaseRepository;
