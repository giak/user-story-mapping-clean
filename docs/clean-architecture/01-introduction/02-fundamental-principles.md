# Principes Fondamentaux de Clean Architecture 🏛️

![Les principes fondamentaux](./fundamentalPrinciples.svg)

## 1. Indépendance des Frameworks 🔄

- L'architecture ne dépend pas de l'existence d'une bibliothèque ou framework 🎯
- Vue.js, Pinia et autres outils sont considérés comme des détails qui peuvent être remplacés 🔧
- La logique métier reste stable indépendamment des choix technologiques ⚡

## 2. Testabilité 🧪

- La logique métier peut être testée sans UI, base de données ou serveur web ✅
- Les tests unitaires sont simples et rapides à exécuter ⚡
- Possibilité de mocker facilement les dépendances externes 🎭

## 3. Indépendance de l'UI 🖥️

- L'interface utilisateur peut changer facilement sans modifier la logique métier 🔄
- Possibilité de créer différentes interfaces (web, mobile, CLI) sur la même base 📱
- Séparation claire entre la présentation et la logique 🎯

## 4. Indépendance de la Base de Données 💾

- La logique métier n'est pas liée à une base de données spécifique 🔓
- Possibilité de changer de système de stockage sans impacter le domaine 🔄
- Abstraction de la persistance via des interfaces 🎭

## 5. Indépendance des Services Externes 🌐

- Le cœur de l'application ne dépend pas des services externes 🛡️
- Les intégrations sont des détails d'implémentation remplaçables 🔄
- Utilisation d'interfaces pour abstraire les dépendances externes 🎭

## Règles de Dépendance 📋

1. **Règle de Dépendance Entrante** ⬅️
   - Les dépendances pointent vers l'intérieur
   - Les couches externes dépendent des couches internes
   - Le domaine ne dépend de rien d'autre

2. **Inversion de Dépendance** 🔄
   - Utilisation d'interfaces pour découpler les couches
   - Les implémentations dépendent des abstractions
   - Les détails dépendent des politiques

3. **Communication Entre Couches** 🔁
   - Utilisation de DTOs pour le transfert de données 📦
   - Events pour la communication asynchrone ⚡
   - Interfaces pour l'inversion de contrôle 🎯
