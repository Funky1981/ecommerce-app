import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-products-list',
    standalone: true,
    template: `
        <div class="products-container">
            <h1>Product Catalog</h1>
            <p>Welcome to our store! Products coming soon...</p>
        </div>
    `,
    styles: [`
        .products-container {
            padding: 2rem;
            text-align: center;
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
        }
    `]
})
export class ProductsListComponent  {
    
}