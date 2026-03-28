import axios from 'axios';

/**
 * Normalises any error thrown by Axios (or otherwise) into a plain string
 * that is safe to display in the UI.
 *
 * Priority order:
 *  1. Backend `detail` field  (DRF‑style)
 *  2. Backend `message` field
 *  3. Backend `non_field_errors[0]`
 *  4. First value of the first key in a validation error object
 *  5. Axios network / status message
 *  6. Generic fallback
 */
export function parseError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (data) {
      if (typeof data === 'string') return data;

      if (data.detail) return String(data.detail);
      if (data.message) return String(data.message);

      if (Array.isArray(data.non_field_errors) && data.non_field_errors.length > 0) {
        return String(data.non_field_errors[0]);
      }

      // Validation errors: { field: ["msg"] }
      const firstKey = Object.keys(data)[0];
      if (firstKey) {
        const val = data[firstKey];
        if (Array.isArray(val) && val.length > 0) return `${firstKey}: ${val[0]}`;
        if (typeof val === 'string') return `${firstKey}: ${val}`;
      }
    }

    if (error.message) return error.message;
  }

  if (error instanceof Error) return error.message;

  return 'An unexpected error occurred. Please try again.';
}
