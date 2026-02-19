/**
 * ============================================================================
 * MODULE: API Service Layer
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - Centralized fetch wrapper for all API calls.
 * - All content is fetched dynamically — never hardcoded.
 * ============================================================================
 */
const API_BASE = '/api';

async function request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
    }

    return data.data;
}

export const api = {
    // Categories
    getCategories: () => request('/categories'),
    getCategory: (id) => request(`/categories/${id}`),

    // Modules
    getModules: (categoryId) => request(`/modules${categoryId ? `?categoryId=${categoryId}` : ''}`),
    getModule: (id) => request(`/modules/${id}`),

    // Lessons
    getLessons: (moduleId) => request(`/lessons${moduleId ? `?moduleId=${moduleId}` : ''}`),
    getLesson: (id) => request(`/lessons/${id}`),

    // Auth
    login: (email, password) => request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    }),
    logout: () => request('/auth/logout', { method: 'POST' }),
    getMe: () => request('/auth/me'),

    // Progress
    getProgress: () => request('/progress'),
    getProgressSummary: () => request('/progress/summary'),
    markComplete: (lessonId, moduleId, score) => request('/progress', {
        method: 'POST',
        body: JSON.stringify({ lessonId, moduleId, score }),
    }),
};
