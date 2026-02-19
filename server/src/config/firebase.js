/**
 * ============================================================================
 * MODULE: Firebase Admin SDK Configuration
 * SYSTEM: Lumina Learning & Adoption Suite
 * ============================================================================
 * LEAD ARCHITECT: Jyotirmoy Bhowmik
 * DEPLOYMENT TARGET: Enterprise On-Premises (PostgreSQL)
 *
 * ARCHITECTURE DIRECTIVE:
 * - This file initializes Firebase Admin for Phase 1 (Firestore + Auth).
 * - In Phase 2, this file is replaced or supplemented by a PostgreSQL
 *   connection pool configuration.
 * ============================================================================
 */
const admin = require('firebase-admin');

let db = null;
let auth = null;

try {
    // Attempt to initialize Firebase Admin SDK
    // In development without credentials, we'll use a mock/in-memory store
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
        const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        db = admin.firestore();
        auth = admin.auth();
        console.log('✦  Firebase Admin SDK initialized with service account');
    } else if (process.env.FIREBASE_PROJECT_ID) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
        db = admin.firestore();
        auth = admin.auth();
        console.log('✦  Firebase Admin SDK initialized with env credentials');
    } else {
        console.log('⚠  Firebase credentials not found — running in demo mode with in-memory data');
    }
} catch (error) {
    console.log('⚠  Firebase initialization failed — running in demo mode:', error.message);
}

module.exports = { db, auth, admin };
