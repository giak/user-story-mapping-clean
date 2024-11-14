/**
 * Configuration Vite pour le projet Clean Architecture Vue 3
 * Implémente les meilleures pratiques pour le développement, la construction et les tests
 *
 * @module vite.config
 */

import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import vue from "@vitejs/plugin-vue"
import autoprefixer from 'autoprefixer'
import { fileURLToPath, URL } from "node:url"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import tailwindcss from 'tailwindcss'
import { defineConfig, loadEnv } from "vite"
import checker from "vite-plugin-checker"
import vueDevTools from "vite-plugin-vue-devtools"
/**
 * Configuration Vite avec support des variables d'environnement
 * @param {ConfigEnv} options - Options de configuration Vite
 * @returns {UserConfigExport} Configuration Vite
 */
export default defineConfig(({ mode }) => {
  // Chargement sécurisé des variables d'environnement
  const env = loadEnv(mode, process.cwd(), "");

  return {
    root: process.cwd(),

    // Plugins essentiels pour le développement Vue.js
    plugins: [
      vue({
        script: {
          defineModel: true, // Support des modèles réactifs Vue 3
          propsDestructure: true // Destructuration des props pour une meilleure DX
        }
      }),
      vueDevTools(), // Outils de développement Vue.js

      // Configuration i18n avec sécurité renforcée
      VueI18nPlugin({
        include: resolve(__dirname, "./src/locales/**"),
        strictMessage: true, // Validation stricte des messages
        escapeHtml: true // Protection XSS
      }),

      // Vérification statique TypeScript et Vue
      checker({
        typescript: true,
        vueTsc: true
      }),

      // Analyse des bundles pour l'optimisation
      visualizer()
    ],

    // Alias de chemins pour une architecture propre
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@domain": fileURLToPath(new URL("./src/contexts/*/domain", import.meta.url)),
        "@application": fileURLToPath(new URL("./src/contexts/*/application", import.meta.url)),
        "@infrastructure": fileURLToPath(new URL("./src/contexts/*/infrastructure", import.meta.url)),
        "@presentation": fileURLToPath(new URL("./src/contexts/*/presentation", import.meta.url)),
        "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
      },
      extensions: [".js", ".json", ".ts", ".tsx", ".vue"]
    },

    // Configuration du serveur de développement avec sécurité
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      open: false,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },

    // Optimisation de la construction pour la production
    build: {
      target: "esnext",
      outDir: "dist",
      assetsDir: "assets",
      cssCodeSplit: true,
      sourcemap: true,
      minify: "esbuild",
      rollupOptions: {
        output: {
          // Séparation intelligente des chunks pour optimiser le chargement
          manualChunks: {
            "vue-vendor": ["vue", "vue-router", "pinia"],
            "ui-vendor": ["primevue", "primeicons"],
            "utils-vendor": ["@vueuse/core", "date-fns"]
          }
        }
      },
      chunkSizeWarningLimit: 1000
    },

    // Configuration des tests unitaires et de couverture
    test: {
      include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
      environment: "happy-dom",
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        reportsDirectory: "./coverage"
      }
    },

    // Configuration de la prévisualisation de production
    preview: {
      port: 4173,
      strictPort: true,
      host: true,
      open: true
    },

    // Optimisation des dépendances
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core",
        "date-fns"
      ],
      exclude: ["@intlify/vue-i18n"]
    },

    // Configuration PostCSS avec Tailwind
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer(),
        ],
      },
    },
  }
})
