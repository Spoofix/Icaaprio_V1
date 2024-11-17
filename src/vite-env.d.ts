/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_ADMIN: string;
  readonly VITE_CACHE_DURATION: string;
  readonly VITE_MAX_CACHE_SIZE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}