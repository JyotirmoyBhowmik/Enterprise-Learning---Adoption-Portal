const BaseRepository = require('./BaseRepository');
const db = require('../db');

class PostgresRepository extends BaseRepository {
    constructor(collectionName) {
        super();
        this.tableName = collectionName;
    }

    async getAll() {
        return await db(this.tableName).select('*').orderBy('created_at', 'asc');
    }

    async getById(id) {
        const item = await db(this.tableName).where({ id }).first();
        return item || null;
    }

    async create(data) {
        const [newItem] = await db(this.tableName).insert(data).returning('*');
        return newItem;
    }

    async update(id, data) {
        data.updated_at = db.fn.now();
        const [updatedItem] = await db(this.tableName)
            .where({ id })
            .update(data)
            .returning('*');
        return updatedItem;
    }

    async delete(id) {
        await db(this.tableName).where({ id }).del();
        return true;
    }

    // Custom method to query by arbitrary fields
    async find(query) {
        return await db(this.tableName).where(query);
    }
}

module.exports = PostgresRepository;
