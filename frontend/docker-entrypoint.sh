#!/bin/sh

# Script d'entrée Docker pour Home21 Frontend
# Gère les variables d'environnement runtime

set -e

# Fonction de logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "🚀 Démarrage du frontend Home21..."

# Variables d'environnement par défaut
: ${REACT_APP_API_URL:="http://localhost:5000/api"}
: ${REACT_APP_ENV:="production"}

log "Configuration environnement:"
log "  - API_URL: $REACT_APP_API_URL"
log "  - ENV: $REACT_APP_ENV"

# Remplacer les variables d'environnement dans les fichiers JS
if [ -d "/usr/share/nginx/html" ]; then
    log "📝 Configuration des variables d'environnement runtime..."
    
    # Trouver tous les fichiers JS dans le build
    find /usr/share/nginx/html -name "*.js" -exec sed -i "s|REACT_APP_API_URL_PLACEHOLDER|$REACT_APP_API_URL|g" {} \;
    
    # Créer un fichier de configuration runtime
    cat > /usr/share/nginx/html/runtime-config.js << EOF
window.RUNTIME_CONFIG = {
    REACT_APP_API_URL: '$REACT_APP_API_URL',
    REACT_APP_ENV: '$REACT_APP_ENV'
};
EOF
    
    log "✅ Configuration runtime créée"
fi

# Vérifier la santé des fichiers
if [ ! -f "/usr/share/nginx/html/index.html" ]; then
    log "❌ ERREUR: index.html non trouvé!"
    exit 1
fi

log "🌐 Démarrage du serveur Nginx..."

# Exécuter la commande passée en argument
exec "$@"