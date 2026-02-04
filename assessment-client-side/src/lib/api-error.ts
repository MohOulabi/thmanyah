import { HTTPError } from 'ky';

export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errorType: string;

  constructor(statusCode: number, errorType: string, message: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorType = errorType;
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }
}

/**
 * Parses an HTTP error response into an ApiError.
 * Falls back to generic error message if parsing fails.
 */
export async function parseApiError(error: unknown): Promise<ApiError> {
  if (error instanceof HTTPError) {
    try {
      const body = (await error.response.json()) as ApiErrorResponse;
      return new ApiError(
        body.statusCode ?? error.response.status,
        body.error ?? 'Unknown Error',
        body.message ?? error.message
      );
    } catch {
      return new ApiError(
        error.response.status,
        error.response.statusText,
        `Request failed with status ${error.response.status}`
      );
    }
  }

  if (error instanceof Error) {
    return new ApiError(0, 'NetworkError', error.message);
  }

  return new ApiError(0, 'UnknownError', 'An unexpected error occurred');
}
