# Clean Architecture avec Vue.js et TypeScript 🏗️

## Introduction

La `Clean Architecture` 🏛️ est née de la volonté d'appliquer quatre principes fondamentaux du développement logiciel : la séparation des préoccupations (SoC) 🔄, les principes SOLID 🛠️, l'indépendance vis-à-vis des frameworks 🚀, et le Domain-Driven Design (DDD) 🎯.
Elle vise également à répondre aux défis de flexibilité et de maintenabilité 🔧, en permettant aux applications de s'adapter aux évolutions technologiques sans impacter la logique métier.
Cette approche architecturale structure le code en couches distinctes, chacune ayant une responsabilité unique et clairement définie 🎯.
En plaçant la logique métier au centre et en s'appuyant sur les concepts du DDD pour modéliser le domaine (contexte), elle facilite la collaboration interdisciplinaire 🤝, favorise la testabilité ✅, et optimise la réutilisabilité des composants ♻️.
En limitant les effets de bord et la dette technique, la Clean Architecture crée des applications robustes 💪, testables 🧪, et évolutives 📈, prêtes à répondre aux besoins spécifiques et complexes de chaque projet.

Bien qu'il n'existe pas de modèle unique, la `Clean Architecture` propose des principes adaptables selon la complexité et les besoins spécifiques de chaque projet.

La `Clean Architecture` s'appuie sur quatre principes fondamentaux :
1. **Séparation des Préoccupations** (SoC)
2. **Principes SOLID**
3. **Indépendance Technologique**
4. **Domain-Driven Design** (DDD) - Partiellement

![La Clean Architecture](./cleanArchitecture.svg)


### Méthodologies de développement et Clean Architecture 🏗️

> ⚠️ Prenez bien connaissance de ce qui suit.
> ⛔ J'insiste sur ce point car c'est un sujet très important.

La Clean Architecture intègre tout un écosystème de méthodologies complémentaires.
Elle représente une approche architecturale avancée qui nécessite une expertise approfondie et une maîtrise de multiples concepts.
Cela exige :
- 🎓 Une solide expérience en conception logicielle.
- 🧠 Une compréhension approfondie des design patterns.
- 🎯 Une maîtrise des principes SOLID et DDD (patterns tactiques).
- 🔮 Une capacité à anticiper les évolutions du système.
- 📊 Visualiser les interactions entre les couches et sous couches.

> 🚨  **ATTENTION** : Sans ces compétences, vous ne serez pas capable de distribuer les responsabilités par couche, imaginer leur interactions et la complexité de la conception.

⚠️ **Important** : Cette architecture n'est pas adaptée à tous les contextes ni à toutes les équipes.

Sa complexité initiale et sa courbe d'apprentissage importante nécessitent :
- 👥 Une équipe expérimentée
- 📚 Un investissement significatif en formation
- ✨ Un engagement fort dans la qualité du code
- 🎯 Une vision claire des bénéfices à long terme



#### Voici les différentes méthodologies qui sont en lien avec la Clean Architecture :

**Conception & Analyse** 📋
- User Story Mapping
- Domain Driven Design (DDD)
- Event Modeling (BDD)
- API-First Design

**Architecture & Design** 🏛️
- ⭐ `Clean Architecture` ⭐ <====================== Nous sommes là
- Principes SOLID
- CQRS Pattern
- Microservices

**DevOps & Sécurité** 🔒
- DevOps : Intégration de la sécurité dans le cycle DevOps
- Test Driven Development (TDD)
- Security by Design
- Validation système
- Retour d'expérience

**Qualité & Tests** ✅
- Automatisation des tests
- Intégration continue (CI)
- Déploiement continu (CD)

![](./all-methodologies.svg)


## Structure Simplifiée de la Clean Architecture 🎯

```mermaid
---
config:
  theme: base
  look: classic
---
flowchart TB
    subgraph Presentation["️ Presentation Layer"]
        direction TB
        UI["Vue Components"]
        Store["State Management<br>(Pinia)"]
        Composables["Vue Composables"]
        I18n["Localization"]
        Mixins["Mixins & Transitions"]
    end

    subgraph Application["⚙️ Application Layer"]
        direction TB
        UseCases["Use Cases"]
        DTOs["DTOs"]
        Ports["Ports"]
        CQRS["Commands & Queries"]
        AppServices["Application Services"]
    end

    subgraph Domain["💎 Domain Layer"]
        direction TB
        Entities["Entities"]
        ValueObjects["Value Objects"]
        Repositories["Repository Interfaces"]
        DomainEvents["Errors & Events"]
        DomainServices["Policies & Services"]
    end

    subgraph Infrastructure["🔧 Infrastructure Layer"]
        direction TB
        RepoImpl["Repository Implementations"]
        ExternalServices["External Services"]
        Adapters["Adapters & Persistence"]
    end

    %% Connexions entre les couches
    UI --> Store
    Store --> UseCases
    UseCases --> Entities
    RepoImpl --> Repositories

    %% Styles
    classDef presentation fill:#C8E6C9,stroke:#2E7D32,stroke-width:2px
    classDef application fill:#BBDEFB,stroke:#1565C0,stroke-width:2px
    classDef domain fill:#FFE0B2,stroke:#EF6C00,stroke-width:2px
    classDef infrastructure fill:#F8BBD0,stroke:#C2185B,stroke-width:2px

    %% Application des styles
    class UI,Store,Composables,I18n,Mixins presentation
    class UseCases,DTOs,Ports,CQRS,AppServices application
    class Entities,ValueObjects,Repositories,DomainEvents,DomainServices domain
    class RepoImpl,ExternalServices,Adapters infrastructure

    %% Styles des subgraphs
    style Presentation fill:#E8F5E9,stroke:#2E7D32,stroke-width:2px
    style Application fill:#E3F2FD,stroke:#1565C0,stroke-width:2px
    style Domain fill:#FFF3E0,stroke:#EF6C00,stroke-width:2px
    style Infrastructure fill:#FCE4EC,stroke:#C2185B,stroke-width:2px
```

> 📚 Pour une vue détaillée de chaque couche, consultez les diagrammes spécifiques :
> - [Diagramme détaillé de la couche Présentation](../02-layers/01-presentation-layer.md)
> - [Diagramme détaillé de la couche Application](../02-layers/02-application-layer.md)
> - [Diagramme détaillé de la couche Domaine](../02-layers/03-domain-layer.md)
> - [Diagramme détaillé de la couche Infrastructure](../02-layers/04-infrastructure-layer.md)

## Description des Couches 🏢

### 1. Couche Présentation (Presentation Layer) 🖥️
- **Composants Vue.js**
  - Interface utilisateur
  - Gestion des événements
  - Rendu des données
- **Stores Pinia**
  - État de l'application
  - Actions et mutations
  - Persistance locale
- **Composables Vue**
  - Logique réutilisable
  - Gestion des effets
  - Abstraction des comportements
- **Localisation**
  - Traductions spécifiques au contexte
- **Mixins et Transitions**
  - Logique partagée et animations

### 2. Couche Application (Application Layer) ⚙️
- **Use Cases**
  - Orchestration des opérations
  - Validation des entrées
  - Gestion des erreurs
- **DTOs**
  - Transfert de données
  - Validation des structures
  - Mapping des données
- **Ports**
  - Interfaces des services
  - Contrats d'intégration
  - Points d'extension
- **Commandes et Requêtes**
  - CQRS pour les opérations d'état et de lecture
- **Services Applicatifs**
  - Coordination de la logique métier

### 3. Couche Domaine (Domain Layer) 💎
- **Entités**
  - Objets métier
  - Règles de validation
  - Comportements métier
- **Value Objects**
  - Objets immuables
  - Validation intrinsèque
  - Encapsulation des valeurs
- **Interfaces Repository**
  - Contrats de persistance
  - Opérations de données
  - Abstraction du stockage
- **Erreurs et Événements**
  - Gestion des erreurs spécifiques et communication
- **Politiques et Services**
  - Règles métier et logique complexe

### 4. Couche Infrastructure (Infrastructure Layer) 🔧
- **Implémentations Repository**
  - Persistance des données
  - Cache et optimisation
  - Gestion des transactions
- **Services Externes**
  - Intégrations API
  - Services cloud
  - Systèmes externes
- **Adaptateurs et Persistance**
  - Adaptation des services externes et gestion des données


![La Clean Architecture](./cleanLayers.svg)

## Flux de Données 🔄

> 📚 Ce diagramme présente le flux de données général entre les couches. Pour des flux plus détaillés, consultez :
> - [Flux détaillés de la couche Application](../02-layers/02-application-layer.md#diagramme-de-séquence)

```mermaid
sequenceDiagram
    participant UI as Interface Utilisateur
    participant Store as Gestion d'État
    participant App as Couche Application
    participant Domain as Couche Domaine
    participant Infra as Couche Infrastructure

    Note over UI,Infra: Flux Typique d'une Action Utilisateur

    UI->>Store: 1. Action Utilisateur
    Store->>App: 2. Exécution Use Case
    App->>Domain: 3. Logique Métier
    Domain->>Infra: 4. Opération de Données
    Infra-->>Domain: 5. Résultat
    Domain-->>App: 6. Résultat Métier
    App-->>Store: 7. Mise à jour État
    Store-->>UI: 8. UI Actualisée

    Note over UI,Infra: Les étapes peuvent varier selon le cas d'utilisation
```


## Avantages ✅

1. **Maintenabilité** 🛠️
   - Code organisé et modulaire
   - Responsabilités bien définies
   - Facilité de modification

2. **Testabilité** 🧪
   - Tests unitaires simplifiés
   - Mocking facilité
   - Couverture optimale

3. **Évolutivité** 📈
   - Changements technologiques simples
   - Ajout de fonctionnalités facilité
   - Refactoring sécurisé

4. **Indépendance** 🔓
   - Framework comme détail
   - Logique métier protégée
   - Infrastructure flexible

## Inconvénients et Défis ⚠️

1. **Complexité Initiale** 📚
   - Courbe d'apprentissage importante
   - Structure de projet plus élaborée
   - Nombre accru de fichiers et d'interfaces

2. **Surcharge de Développement** ⏳
   - Plus de code à écrire initialement
   - Création de nombreuses interfaces
   - Temps de développement initial plus long

3. **Risques de Sur-ingénierie** ⚖️
   - Tentation de créer trop d'abstractions
   - Complexité potentiellement inutile pour petits projets
   - Besoin d'équilibrer flexibilité et simplicité

4. **Défis d'Équipe** 👥
   - Nécessite une compréhension partagée
   - Formation des nouveaux développeurs
   - Discipline dans le respect de l'architecture

5. **Contraintes Techniques** 🔍
   - Overhead de performance potentiel
   - Mapping fréquent entre les couches
   - Gestion plus complexe de l'état

![La Clean Architecture pour et contre](./forAgainst.svg)

## Pour résumer 📝

La Clean Architecture, combinée avec Vue.js et TypeScript, offre une base solide pour développer des applications robustes et maintenables.
La séparation des préoccupations garantit que chaque partie du code a une responsabilité unique et claire, facilitant ainsi le développement, les tests et la maintenance à long terme.

## Pour la suite 🔜



Nous allons nous préoccuper pour la suite de cette architecture :

```mermaid
---
config:
  layout: elk
  rankdir: TB
---
graph TB
    %% Styles
    classDef domain fill:#f9f,stroke:#333,stroke-width:2px
    classDef application fill:#bbf,stroke:#333,stroke-width:2px
    classDef infrastructure fill:#bfb,stroke:#333,stroke-width:2px
    classDef presentation fill:#fbb,stroke:#333,stroke-width:2px
    classDef shared fill:#ddd,stroke:#333,stroke-width:2px
    classDef store fill:#ff9,stroke:#333,stroke-width:2px
    style SharedLayer fill:#ddd
    style DomainLayer fill:#BBDEFB
    style ApplicationLayer fill:#FFF9C4
    style InfrastructureLayer fill:#E1BEE7
    style PresentationLayer fill:#C8E6C9
    style StoreLayer fill:#C8E6C9

    %% Domain Layer
    subgraph DomainLayer["Domain Layer"]
        subgraph Entities["Entities"]
            User["User"]
            Story["Story"]
            Epic["Epic"]
        end

        subgraph ValueObjects["Value Objects"]
            Email["Email"]
            StoryPoints["StoryPoints"]
            Priority["Priority"]
        end

        subgraph DomainServices["Domain Services"]
            StoryService["StoryService"]
            UserService["UserService"]
        end

        subgraph Repositories["Repository Interfaces"]
            IStoryRepo["IStoryRepository"]
            IUserRepo["IUserRepository"]
        end

        subgraph Specifications["Specifications"]
            UserEligibility["UserEligibility"]
            StoryFilter["StoryFilter"]
        end

        subgraph UseCases["Use Cases"]
            CreateStory["CreateStory"]
            UpdateStory["UpdateStory"]
            DeleteStory["DeleteStory"]
        end
    end

    %% Application Layer
    subgraph ApplicationLayer["Application Layer"]
        subgraph AppServices["Application Services"]
            StoryAppService["StoryApplicationService"]
            UserAppService["UserApplicationService"]
        end

        subgraph DTOs["DTOs"]
            StoryDTO["StoryDTO"]
            UserDTO["UserDTO"]
        end

        subgraph Events["Events"]
            StoryCreated["StoryCreatedEvent"]
            UserUpdated["UserUpdatedEvent"]
        end

        subgraph Factories["Factories"]
            StoryFactory["StoryFactory"]
            UserFactory["UserFactory"]
        end

        subgraph Ports["Ports"]
            IEmailService["IEmailService"]
            IStorageService["IStorageService"]
        end
    end

    %% Infrastructure Layer
    subgraph InfrastructureLayer["Infrastructure Layer"]
        subgraph RepoImpl["Repository Implementations"]
            StoryRepoImpl["StoryRepositoryImpl"]
            UserRepoImpl["UserRepositoryImpl"]
        end

        subgraph API["API"]
            HttpClient["HttpClient"]
            ApiService["ApiService"]
        end

        subgraph Adapters["Adapters"]
            EmailAdapter["EmailServiceAdapter"]
            StorageAdapter["StorageServiceAdapter"]
        end

        subgraph Persistence["Persistence"]
            LocalStorage["LocalStorageService"]
            IndexedDB["IndexedDBService"]
        end

        subgraph Security["Security"]
            Auth["AuthService"]
            Jwt["JwtService"]
        end
    end

    %% Presentation Layer
    subgraph PresentationLayer["Presentation Layer"]
        subgraph Components["Components"]
            StoryCard["StoryCard"]
            UserProfile["UserProfile"]
        end

        subgraph Views["Views"]
            StoryBoard["StoryBoardView"]
            UserDashboard["UserDashboardView"]
        end

        subgraph Composables["Composables"]
            UseStory["useStory"]
            UseUser["useUser"]
        end

        subgraph Forms["Forms"]
            StoryForm["StoryForm"]
            UserForm["UserForm"]
        end
    end

    %% Store Layer
    subgraph StoreLayer["Store Layer"]
        subgraph GlobalStore["Global Stores"]
            AppStore["AppStore"]
            ErrorStore["ErrorStore"]
        end

        subgraph ContextStore["Context Stores"]
            StoryStore["StoryStore"]
            UserStore["UserStore"]
        end
    end

    %% Shared Layer
    subgraph SharedLayer["Shared Layer"]
        subgraph SharedUtils["Utils"]
            DateUtils["DateUtils"]
            ValidationUtils["ValidationUtils"]
        end

        subgraph SharedTypes["Types"]
            CommonTypes["CommonTypes"]
            ApiTypes["ApiTypes"]
        end
    end

    %% Relations principales
    Components --> Composables
    Views --> Components
    Composables --> ContextStore
    ContextStore --> AppServices
    AppServices --> UseCases
    UseCases --> Repositories
    RepoImpl --> IStoryRepo
    RepoImpl --> IUserRepo
    StoryAppService --> DTOs
    UserAppService --> DTOs
    API --> Adapters
    Adapters --> Ports

    %% Relations avec la couche partagée
    SharedLayer -.-> DomainLayer
    SharedLayer -.-> ApplicationLayer
    SharedLayer -.-> InfrastructureLayer
    SharedLayer -.-> PresentationLayer
    SharedLayer -.-> StoreLayer

    %% Application des styles
    class User,Story,Epic,Email,StoryPoints,Priority,StoryService,UserService,IStoryRepo,IUserRepo,UserEligibility,StoryFilter,CreateStory,UpdateStory,DeleteStory domain
    class StoryAppService,UserAppService,StoryDTO,UserDTO,StoryCreated,UserUpdated,StoryFactory,UserFactory,IEmailService,IStorageService application
    class StoryRepoImpl,UserRepoImpl,HttpClient,ApiService,EmailAdapter,StorageAdapter,LocalStorage,IndexedDB,Auth,Jwt infrastructure
    class StoryCard,UserProfile,StoryBoard,UserDashboard,UseStory,UseUser,StoryForm,UserForm presentation
    class AppStore,ErrorStore,StoryStore,UserStore store
    class DateUtils,ValidationUtils,CommonTypes,ApiTypes shared
```
