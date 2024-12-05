# Configuration de l'Environnement de Développement 🛠️

## Prérequis Système 🖥️

Avant de commencer l'installation, assurez-vous que votre système répond aux exigences suivantes :

### Configuration Matérielle Recommandée
- CPU : 2 cœurs minimum
- RAM : 4 GB minimum
- Espace disque : 10 GB minimum disponible

### Système d'Exploitation
- Linux (recommandé) :
  - Debian 12
  - Ubuntu 24.04 LTS
  - Linux Mint 22
- WSL2 pour Windows (alternative possible)

### Logiciels Requis
- Git 2.43+
- Un terminal moderne (exemple : Gnome Terminal, Konsole)
- VSCode ou Cursor IDE
- Un navigateur web moderne (Firefox, Chrome)

> 💡 **Note**: Cette documentation est basée sur un environnement Linux. Si vous utilisez Windows, nous recommandons fortement l'utilisation de WSL2 (Windows Subsystem for Linux) pour une meilleure compatibilité.

## Introduction

Tout comme la construction d'une maison nécessite un atelier bien équipé et des outils appropriés, la mise en place d'un environnement de développement TypeScript requiert une préparation minutieuse. Nous allons configurer tous les outils essentiels pour construire notre application. 🏗️

## Installation de Node.js et npm 📦

### 1. Installation de Node.js 🏗️

Tout comme la fondation est la première étape cruciale dans la construction d'une maison solide, Node.js constitue la base fondamentale de notre environnement de développement TypeScript. Nous allons utiliser `nvm` (Node Version Manager) qui, tel un chef de chantier, nous permettra de gérer facilement différentes versions de Node.js.

#### A. Installation de nvm 🛠️

```bash
# Installation de nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Rechargement des variables d'environnement
source ~/.bashrc  # Pour Bash
# ou
source ~/.zshrc   # Pour Zsh
```

#### B. Installation de Node.js LTS 📦

```bash
# Installation de la dernière version LTS (Long Term Support)
nvm install --lts

# Ou spécifiquement la version 22.12.0 (recommandée pour ce projet)
nvm install 22.12.0
nvm use 22.11.0

# Vérification de l'installation
node --version  # Devrait afficher v22.12.0
npm --version   # Vérifie la version de npm v10.9.0
```

#### C. Installation et configuration de pnpm 📦

Tout comme un artisan choisit ses meilleurs outils, nous utiliserons pnpm comme gestionnaire de paquets moderne pour ses avantages en termes de performances et d'efficacité de stockage.

```bash
# Installation de pnpm via npm
npm install -g pnpm@latest

# Vérification de l'installation
pnpm --version  # Devrait afficher 9.14.4 ou supérieur

# Configuration de pnpm (optionnel)
pnpm config set store-dir ~/.pnpm-store  # Définir le répertoire de stockage

# Configuration de l'environnement shell
pnpm setup  # Configurer pnpm pour l'utilisateur

# Installation des dépendances globales via pnpm
pnpm add -g typescript@5.7.2 ts-node@10.9.2 @types/node@22.10.1
```

> 💡 **Note**: pnpm offre une meilleure gestion de l'espace disque grâce à son système de stockage partagé, comme un entrepôt bien organisé où chaque outil n'est stocké qu'une seule fois.

> 🚀 **Avantages de pnpm**:
> - Installation plus rapide des dépendances
> - Meilleure utilisation de l'espace disque
> - Prévention des conflits de dépendances
> - Support natif des workspaces pour les monorepos

#### D. Vérification de l'environnement 🔍

```bash
# Vérification complète de l'installation
which node      # Localisation de l'exécutable Node.js
which npm       # Localisation de l'exécutable npm
which pnpm      # Localisation de l'exécutable pnpm
node -v         # Version de Node.js
npm -v          # Version de npm
pnpm -v         # Version de pnpm
tsc -v          # Version de TypeScript
```

Cette configuration de base nous fournit l'équivalent d'une fondation solide sur laquelle nous pourrons construire notre application TypeScript. La prochaine étape sera la configuration détaillée de notre projet, que vous trouverez dans le guide d'installation.

## Prochaines Étapes 🎯

Pour continuer la construction de notre "maison" logicielle, consultez :

1. [Guide d'Installation Détaillé](./02-installation.md) 📚
   - Configuration complète de TypeScript
   - Structure du projet
   - Installation des dépendances
   - Configuration des outils de développement

> 💡 **Note**: Comme un architecte prépare ses plans avant la construction, assurez-vous d'avoir bien compris la configuration de l'environnement avant de passer à l'installation du projet.

## Résumé des Points Clés ✨

- ✅ Installation de Node.js via nvm
- ✅ Configuration de pnpm comme gestionnaire de paquets
- ✅ Vérification de l'environnement
- 🔄 Préparation pour la configuration du projet

La fondation est maintenant prête ! Passons à la construction de notre application en suivant le [guide d'installation](./02-installation.md).
