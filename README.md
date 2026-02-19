# Lumina Learning & Adoption Suite

> Enterprise-grade training portal for SharePoint, Microsoft Teams, and AI technologies.
> 
> **Architected and Developed by Jyotirmoy Bhowmik**  
> **Deployment Target:** Surya Nepal Pvt. Ltd. (SNPL)

## Quick Start

```bash
# 1. Install server dependencies
cd server && npm install

# 2. Seed demo data
npm run seed

# 3. Start backend (port 5000)
npm run dev

# 4. In a new terminal — install client dependencies
cd client && npm install

# 5. Start frontend (port 5173)
npm run dev
```

Open **http://localhost:5173** in your browser.

## Architecture

| Layer | Technology |
|---|---|
| Frontend | React 18 + Tailwind CSS 3 (Vite) |
| Backend | Node.js + Express.js |
| Database (Phase 1) | In-memory / Firebase Firestore |
| Database (Phase 2) | PostgreSQL |
| Auth (Phase 1) | JWT (HTTP-only cookies) |
| Auth (Phase 3) | Active Directory SSO |

### Repository Pattern

The backend uses the **Repository Pattern** so the database can be swapped without changing business logic:

```
BaseRepository (interface)
├── InMemoryRepository  ← dev / demo
├── FirebaseRepository  ← Phase 1
└── PostgresRepository  ← Phase 2 (future)
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth)
│   │   ├── pages/          # Route pages
│   │   └── services/       # API client
│   └── ...config files
├── server/                 # Express backend
│   └── src/
│       ├── config/         # Firebase / DB config
│       ├── middleware/      # Auth, RBAC, Validation
│       ├── repositories/   # Repository Pattern
│       ├── routes/         # REST API routes
│       └── seed.js         # Demo data seeder
└── README.md
```

## License

Proprietary — Surya Nepal Pvt. Ltd.
