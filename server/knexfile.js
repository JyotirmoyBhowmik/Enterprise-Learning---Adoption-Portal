require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL || 'postgresql://lumina:lumina_password@localhost:5432/lumina_db',
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        },
        useNullAsDefault: true
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        },
        useNullAsDefault: true
    }
};
