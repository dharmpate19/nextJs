export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  // Defaults to localhost for local development
  return `http://localhost:${process.env.PORT ?? 3000}`;
};