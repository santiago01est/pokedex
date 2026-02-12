import { describe, it, expect } from 'vitest';
import { validateSearch } from '../../utils/validation';

describe('validateSearch', () => {
    it('should return isValid true for empty input', () => {
        const result = validateSearch('');
        expect(result.isValid).toBe(true);
        expect(result.value).toBe('');
    });

    it('should return isValid false for input less than 3 characters', () => {
        const result = validateSearch('pi');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe('Escribe al menos 3 caracteres');
    });

    it('should return isValid true for input with 3 or more characters', () => {
        const result = validateSearch('pik');
        expect(result.isValid).toBe(true);
        expect(result.error).toBe(null);
    });

    it('should sanitize input by removing special characters', () => {
        const result = validateSearch('pika!');
        expect(result.value).toBe('pika');
    });

    it('should keep alphanumeric characters and spaces', () => {
        const result = validateSearch('mega charizard x');
        expect(result.value).toBe('mega charizard x');
        expect(result.isValid).toBe(true);
    });
});
