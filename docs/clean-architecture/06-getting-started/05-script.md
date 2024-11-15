# Script de Génération de Projet Clean Architecture

Ce script Bash permet de générer automatiquement un projet Vue.js suivant les principes de Clean Architecture. Il met en place une structure complète avec toutes les bonnes pratiques et configurations nécessaires.

## Structure du Script

Le script est organisé en plusieurs modules :

```
scripts/
├── create-clean-arch.sh      # Script principal
└── lib/
    ├── colors.sh            # Définition des couleurs pour les messages
    ├── utils.sh             # Fonctions utilitaires
    ├── structure.sh         # Création de la structure de dossiers
    ├── config_files.sh      # Création des fichiers de configuration
    ├── base_files.sh        # Création des fichiers de base
    ├── dependencies.sh      # Gestion des dépendances
    ├── github_actions.sh    # Configuration GitHub Actions
    ├── package_scripts.sh   # Configuration package.json
    ├── test_setup.sh        # Configuration des tests
    ├── documentation.sh     # Génération de la documentation
    └── story_context.sh     # Création du contexte Story exemple
```

## Utilisation

```bash
./create-clean-arch.sh nom-du-projet
```

## Fonctionnalités

### 1. Structure de Base
- Création d'une structure de dossiers suivant Clean Architecture
- Organisation en contextes métier (domains)
- Séparation claire des couches (domain, application, infrastructure, presentation)

### 2. Configuration
- Configuration TypeScript optimisée
- Configuration Vite avec aliases
- ESLint et Prettier
- Tailwind CSS
- Tests (Vitest + Playwright)
- GitHub Actions
- Husky + Commitlint

### 3. Dépendances
Installation automatique des dépendances essentielles :
- Vue 3
- TypeScript
- Pinia
- Vue Router
- TailwindCSS
- Testing Library
- et plus...

### 4. Contexte Exemple
Création d'un contexte "Story" complet avec :
- Entités et Value Objects
- Use Cases
- Repository
- Composants Vue
- Tests

### 5. Documentation
Génération automatique de :
- README.md
- Documentation d'architecture
- Guides de développement
- Documentation des tests

## Structure du Projet Généré

```
project/
├── src/
│   ├── contexts/           # Contextes métier
│   │   └── story/         # Exemple de contexte
│   ├── shared/            # Code partagé
│   ├── infrastructure/    # Couche infrastructure
│   └── presentation/      # Couche présentation
├── docs/                  # Documentation
├── tests/                 # Tests
└── [fichiers config]      # Fichiers de configuration
```

## Bonnes Pratiques Implémentées

1. **Clean Architecture**
   - Séparation claire des responsabilités
   - Inversion des dépendances
   - Isolation du domaine métier

2. **TypeScript**
   - Configuration stricte
   - Types explicites
   - Interfaces et types partagés

3. **Tests**
   - Tests unitaires avec Vitest
   - Tests E2E avec Playwright
   - Configuration de couverture de code

4. **Git & CI/CD**
   - Hooks Git avec Husky
   - Validation des commits
   - GitHub Actions pour CI/CD

5. **Documentation**
   - Documentation d'architecture
   - Guides de développement
   - JSDoc et commentaires

## Personnalisation

Le script peut être personnalisé en modifiant les fichiers dans le dossier `lib/`. Chaque module est responsable d'un aspect spécifique de la génération du projet.

## Maintenance

Pour maintenir le script :
1. Mettre à jour les versions des dépendances dans `dependencies.sh`
2. Adapter les configurations dans `config_files.sh`
3. Modifier la structure dans `structure.sh`
4. Ajouter/modifier les templates dans `base_files.sh`

## Contribution

Les contributions sont les bienvenues ! Voir le fichier CONTRIBUTING.md pour plus de détails.
