# Frontend Dockerfile pour Home21
# Multi-stage build pour optimiser la taille

# Stage 1: Build
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production --silent

# Copier le code source
COPY . .

# Variables d'environnement pour le build
ARG REACT_APP_API_URL=http://localhost:5000/api
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build de l'application
RUN npm run build

# Stage 2: Production avec Nginx
FROM nginx:alpine AS production

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Supprimer les fichiers par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers buildés depuis le stage précédent
COPY --from=builder /app/build /usr/share/nginx/html

# Copier le script pour gérer les variables d'environnement
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S react -u 1001 -G nodejs

# Variables d'environnement par défaut
ENV REACT_APP_API_URL=http://localhost:5000/api

# Exposer le port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Script d'entrée
ENTRYPOINT ["/docker-entrypoint.sh"]

# Commande par défaut
CMD ["nginx", "-g", "daemon off;"]