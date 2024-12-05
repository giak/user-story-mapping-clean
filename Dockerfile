# Étape de build
FROM node@sha256:c0a3badbd8a0a760de903e00cedbca94588e609299820557e72cba2a53dbaa2c AS builder

# Installation de pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copie des fichiers de configuration
COPY package.json pnpm-lock.yaml ./
COPY .npmrc ./

# Installation des dépendances
RUN pnpm install

# Copie du code source
COPY . .

# Build de l'application
RUN pnpm build

# Étape de production
FROM nginx@sha256:86e53c4c16a6a276b204b0fd3a8143d86547c967dc8258b3d47c3a21bb68d3c6

# Copie des fichiers de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuration de nginx pour le SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
