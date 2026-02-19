const express = require('express');
const router = express.Router();
const llmService = require('../services/liteLlmService');
const db = require('../db');

// Create or get chat session
router.post('/sessions', async (req, res, next) => {
    try {
        // Using a hardcoded user for demo if no auth
        // In real app: req.user.id
        const user_id = process.env.DEMO_USER_ID || '00000000-0000-0000-0000-000000000000';

        // Ensure user exists for FK constraint (demo hack)
        const userExists = await db('users').where({ id: user_id }).first();
        if (!userExists) {
            await db('users').insert({
                id: user_id,
                email: 'demo@company.com',
                name: 'Demo User',
                role: 'learner'
            });
        }

        const [session] = await db('chat_sessions').insert({
            user_id,
            title: req.body.title || 'New Chat'
        }).returning('*');

        res.status(201).json({ data: session });
    } catch (err) {
        next(err);
    }
});

// Get session history
router.get('/sessions/:id/messages', async (req, res, next) => {
    try {
        const messages = await db('chat_messages')
            .where({ session_id: req.params.id })
            .orderBy('created_at', 'asc');
        res.json({ data: messages });
    } catch (err) {
        next(err);
    }
});

// Send message to local LLM
router.post('/sessions/:id/chat', async (req, res, next) => {
    try {
        const { message } = req.body;
        const sessionId = req.params.id;

        // 1. Save user message
        const [userMsg] = await db('chat_messages').insert({
            session_id: sessionId,
            role: 'user',
            content: message
        }).returning('*');

        // 2. Get recent history for context
        const history = await db('chat_messages')
            .where({ session_id: sessionId })
            .orderBy('created_at', 'asc')
            .limit(10);

        const mappedHistory = history.map(m => ({ role: m.role, content: m.content }));

        // 3. Generate response via local LLM & RAG
        const aiContent = await llmService.generateResponse(message, mappedHistory);

        // 4. Save AI response
        const [aiMsg] = await db('chat_messages').insert({
            session_id: sessionId,
            role: 'assistant',
            content: aiContent
        }).returning('*');

        res.json({ data: aiMsg });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
