# 🚀 Guide de Déploiement Home21

Ce guide détaille les étapes pour déployer Home21 sur différents environnements.

## 🏗️ Environnements

### 1. Développement Local avec Docker

```bash
# Cloner le projet
git clone <repository-url>
cd home21-v2

# Lancer avec Docker Compose
docker-compose up --build

# Accès
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Base de données: localhost:5432
```

### 2. Déploiement Netlify (Automatique)

#### Configuration initiale

1. **Connecter le repository GitHub à Netlify**
   - Aller sur [netlify.com](https://netlify.com)
   - "New site from Git" → GitHub → Sélectionner le repo `home21-v2`

2. **Configuration de build Netlify**
   ```
   Build command: cd frontend && npm ci && npm run build
   Publish directory: frontend/build
   ```

3. **Variables d'environnement**
   ```
   REACT_APP_API_URL=https://api.home21.votre-domaine.com
   REACT_APP_ENV=production
   NODE_VERSION=18
   ```

#### Déploiement automatique

Le déploiement se fait automatiquement via GitHub Actions :
- **Push sur `main`** → Déploiement production
- **Push sur `develop`** → Déploiement staging
- **Pull Request** → Déploiement preview

### 3. Déploiement Docker (Production)

#### Prérequis
- Docker & Docker Compose installés
- Serveur avec minimum 2 CPU, 4GB RAM
- Nom de domaine configuré

#### Étapes

1. **Configuration serveur**
   ```bash
   # Cloner le projet
   git clone <repository-url>
   cd home21-v2
   
   # Variables d'environnement
   cp .env.example .env
   # Éditer .env avec vos valeurs
   ```

2. **Lancement production**
   ```bash
   # Build et démarrage
   docker-compose -f docker-compose.prod.yml up -d --build
   
   # Vérification
   docker-compose ps
   ```

3. **Configuration reverse proxy (Nginx)**
   ```nginx
   server {
       server_name home21.votre-domaine.com;
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## 🔧 Configuration des Secrets

### GitHub Secrets (requis pour CI/CD)

```bash
# Netlify
NETLIFY_AUTH_TOKEN=<token-netlify>
NETLIFY_SITE_ID=<site-id>

# API
REACT_APP_API_URL=https://api.home21.example.com

# Notifications (optionnel)
SLACK_WEBHOOK=<webhook-url>
```

### Variables d'environnement

#### Frontend
```bash
REACT_APP_API_URL=<url-api-backend>
REACT_APP_ENV=<development|staging|production>
```

#### Backend (futur)
```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/home21
REDIS_URL=redis://host:6379
JWT_SECRET=<secret-jwt>
```

## 🔍 Vérifications Post-Déploiement

### 1. Health Checks

```bash
# Frontend
curl https://home21.votre-domaine.com/health

# Docker
docker-compose exec frontend wget -q --spider http://localhost/health
```

### 2. Tests fonctionnels

```bash
# Lancer les tests E2E
npm run test:e2e

# Vérifier les performances
npm run lighthouse
```

### 3. Monitoring

- **Uptime** : Netlify Analytics ou service externe
- **Erreurs** : Sentry ou service de monitoring
- **Performance** : Lighthouse CI

## 🔄 Workflow de Déploiement

```mermaid
graph LR
    A[Développement Local] --> B[Push vers GitHub]
    B --> C[GitHub Actions]
    C --> D[Tests & Build]
    D --> E[Déploiement Netlify]
    E --> F[Vérifications]
    F --> G[Notification équipe]
```

### Branches et Environnements

- `main` → Production (home21.com)
- `develop` → Staging (dev.home21.com)  
- `feature/*` → Preview deployments

## 🐛 Dépannage

### Problèmes courants

1. **Build qui échoue**
   ```bash
   # Vérifier les dépendances
   cd frontend && npm audit
   
   # Clear cache
   npm ci --cache /tmp/empty-cache
   ```

2. **Variables d'environnement**
   ```bash
   # Vérifier dans le build
   echo $REACT_APP_API_URL
   ```

3. **Docker issues**
   ```bash
   # Logs
   docker-compose logs -f frontend
   
   # Rebuild
   docker-compose up --build --force-recreate
   ```

### Rollback

```bash
# Netlify
# Via l'interface web : Deploys → Previous deploy → Publish

# Docker
docker-compose down
git checkout HEAD~1
docker-compose up -d --build
```

## 📊 Métriques et Performance

### KPIs à surveiller

- **Time to First Byte (TTFB)** : < 200ms
- **First Contentful Paint (FCP)** : < 1.5s
- **Largest Contentful Paint (LCP)** : < 2.5s
- **Uptime** : > 99.9%

### Optimisations

1. **Bundle size** : Analyser avec `npm run analyze`
2. **Images** : Compression et lazy loading
3. **Cache** : Headers appropriés (voir netlify.toml)
4. **CDN** : Netlify CDN activé automatiquement

---

## 🔗 Liens utiles

- [Dashboard Netlify](https://app.netlify.com/)
- [GitHub Actions](https://github.com/votre-org/home21-v2/actions)
- [Documentation Docker](https://docs.docker.com/)

Pour toute question, contactez l'équipe DevOps ! 🚀