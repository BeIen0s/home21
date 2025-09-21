# Home21 - Plateforme de Gestion de Résidence

## 🏠 À propos

Home21 est une solution SaaS moderne conçue pour l'association Pass21, permettant une gestion complète et intuitive des résidences étudiantes.

## 🎯 Fonctionnalités Principales

### Pour les Résidents
- ✅ Processus d'arrivée simplifié
- 🏠 Gestion des chambres et équipements
- 📋 Attribution automatique des tâches ménagères
- 🛍️ Services intégrés (courses, repas, transport)
- 📅 Planning personnel et collectif

### Pour l'Administration
- 👥 Gestion complète des utilisateurs
- 🏢 Suivi des maisons et chambres
- 📊 Tableau de bord et analytics
- 📢 Annonces et événements
- ⚙️ Configuration des services

## 🏗️ Architecture

```
home21-v2/
├── frontend/          # Application React + TypeScript
├── backend/           # API REST avec Node.js
├── database/          # Schémas et migrations
├── docker/           # Configuration Docker
├── docs/             # Documentation
└── .github/          # CI/CD GitHub Actions
```

## 🚀 Stack Technologique

**Frontend**
- React 18 + TypeScript
- Vite (build ultra-rapide)
- TailwindCSS (design system)
- TanStack Query (état serveur)
- React Router (navigation)

**Backend** (à venir)
- Node.js + Express/Fastify
- PostgreSQL + Prisma ORM
- Authentication JWT
- API REST documentée

**DevOps**
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Netlify (frontend)
- Railway/Vercel (backend)

## 🔧 Développement

### Démarrage rapide avec Docker

```bash
# Cloner le projet
git clone <repository-url>
cd home21-v2

# Lancer avec Docker Compose
docker-compose up --build

# Accès
# Frontend: http://localhost:3000
# Backend: http://localhost:5000 (à venir)
# Base de données: localhost:5432
```

### Développement local (sans Docker)

```bash
# Frontend
cd frontend
npm install
npm start

# Tests
npm test
npm run lint
```

### Variables d'environnement

Copiez `.env.example` vers `.env` et configurez :

```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## 📝 Documentation

- [Guide de développement](./docs/development.md)
- [Architecture technique](./docs/architecture.md)
- [Guide de déploiement](./docs/deployment.md)

---

**Home21** - Simplifions la vie en résidence ! 🏠✨