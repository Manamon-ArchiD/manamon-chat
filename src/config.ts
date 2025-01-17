export const config = {
  API_PORT: 3000,
  POSTGRES_HOST: process.env.POSTGRES_HOST ?? 'localhost',
  POSTGRES_USER: process.env.POSTGRES_USER ?? "manamon",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? "manamon",
  POSTGRES_DB: process.env.POSTGRES_DB ?? "manamon",
  POSTGRES_PORT: 5432,
}