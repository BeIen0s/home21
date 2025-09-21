# 🚀 Configuration GitHub pour Home21 v2

## Étapes pour pousser vers GitHub

### 1. Créer le repository sur GitHub

1. Aller sur [github.com](https://github.com)
2. Cliquer sur "New repository" (ou le bouton "+" en haut à droite)
3. Configuration recommandée :
   - **Repository name** : `home21-v2`
   - **Description** : `🏠 Home21 - Plateforme moderne de gestion de résidence pour l'association Pass21`
   - **Visibility** : Public ou Private selon vos besoins
   - **Ne pas** initialiser avec README (nous en avons déjà un)
   - **Ne pas** ajouter .gitignore (nous en avons déjà un)

### 2. Stratégie de branches

🎆 **BONNE NOUVELLE** : Votre code Home21 v2 est déjà poussé sur GitHub !

- **Branche existante** : `main` (ancienne version Home21)
- **Nouvelle branche** : `home21-v2` (version moderne complète)
- **URL de la branche** : https://github.com/BeIen0s/home21/tree/home21-v2

### 3. Connecter le repository local (DÉJÀ FAIT)

```bash
# Ajouter l'origin remote (DÉJÀ FAIT)
git remote add origin https://github.com/BeIen0s/home21.git

# Vérifier que l'origin est configuré
git remote -v

# Renommer la branche master en main (convention moderne)
git branch -M main

# Pousser la branche home21-v2 (DÉJÀ FAIT)
git push -u origin home21-v2
```

### 4. Configuration des Secrets GitHub (pour CI/CD)

Dans les paramètres du repository GitHub → Settings → Secrets and variables → Actions :

**Secrets requis pour Netlify** :
- `NETLIFY_AUTH_TOKEN` : Token d'authentification Netlify
- `NETLIFY_SITE_ID` : ID du site Netlify

**Secrets optionnels** :
- `SLACK_WEBHOOK` : Webhook pour notifications Slack
- `REACT_APP_API_URL` : URL de l'API (si différente de la valeur par défaut)

### 5. Configuration Netlify

#### Option A : Via GitHub (recommandée)
1. Aller sur [app.netlify.com](https://app.netlify.com)
2. "New site from Git" → GitHub → Sélectionner `home21-v2`
3. Configuration :
   - **Branch to deploy** : `main`
   - **Build command** : `cd frontend && npm ci && npm run build`
   - **Publish directory** : `frontend/build`
   - **Node version** : `18`

#### Option B : Déploiement manuel
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer depuis le dossier du projet
netlify deploy --prod --dir frontend/build
```

### 6. Variables d'environnement Netlify

Dans Netlify → Site settings → Environment variables :

```
NODE_VERSION=18
REACT_APP_API_URL=https://api.home21.example.com
REACT_APP_ENV=production
```

## 🔄 Workflow de développement

Une fois le repository configuré :

```bash
# Créer une nouvelle branche pour une fonctionnalité
git checkout -b feature/residents-management

# Développer...
# git add, git commit

# Pousser la branche
git push origin feature/residents-management

# Créer une Pull Request sur GitHub
# Une fois approuvée et mergée sur main → déploiement automatique !
```

## 🌐 URLs après déploiement

- **Repository GitHub** : `https://github.com/BeIen0s/home21`
- **Branche Home21 v2** : `https://github.com/BeIen0s/home21/tree/home21-v2`
- **Actions CI/CD** : `https://github.com/BeIen0s/home21/actions`
- **Site Netlify** : `https://amazing-app-name.netlify.app`
- **Site custom domain** : `https://home21.votre-domaine.com`

## 🛠️ Commandes utiles

```bash
# Cloner le projet (pour d'autres développeurs)
git clone -b home21-v2 https://github.com/BeIen0s/home21.git

# Développement local avec Docker
cd home21-v2
docker-compose up --build

# Développement local sans Docker
cd frontend
npm install
npm start

# Tests
npm test
npm run lint
```

## 🎉 Résultat

Après ces étapes, vous aurez :

- ✅ Code source sur GitHub avec historique
- ✅ CI/CD automatisé avec GitHub Actions
- ✅ Déploiement automatique sur Netlify
- ✅ Preview deployments pour les Pull Requests
- ✅ Workflow de développement professionnel

**Votre plateforme Home21 sera en ligne et accessible au monde entier ! 🌍**

---

💡 **Astuce** : Après le premier déploiement, partagez l'URL avec l'équipe Pass21 pour des retours et tests utilisateurs !