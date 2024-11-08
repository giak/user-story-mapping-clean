import { fileURLToPath, URL } from "node:url"
import { resolve } from "path"
import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import checker from "vite-plugin-checker"
import { visualizer } from "rollup-plugin-visualizer"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Chargement des variables d environnement
  const env = loadEnv(mode, process.cwd())

  return {
    root: process.cwd(),
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true
        }
      }),
      vueDevTools(),
      VueI18nPlugin({
        include: resolve(__dirname, "./src/locales/**"),
        strictMessage: true,
        escapeHtml: true
      }),
      checker({
        // Uniquement TypeScript et Vue
        typescript: true,
        vueTsc: true
      }),
      visualizer()
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@domain": fileURLToPath(new URL("./src/contexts/*/domain", import.meta.url)),
        "@application": fileURLToPath(new URL("./src/contexts/*/application", import.meta.url)),
        "@infrastructure": fileURLToPath(new URL("./src/contexts/*/infrastructure", import.meta.url)),
        "@presentation": fileURLToPath(new URL("./src/contexts/*/presentation", import.meta.url)),
        "@shared": fileURLToPath(new URL("./src/shared", import.meta.url))
      },
      extensions: [".js", ".json", ".ts", ".tsx", ".vue"]
    },

    // Configuration du serveur de développement
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      open: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },

    // Configuration de la construction
    build: {
      target: "esnext",
      outDir: "dist",
      assetsDir: "assets",
      cssCodeSplit: true,
      sourcemap: true,
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: {
            "vue-vendor": ["vue", "vue-router", "pinia"],
            "ui-vendor": ["primevue", "primeicons"],
            "utils-vendor": ["@vueuse/core", "date-fns"]
          }
        }
      },
      chunkSizeWarningLimit: 1000
    },

    // Configuration des tests
    test: {
      include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
      environment: "happy-dom",
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        reportsDirectory: "./coverage"
      }
    },

    // Configuration de la prévisualisation
    preview: {
      port: 4173,
      strictPort: true,
      host: true,
      open: true
    },

    // Configuration des optimisations
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core",
        "date-fns"
      ],
      exclude: ["@intlify/vue-i18n"]
    }
  }
})
