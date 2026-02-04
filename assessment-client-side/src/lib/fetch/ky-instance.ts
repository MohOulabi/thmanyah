import ky, { type BeforeErrorHook } from 'ky';
import { parseApiError } from '@/lib/api-error';

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

/**
 * Hook to transform HTTP errors into ApiError instances.
 */
const handleApiError: BeforeErrorHook = async error => {
  const apiError = await parseApiError(error);
  // Attach parsed error to the HTTPError for downstream handling
  (error as unknown as { apiError: typeof apiError }).apiError = apiError;
  return error;
};

/**
 * Shared ky instance for API requests.
 * Uses NEXT_PUBLIC_API_URL in the browser; falls back to localhost:8080 in dev.
 */
export const api = ky.create({
  prefixUrl: baseURL.endsWith('/') ? baseURL : `${baseURL}/`,
  timeout: 15_000,
  retry: 1,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  hooks: {
    beforeError: [handleApiError],
  },
});
