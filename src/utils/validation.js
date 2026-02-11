/**
 * Validates and sanitizes pokemon search input
 * @param {string} input - The raw search string
 * @returns {Object} result - Validation result
 * @returns {string} result.value - Sanitized value
 * @returns {boolean} result.isValid - Whether it meets length requirements
 * @returns {string|null} result.error - Error message if invalid
 */
export const validateSearch = (input) => {
    // 1. Sanitize: Remove special characters to prevent malformed queries
    // Only allow letters, numbers, and spaces
    const sanitized = input.replace(/[^a-zA-Z0-9\s]/g, '');

    if (sanitized.length === 0) {
        return { value: '', isValid: true, error: null };
    }

    // 2. Length validation: At least 3 characters
    if (sanitized.length > 0 && sanitized.length < 3) {
        return {
            value: sanitized,
            isValid: false,
            error: 'Escribe al menos 3 caracteres'
        };
    }

    return { value: sanitized, isValid: true, error: null };
};
