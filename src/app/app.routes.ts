import { Routes } from '@angular/router';

export const routes: Routes = [
    // home route - redirect to products
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
    },
    // products feature (lazy loaded)
    {
        path: 'products',
        loadComponent: () => import('./features/products/products-list/products-list.component').then(m => m.ProductsListComponent)
    },
    // // cart feature (lazy loaded)
    // {
    //     path: 'cart',
    //     loadComponent: () => import('./features/cart/cart-page/cart-page.component').then(m => m.CartPageComponent)
    // },
    // // auth routes (lazy loaded)
    // {
    //     path: 'login',
    //     loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    // },
    // // signup route (lazy loaded)
    // {
    //     path: 'signup',
    //     loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent)
    // },
    // wildcard route - redirect to products
    {
        path: '**',
        redirectTo: '/products',
        pathMatch: 'full'
    }
];
