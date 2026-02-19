exports.up = async function (knex) {
    // Install pgvector extension if not exists
    await knex.raw('CREATE EXTENSION IF NOT EXISTS vector');

    await knex.schema.createTable('users', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('email').notNullable().unique();
        table.string('name').notNullable();
        table.string('role').defaultTo('learner'); // admin, learner
        table.timestamps(true, true);
    });

    await knex.schema.createTable('categories', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('parent_id').references('id').inTable('categories').onDelete('CASCADE');
        table.string('name').notNullable();
        table.text('description');
        table.integer('order_index').defaultTo(0);
        table.string('icon_name'); // For UI icons
        table.timestamps(true, true);
    });

    await knex.schema.createTable('modules', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('category_id').references('id').inTable('categories').onDelete('CASCADE').notNullable();
        table.string('title').notNullable();
        table.text('description');
        table.integer('order_index').defaultTo(0);
        table.string('difficulty').defaultTo('Beginner'); // Beginner, Intermediate, Advanced
        table.integer('duration_minutes').defaultTo(30);
        table.timestamps(true, true);
    });

    await knex.schema.createTable('content_items', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('module_id').references('id').inTable('modules').onDelete('CASCADE').notNullable();
        table.string('title').notNullable();
        table.string('type').notNullable(); // text, video, photo, document, quiz
        table.text('content'); // Rich text/markdown or JSON for quiz
        table.string('media_url'); // Direct link for video/photo/doc
        table.integer('order_index').defaultTo(0);
        table.timestamps(true, true);
    });

    await knex.schema.createTable('content_approvals', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('content_item_id').references('id').inTable('content_items').onDelete('CASCADE').notNullable();
        table.uuid('author_id').references('id').inTable('users').onDelete('SET NULL');
        table.uuid('reviewer_id').references('id').inTable('users').onDelete('SET NULL');
        table.string('status').defaultTo('draft'); // draft, review, published, rejected
        table.text('comments');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('chat_sessions', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
        table.string('title').defaultTo('New Chat');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('chat_messages', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('session_id').references('id').inTable('chat_sessions').onDelete('CASCADE').notNullable();
        table.string('role').notNullable(); // user, assistant
        table.text('content').notNullable();
        table.timestamps(true, true);
    });

    await knex.schema.createTable('document_chunks', table => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('content_item_id').references('id').inTable('content_items').onDelete('CASCADE').notNullable();
        table.text('text_content').notNullable();
        table.specificType('embedding', 'vector(384)'); // all-MiniLM-L6-v2 384 dims
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('document_chunks');
    await knex.schema.dropTableIfExists('chat_messages');
    await knex.schema.dropTableIfExists('chat_sessions');
    await knex.schema.dropTableIfExists('content_approvals');
    await knex.schema.dropTableIfExists('content_items');
    await knex.schema.dropTableIfExists('modules');
    await knex.schema.dropTableIfExists('categories');
    await knex.schema.dropTableIfExists('users');
    await knex.raw('DROP EXTENSION IF EXISTS vector');
};
