# 👩‍💻 Guide de Développement Home21

Ce guide détaille l'architecture, les conventions et les bonnes pratiques pour développer sur Home21.

## 🏗️ Architecture

### Structure du projet

```
home21-v2/
├── frontend/          # Application React + TypeScript
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── pages/       # Pages de l'application
│   │   ├── types/       # Définitions TypeScript
│   │   ├── hooks/       # Hooks React personnalisés
│   │   ├── services/    # Services API
│   │   └── lib/         # Utilitaires
│   ├── public/        # Assets statiques
│   └── Dockerfile     # Configuration Docker
├── backend/           # API REST Node.js (à venir)
├── database/          # Schémas et migrations
├── docker/            # Configuration Docker
├── docs/              # Documentation
└── .github/           # CI/CD GitHub Actions
```

### Stack technique

**Frontend**
- **React 18** avec TypeScript
- **Create React App** (CRA) pour le build
- **CSS personnalisé** (système design basé sur Tailwind)
- **React Router** pour la navigation
- **TanStack Query** pour la gestion d'état serveur
- **React Hook Form** pour les formulaires

**Backend** (planifié)
- **Node.js** avec Express ou Fastify
- **PostgreSQL** avec Prisma ORM
- **Redis** pour le cache
- **JWT** pour l'authentification

**DevOps**
- **Docker & Docker Compose**
- **GitHub Actions** pour CI/CD
- **Netlify** pour le déploiement frontend
- **ESLint & Prettier** pour la qualité de code

## 📋 Types et Modèles de Données

### Résidents
```typescript
interface Resident extends User {
  status: ResidentStatus;
  arrivalDate?: string;
  departureDate?: string;
  room?: Room;
  emergencyContact?: EmergencyContact;
}

enum ResidentStatus {
  PENDING = 'pending',
  ACTIVE = 'active', 
  DEPARTURE_PENDING = 'departure_pending',
  DEPARTED = 'departed'
}
```

### Logements
```typescript
interface House extends BaseEntity {
  number: string;
  totalRooms: number;
  rooms: Room[];
  occupancyRate: number;
}

interface Room extends BaseEntity {
  number: string;
  status: RoomStatus;
  currentResident?: Resident;
}
```

### Services
```typescript
interface ServiceRequest extends BaseEntity {
  type: ServiceType; // grocery, meal, transport, rental
  status: ServiceStatus;
  details: ServiceRequestDetails;
}
```

Voir `/src/types/` pour tous les types détaillés.

## 🎨 Design System

### Composants UI de base

```typescript
// Boutons
<Button variant="primary" size="md">Action</Button>
<Button variant="outline">Secondaire</Button>

// Cartes
<Card>
  <CardHeader>Titre</CardHeader>
  <CardContent>Contenu</CardContent>
</Card>

// Inputs
<Input 
  label="Email"
  type="email"
  error="Message d'erreur"
/>
```

### Classes CSS utilitaires

```css
/* Layout */
.container { max-width: 80rem; margin: 0 auto; }
.grid { display: grid; }
.flex { display: flex; }

/* Couleurs */
.text-primary { color: #2563eb; }
.bg-white { background: white; }

/* Boutons */
.btn-primary { /* styles primaires */ }
.btn-outline { /* styles outline */ }
```

## 🔄 Conventions de Développement

### Nommage

- **Composants** : PascalCase (`UserProfile.tsx`)
- **Hooks** : camelCase avec préfixe `use` (`useAuth.ts`)
- **Types/Interfaces** : PascalCase (`UserInterface`)
- **Constants** : SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **Variables/Fonctions** : camelCase (`getCurrentUser`)

### Structure des composants

```typescript
import React from 'react';
import { ComponentProps } from './types';

interface Props {
  // Props du composant
}

const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks
  // État local
  // Fonctions
  
  return (
    <div className="component-container">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### Gestion d'état

```typescript
// React Query pour les données serveur
const { data, isLoading, error } = useQuery(
  ['residents'],
  fetchResidents
);

// useState pour l'état local
const [isOpen, setIsOpen] = useState(false);

// Custom hooks pour la logique réutilisable
const { user, login, logout } = useAuth();
```

## 🧪 Tests

### Structure des tests

```typescript
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName prop="value" />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });
});
```

### Types de tests

- **Unit tests** : Composants individuels
- **Integration tests** : Interactions entre composants
- **E2E tests** : Parcours utilisateur complets

### Commandes

```bash
npm test              # Tests unitaires
npm run test:coverage # Avec couverture
npm run test:e2e      # Tests E2E (à venir)
```

## 📡 API et Services

### Services API

```typescript
// services/apiService.ts
class ApiService {
  async getResidents(): Promise<Resident[]> {
    const response = await fetch('/api/residents');
    return response.json();
  }
}

export const apiService = new ApiService();
```

### Hooks React Query

```typescript
// hooks/useResidents.ts
export const useResidents = () => {
  return useQuery(
    ['residents'],
    () => apiService.getResidents(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};
```

## 🔧 Configuration et Outils

### ESLint
```json
{
  "extends": ["react-app", "@typescript-eslint/recommended"],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

### Prettier
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100
}
```

## 🚀 Workflow de Développement

### 1. Nouvelle fonctionnalité

```bash
# Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# Développer
# ...

# Tests et lint
npm test
npm run lint

# Commit
git commit -m "feat: nouvelle fonctionnalité"

# Push et PR
git push origin feature/nouvelle-fonctionnalite
```

### 2. Conventions de commit

```
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage
refactor: refactoring
test: ajout de tests
chore: tâches de maintenance
```

### 3. Pull Requests

- **Titre** : Descriptif et concis
- **Description** : Context, changements, tests
- **Tests** : Tous les tests passent
- **Review** : Au moins 1 approbation

## 📊 Performance et Optimisation

### Métriques cibles

- **Bundle size** : < 500KB
- **Time to Interactive** : < 3s
- **First Paint** : < 1.5s

### Techniques d'optimisation

```typescript
// Lazy loading
const Dashboard = lazy(() => import('./Dashboard'));

// Memoization
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* rendu */}</div>;
});

// Code splitting
import('./utils').then(utils => {
  utils.doSomething();
});
```

## 🔒 Sécurité

### Bonnes pratiques

- **Variables sensibles** : Jamais dans le code
- **Validation** : Toujours valider côté client ET serveur
- **Sanitization** : Échapper les entrées utilisateur
- **HTTPS** : Obligatoire en production

### Exemple

```typescript
// ❌ Mauvais
const API_KEY = 'secret-key-in-code';

// ✅ Bon  
const API_KEY = process.env.REACT_APP_API_KEY;
```

## 📚 Ressources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query)
- [Testing Library](https://testing-library.com/)

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

Pour toute question, n'hésitez pas à ouvrir une issue ! 🚀