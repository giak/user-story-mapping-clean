import { z } from 'zod';

// Schéma de validation pour les variables d'environnement
const envSchema = z.object({
  MODE: z.enum(['development', 'production', 'test']).default('development'),
  BASE_URL: z.string().default('/'),
  VITE_APP_TITLE: z.string().default('Vue App'),
  VITE_API_URL: z.string().url().optional(),
  VITE_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  VITE_MAX_LOGS: z.number().int().positive().default(1000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Type des variables d'environnement
export type Env = z.infer<typeof envSchema>;

// Fonction pour charger et valider les variables d'environnement
export function loadEnvConfig(): Env {
  try {
    const env = {
      MODE: import.meta.env.MODE,
      BASE_URL: import.meta.env.BASE_URL,
      VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
      VITE_API_URL: import.meta.env.VITE_API_URL,
      VITE_LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL,
      VITE_MAX_LOGS: Number(import.meta.env.VITE_MAX_LOGS),
      NODE_ENV: process.env.NODE_ENV,
    };

    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Environment validation failed:', error.errors);
    }
    throw new Error('Failed to load environment configuration');
  }
}

// Configuration singleton
export class EnvConfig {
  private static instance: Env;

  static getInstance(): Env {
    if (!EnvConfig.instance) {
      EnvConfig.instance = loadEnvConfig();
    }
    return EnvConfig.instance;
  }
} 