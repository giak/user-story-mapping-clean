#!/bin/bash

# Définir le répertoire racine de la documentation
DOC_ROOT="docs/clean-architecture-typescript"

# Fonction pour créer un fichier avec un en-tête markdown
create_file() {
    local file_path="$1"
    local title="$2"

    # Créer le répertoire parent si nécessaire
    mkdir -p "$(dirname "$file_path")"

    # Créer le fichier avec un en-tête markdown
    cat > "$file_path" << EOF
# ${title}

## Table des matières

## Introduction

## Contenu principal

## Conclusion

## Références
EOF

    echo "Créé: $file_path"
}

# Créer le répertoire racine
mkdir -p "$DOC_ROOT"

# 00-plan.md
create_file "$DOC_ROOT/00-plan.md" "Plan Global de la Documentation Clean Architecture avec TypeScript et Vue.js"

# 01-introduction
mkdir -p "$DOC_ROOT/01-introduction"
create_file "$DOC_ROOT/01-introduction/01-clean-architecture/01-fundamentals.md" "Principes Fondamentaux de la Clean Architecture"
create_file "$DOC_ROOT/01-introduction/01-clean-architecture/02-benefits.md" "Avantages et Bénéfices de la Clean Architecture"
create_file "$DOC_ROOT/01-introduction/01-clean-architecture/03-challenges.md" "Défis et Solutions de la Clean Architecture"
create_file "$DOC_ROOT/01-introduction/01-clean-architecture/04-comparison.md" "Comparaison avec d'autres Architectures"

create_file "$DOC_ROOT/01-introduction/02-typescript-ecosystem/01-typescript-5-features.md" "Nouveautés TypeScript 5.x"
create_file "$DOC_ROOT/01-introduction/02-typescript-ecosystem/02-type-system.md" "Système de Types Avancé TypeScript"
create_file "$DOC_ROOT/01-introduction/02-typescript-ecosystem/03-tooling.md" "Outils et Écosystème TypeScript"
create_file "$DOC_ROOT/01-introduction/02-typescript-ecosystem/04-best-practices.md" "Meilleures Pratiques TypeScript"

create_file "$DOC_ROOT/01-introduction/03-vuejs3-ecosystem/01-composition-api.md" "API de Composition Vue.js 3"
create_file "$DOC_ROOT/01-introduction/03-vuejs3-ecosystem/02-reactivity.md" "Système de Réactivité Vue.js 3"
create_file "$DOC_ROOT/01-introduction/03-vuejs3-ecosystem/03-typescript-integration.md" "Intégration TypeScript avec Vue.js 3"
create_file "$DOC_ROOT/01-introduction/03-vuejs3-ecosystem/04-tooling.md" "Outils Vue.js 3"

# 02-project-setup
mkdir -p "$DOC_ROOT/02-project-setup"
create_file "$DOC_ROOT/02-project-setup/01-development-environment/01-prerequisites.md" "Prérequis Système"
create_file "$DOC_ROOT/02-project-setup/01-development-environment/02-ide-setup.md" "Configuration IDE"
create_file "$DOC_ROOT/02-project-setup/01-development-environment/03-git-configuration.md" "Configuration Git"
create_file "$DOC_ROOT/02-project-setup/01-development-environment/04-docker-setup.md" "Configuration Docker"

create_file "$DOC_ROOT/02-project-setup/02-project-structure/01-folder-organization.md" "Organisation des Dossiers"
create_file "$DOC_ROOT/02-project-setup/02-project-structure/02-naming-conventions.md" "Conventions de Nommage"
create_file "$DOC_ROOT/02-project-setup/02-project-structure/03-module-structure.md" "Structure des Modules"
create_file "$DOC_ROOT/02-project-setup/02-project-structure/04-configuration-files.md" "Fichiers de Configuration"

create_file "$DOC_ROOT/02-project-setup/03-tooling-configuration/01-typescript-config.md" "Configuration TypeScript"
create_file "$DOC_ROOT/02-project-setup/03-tooling-configuration/02-eslint-prettier.md" "ESLint et Prettier"
create_file "$DOC_ROOT/02-project-setup/03-tooling-configuration/03-testing-tools.md" "Outils de Test"
create_file "$DOC_ROOT/02-project-setup/03-tooling-configuration/04-build-tools.md" "Outils de Build"

# 03-core-concepts
mkdir -p "$DOC_ROOT/03-core-concepts"
create_file "$DOC_ROOT/03-core-concepts/01-domain-driven-design/01-bounded-contexts.md" "Contextes Bornés"
create_file "$DOC_ROOT/03-core-concepts/01-domain-driven-design/02-aggregates.md" "Agrégats et Entités"
create_file "$DOC_ROOT/03-core-concepts/01-domain-driven-design/03-value-objects.md" "Objets Valeur"
create_file "$DOC_ROOT/03-core-concepts/01-domain-driven-design/04-domain-events.md" "Événements Domaine"

create_file "$DOC_ROOT/03-core-concepts/02-solid-principles/01-single-responsibility.md" "Principe de Responsabilité Unique"
create_file "$DOC_ROOT/03-core-concepts/02-solid-principles/02-open-closed.md" "Principe Ouvert/Fermé"
create_file "$DOC_ROOT/03-core-concepts/02-solid-principles/03-liskov-substitution.md" "Principe de Substitution de Liskov"
create_file "$DOC_ROOT/03-core-concepts/02-solid-principles/04-interface-segregation.md" "Principe de Ségrégation des Interfaces"
create_file "$DOC_ROOT/03-core-concepts/02-solid-principles/05-dependency-inversion.md" "Principe d'Inversion des Dépendances"

create_file "$DOC_ROOT/03-core-concepts/03-functional-programming/01-pure-functions.md" "Fonctions Pures"
create_file "$DOC_ROOT/03-core-concepts/03-functional-programming/02-immutability.md" "Immutabilité"
create_file "$DOC_ROOT/03-core-concepts/03-functional-programming/03-composition.md" "Composition de Fonctions"
create_file "$DOC_ROOT/03-core-concepts/03-functional-programming/04-side-effects.md" "Gestion des Effets de Bord"

# 04-architecture-layers
mkdir -p "$DOC_ROOT/04-architecture-layers"
create_file "$DOC_ROOT/04-architecture-layers/01-domain-layer/01-entities.md" "Entités"
create_file "$DOC_ROOT/04-architecture-layers/01-domain-layer/02-value-objects.md" "Objets Valeur"
create_file "$DOC_ROOT/04-architecture-layers/01-domain-layer/03-aggregates.md" "Agrégats"
create_file "$DOC_ROOT/04-architecture-layers/01-domain-layer/04-domain-services.md" "Services Domaine"
create_file "$DOC_ROOT/04-architecture-layers/01-domain-layer/05-domain-events.md" "Événements Domaine"

create_file "$DOC_ROOT/04-architecture-layers/02-application-layer/01-use-cases.md" "Cas d'Utilisation"
create_file "$DOC_ROOT/04-architecture-layers/02-application-layer/02-commands.md" "Commandes"
create_file "$DOC_ROOT/04-architecture-layers/02-application-layer/03-queries.md" "Requêtes"
create_file "$DOC_ROOT/04-architecture-layers/02-application-layer/04-dtos.md" "DTOs"
create_file "$DOC_ROOT/04-architecture-layers/02-application-layer/05-application-services.md" "Services d'Application"

create_file "$DOC_ROOT/04-architecture-layers/03-infrastructure-layer/01-repositories.md" "Repositories"
create_file "$DOC_ROOT/04-architecture-layers/03-infrastructure-layer/02-persistence.md" "Persistance"
create_file "$DOC_ROOT/04-architecture-layers/03-infrastructure-layer/03-external-services.md" "Services Externes"
create_file "$DOC_ROOT/04-architecture-layers/03-infrastructure-layer/04-logging.md" "Logging"
create_file "$DOC_ROOT/04-architecture-layers/03-infrastructure-layer/05-caching.md" "Cache"

create_file "$DOC_ROOT/04-architecture-layers/04-presentation-layer/01-components.md" "Composants Vue.js"
create_file "$DOC_ROOT/04-architecture-layers/04-presentation-layer/02-stores.md" "Stores Pinia"
create_file "$DOC_ROOT/04-architecture-layers/04-presentation-layer/03-composables.md" "Composables"
create_file "$DOC_ROOT/04-architecture-layers/04-presentation-layer/04-routing.md" "Routage"
create_file "$DOC_ROOT/04-architecture-layers/04-presentation-layer/05-layouts.md" "Layouts"

# 05-implementation-patterns
mkdir -p "$DOC_ROOT/05-implementation-patterns"
create_file "$DOC_ROOT/05-implementation-patterns/01-domain-patterns/01-entity-pattern.md" "Pattern Entité"
create_file "$DOC_ROOT/05-implementation-patterns/01-domain-patterns/02-value-object-pattern.md" "Pattern Objet Valeur"
create_file "$DOC_ROOT/05-implementation-patterns/01-domain-patterns/03-aggregate-pattern.md" "Pattern Agrégat"
create_file "$DOC_ROOT/05-implementation-patterns/01-domain-patterns/04-factory-pattern.md" "Pattern Factory"

create_file "$DOC_ROOT/05-implementation-patterns/02-application-patterns/01-cqrs-pattern.md" "Pattern CQRS"
create_file "$DOC_ROOT/05-implementation-patterns/02-application-patterns/02-mediator-pattern.md" "Pattern Médiateur"
create_file "$DOC_ROOT/05-implementation-patterns/02-application-patterns/03-observer-pattern.md" "Pattern Observateur"
create_file "$DOC_ROOT/05-implementation-patterns/02-application-patterns/04-strategy-pattern.md" "Pattern Stratégie"

create_file "$DOC_ROOT/05-implementation-patterns/03-infrastructure-patterns/01-repository-pattern.md" "Pattern Repository"
create_file "$DOC_ROOT/05-implementation-patterns/03-infrastructure-patterns/02-unit-of-work-pattern.md" "Pattern Unit of Work"
create_file "$DOC_ROOT/05-implementation-patterns/03-infrastructure-patterns/03-adapter-pattern.md" "Pattern Adaptateur"
create_file "$DOC_ROOT/05-implementation-patterns/03-infrastructure-patterns/04-facade-pattern.md" "Pattern Façade"

create_file "$DOC_ROOT/05-implementation-patterns/04-presentation-patterns/01-mvvm-pattern.md" "Pattern MVVM"
create_file "$DOC_ROOT/05-implementation-patterns/04-presentation-patterns/02-container-pattern.md" "Pattern Container/Presentational"
create_file "$DOC_ROOT/05-implementation-patterns/04-presentation-patterns/03-provider-pattern.md" "Pattern Provider"
create_file "$DOC_ROOT/05-implementation-patterns/04-presentation-patterns/04-composition-pattern.md" "Pattern Composition"

# 06-best-practices
mkdir -p "$DOC_ROOT/06-best-practices"
create_file "$DOC_ROOT/06-best-practices/01-typescript-practices/01-type-safety.md" "Sécurité des Types"
create_file "$DOC_ROOT/06-best-practices/01-typescript-practices/02-generics.md" "Génériques"
create_file "$DOC_ROOT/06-best-practices/01-typescript-practices/03-decorators.md" "Décorateurs"
create_file "$DOC_ROOT/06-best-practices/01-typescript-practices/04-utility-types.md" "Types Utilitaires"

create_file "$DOC_ROOT/06-best-practices/02-vuejs-practices/01-composition-api.md" "API de Composition"
create_file "$DOC_ROOT/06-best-practices/02-vuejs-practices/02-performance.md" "Performance"
create_file "$DOC_ROOT/06-best-practices/02-vuejs-practices/03-reusability.md" "Réutilisabilité"
create_file "$DOC_ROOT/06-best-practices/02-vuejs-practices/04-state-management.md" "Gestion d'État"

create_file "$DOC_ROOT/06-best-practices/03-testing-strategies/01-unit-testing.md" "Tests Unitaires"
create_file "$DOC_ROOT/06-best-practices/03-testing-strategies/02-integration-testing.md" "Tests d'Intégration"
create_file "$DOC_ROOT/06-best-practices/03-testing-strategies/03-e2e-testing.md" "Tests End-to-End"
create_file "$DOC_ROOT/06-best-practices/03-testing-strategies/04-test-driven-development.md" "TDD"

create_file "$DOC_ROOT/06-best-practices/04-security-guidelines/01-authentication.md" "Authentification"
create_file "$DOC_ROOT/06-best-practices/04-security-guidelines/02-authorization.md" "Autorisation"
create_file "$DOC_ROOT/06-best-practices/04-security-guidelines/03-data-protection.md" "Protection des Données"
create_file "$DOC_ROOT/06-best-practices/04-security-guidelines/04-security-best-practices.md" "Meilleures Pratiques de Sécurité"

# 07-boilerplate-guide
mkdir -p "$DOC_ROOT/07-boilerplate-guide"
create_file "$DOC_ROOT/07-boilerplate-guide/01-setup/01-initial-setup.md" "Configuration Initiale"
create_file "$DOC_ROOT/07-boilerplate-guide/01-setup/02-dependencies.md" "Dépendances"
create_file "$DOC_ROOT/07-boilerplate-guide/01-setup/03-environment-setup.md" "Configuration Environnement"
create_file "$DOC_ROOT/07-boilerplate-guide/01-setup/04-development-workflow.md" "Workflow de Développement"

create_file "$DOC_ROOT/07-boilerplate-guide/02-implementation/01-domain-implementation.md" "Implémentation Domaine"
create_file "$DOC_ROOT/07-boilerplate-guide/02-implementation/02-application-implementation.md" "Implémentation Application"
create_file "$DOC_ROOT/07-boilerplate-guide/02-implementation/03-infrastructure-implementation.md" "Implémentation Infrastructure"
create_file "$DOC_ROOT/07-boilerplate-guide/02-implementation/04-presentation-implementation.md" "Implémentation Présentation"

create_file "$DOC_ROOT/07-boilerplate-guide/03-testing/01-test-setup.md" "Configuration des Tests"
create_file "$DOC_ROOT/07-boilerplate-guide/03-testing/02-test-implementation.md" "Implémentation des Tests"
create_file "$DOC_ROOT/07-boilerplate-guide/03-testing/03-test-coverage.md" "Couverture de Tests"
create_file "$DOC_ROOT/07-boilerplate-guide/03-testing/04-test-automation.md" "Automatisation des Tests"

create_file "$DOC_ROOT/07-boilerplate-guide/04-deployment/01-build-process.md" "Processus de Build"
create_file "$DOC_ROOT/07-boilerplate-guide/04-deployment/02-deployment-strategies.md" "Stratégies de Déploiement"
create_file "$DOC_ROOT/07-boilerplate-guide/04-deployment/03-monitoring.md" "Monitoring"
create_file "$DOC_ROOT/07-boilerplate-guide/04-deployment/04-maintenance.md" "Maintenance"

echo "Structure de documentation créée avec succès dans $DOC_ROOT"
