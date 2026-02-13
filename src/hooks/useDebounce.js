import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value.
 * Useful for limiting the frequency of API calls or expensive operations
 * while a user is typing in a search bar.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - The delay in milliseconds (default: 500ms)
 * @returns {any} - The debounced value
 */
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set up a timer to update the debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timer if the value changes (or the component unmounts)
        // This is the core of debouncing: it resets the timer on every change
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};
