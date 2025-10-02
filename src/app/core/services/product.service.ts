import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { Product } from "../models/product.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
     providedIn: 'root'
})
export class ProductService {    
    private cache = new Map<string, Product[]>();
    private apiUrl = 'https://fakestoreapi.com';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {        
        if (this.cache.has('all')) {
            return of(this.cache.get('all')!);
            }
        return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
            tap(products => this.cache.set('all', products))
        );
    }
}
        
    

