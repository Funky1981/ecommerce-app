import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { Product } from "../models/product.interface";
import { HttpClient } from "@angular/common/http";
import { Cache } from "./cache.service";

/**
 * ProductService - Manages product data with type-safe caching
 * 
 * Caching Strategy:
 * - allProductsCache: Holds ALL products together (Cache<Product[]>)
 * - productCaches: Map where each product ID has its own cache (Map<number, Cache<Product>>)
 * 
 * Benefits:
 * - Type safe: No union types or type casting needed
 * - Efficient: Avoids redundant API calls
 * - Flexible: Can cache all products OR individual products
 */
@Injectable({
     providedIn: 'root'
})


export class ProductService {    
    /**
     * Cache for ALL products fetched together
     * Type: Cache<Product[]> means it holds an ARRAY of products
     */
    private allProductsCache = new Cache<Product[]>();
    
    /**
     * Map of individual product caches
     * Key: Product ID (number)
     * Value: Cache holding THAT specific product
     * 
     * Example structure:
     * {
     *   1 → Cache{ data: product1 },
     *   5 → Cache{ data: product5 },
     *   10 → Cache{ data: product10 }
     * }
     */
    private productCaches = new Map<number, Cache<Product>>();
    
    private apiUrl = 'https://fakestoreapi.com';

    constructor(private http: HttpClient) { }

    /**
     * Get All Products (with dual-level caching)
     * 
     * Caching Flow:
     * 1. Check if ALL products are cached
     * 2. If yes → return cached data instantly ⚡
     * 3. If no → fetch from API, then cache BOTH:
     *    - All products together (allProductsCache)
     *    - Each individual product (productCaches Map)
     * 
     * Result: Future calls to getProducts() OR getProductById() are instant!
     */
    getProducts(): Observable<Product[]> {       
        // Check if we already have all products cached
        if (this.allProductsCache.has()) {
            return of(this.allProductsCache.get()!); // Return cached data (no HTTP call!)
        }
        
        // Not cached yet, fetch from API
        return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
            tap(products => {
                // Cache all products together
                this.allProductsCache.set(products);
                
                // ALSO cache each individual product separately
                // This makes getProductById() instant too!
                products.forEach(product => {
                    const productCache = new Cache<Product>();
                    productCache.set(product);
                    this.productCaches.set(product.id, productCache);
                });
            })
        );
    }

    /**
     * Get Single Product by ID (with cache lookup)
     * 
     * Caching Flow:
     * 1. Look for THIS specific product's cache in the Map
     * 2. If found AND has data → return cached product ⚡
     * 3. If not found → fetch from API, then cache it
     * 
     * Note: This product might already be cached if user called getProducts() first!
     * 
     * @param id - The product ID to fetch
     */
    getProductById(id: number): Observable<Product> {
        // Step 1: Get the cache for THIS specific product ID
        const productCache = this.productCaches.get(id);
        
        // Step 2: Check if cache exists AND has data
        if (productCache && productCache.has()) {
            return of(productCache.get()!);  // Return cached product (no HTTP call!)
        }
        
        // Not cached yet, fetch from API
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
            tap(product => {
                // Create new cache for this product
                const newCache = new Cache<Product>();
                newCache.set(product);
                // Store in Map with product ID as key
                this.productCaches.set(id, newCache);
            })
        );
    }
}
