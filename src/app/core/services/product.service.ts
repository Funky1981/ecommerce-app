import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { Product } from "../models/product.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
     providedIn: 'root'
})
export class ProductService {    
    private cache = new Map<string, Product|Product[]>();
    private apiUrl = 'https://fakestoreapi.com';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {       
        const cacheKey = 'all'; 
        if (this.cache.has(cacheKey)) {
            return of(this.cache.get(cacheKey) as Product[]); // Return cached data
        }
        return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
            tap(products => {
                this.cache.set(cacheKey, products); // Cache the data
                products.forEach(product => {
                    this.cache.set(`product-${product.id}`, product);
                });
            })
        );
    }

    getProductById(id: number): Observable<Product> {
        const cacheKey = `product-${id}`;
        if (this.cache.has(cacheKey)) {
            return of(this.cache.get(cacheKey) as Product);
        }
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
            tap(product => this.cache.set(cacheKey, product))
        );
    }
}
