export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",     // Nouvelles fonctionnalités
        "fix",      // Corrections de bugs
        "docs",     // Documentation
        "style",    // Changements de style (formatting, etc.)
        "refactor", // Refactoring du code
        "perf",     // Améliorations des performances
        "test",     // Ajout ou modification de tests
        "build",    // Build system ou dépendances externes
        "ci",       // CI configuration
        "chore",    // Autres changements
        "revert"    // Revert un précédent commit
      ]
    ],
    "scope-case": [2, "always", "kebab-case"],
    "subject-case": [2, "always", "sentence-case"],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-case": [2, "always", "lower-case"]
  }
}
