interface ImportMetaEnv {
  // Add environment variables here
  readonly VITE_SERVER_URL: string
  // You can add more variables if needed, e.g.,
  // readonly VITE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}