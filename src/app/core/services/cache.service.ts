
export class Cache<T> {

    private data: T | null = null;
    private timestamp: number | null = null;

    /**
     * Store a value in the cache
     * @param value - The value to cache (type T - determined when Cache is created)
     */
    set(value: T): void {
        this.data = value;
        this.timestamp = Date.now();
    }
    
    /**
     * Retrieve the cached value
     * @returns The cached value, or null if nothing is cached
     */
    get(): T | null {
        return this.data;
    }

    /**
     * Check if cache has a value
     * @returns true if cache contains data, false otherwise
     */
    has(): boolean {
        return this.data !== null;
    }

    /**
     * Clear the cache
     */
    clear(): void {
        this.data = null;
        this.timestamp = null;
    }

    /**
     * Check if cached data is expired
     * @param ttl - Time to live in milliseconds (e.g., 300000 = 5 minutes)
     * @returns true if cache is expired or empty, false if still valid
     */
    isExpired(ttl: number): boolean {
        if (!this.timestamp) {
            return true;  // No data = expired
        }
        return (Date.now() - this.timestamp) > ttl;
    }
}
