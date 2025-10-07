import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { CartItem } from "../models/cart-item.interface";
import { Product } from "../models/product.interface";

/**
 * CartService - Manages shopping cart state using reactive programming
 * 
 * Key Concepts:
 * - BehaviorSubject: Holds current cart state and notifies subscribers of changes
 * - Immutability: Always creates NEW arrays/objects instead of modifying existing ones
 * - Computed Observables: Automatically calculate values when cart changes
 */
@Injectable({
    providedIn: 'root'  // One instance shared across entire app (singleton pattern)
})
export class CartService {    
    /**
     * PRIVATE State Container (Internal Use Only)
     * - BehaviorSubject: Can emit new values AND store current value
     * - Initial value: [] (empty cart)
     * - Type: CartItem[] (array of cart items)
     * - Only CartService can call .next() to update this
     */
    private cartSubject = new BehaviorSubject<CartItem[]>([]);
    
    /**
     * PUBLIC Observable Stream (Read-Only for Components)
     * - Components subscribe to this to get cart updates
     * - .asObservable() prevents external code from calling .next()
     * - This is called "encapsulation" - hiding internal state
     * 
     * Usage in component: this.cartService.cart$.subscribe(items => {...})
     */
    cart$ = this.cartSubject.asObservable();

    /**
     * Computed Observable: Total Item Count
     * - Automatically recalculates whenever cart$ emits new data
     * - .pipe() creates a data transformation pipeline
     * - map() transforms the array into a single number
     * - .reduce() sums up all quantities
     * 
     * Example: [{qty: 2}, {qty: 3}] → 5
     * 
     * Usage in component: this.cartService.itemCount$ | async
     */
    itemCount$ = this.cart$.pipe(
        map(items => items.reduce((total, item) => total + item.quantity, 0))
    );

    /**
     * Computed Observable: Total Price
     * - Automatically recalculates whenever cart$ emits new data
     * - Multiplies each item's price × quantity, then sums all
     * 
     * Example: 
     * [{price: 10, qty: 2}, {price: 5, qty: 3}] 
     * → (10 × 2) + (5 × 3) 
     * → 20 + 15 
     * → 35
     * 
     * Usage in component: this.cartService.totalPrice$ | async
     */
    totalPrice$ = this.cart$.pipe(
        map(items => items.reduce((total, item) => total + item.product.price * item.quantity, 0))
    );

    /**
     * Add Product to Cart (or increase quantity if already exists)
     * 
     * IMMUTABILITY RULES:
     * - NEVER modify existing objects/arrays directly
     * - ALWAYS create NEW objects/arrays with spread operator (...)
     * - This ensures Angular's change detection works correctly
     * 
     * @param product - The product to add
     * @param quantity - How many to add (default: 1)
     */
    addToCart(product: Product, quantity: number) {
        // Step 1: Get current cart state from BehaviorSubject
        // .value gives us the current array without subscribing
        const currentItems = this.cartSubject.value;
        
        // Step 2: Check if product already exists in cart
        // .find() searches array and returns first match (or undefined)
        const existingItems = currentItems.find(item => item.product.id === product.id);
        
        if (existingItems) {
            // SCENARIO A: Product exists - increase quantity
            
            // ✅ CORRECT: Use .map() to create NEW array with NEW objects
            // .map() loops through each item and returns transformed array
            const updatedItems = currentItems.map(item => 
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }  // Spread creates NEW object
                    : item  // Keep other items unchanged
            );
            
            // Emit the NEW array - all subscribers get notified
            this.cartSubject.next(updatedItems);
            
            // ❌ WRONG APPROACH (what we fixed):
            // existingItems.quantity += quantity;  // Mutates existing object!
            // this.cartSubject.next([...currentItems]);  // Still contains mutated object
            
        } else {
            // SCENARIO B: Product doesn't exist - add new item
            
            // Create new CartItem object
            const newItem: CartItem = { product, quantity };
            
            // Spread operator (...) creates NEW array containing:
            // - All items from currentItems
            // - Plus the newItem
            // Example: [item1, item2] + newItem → [item1, item2, newItem]
            this.cartSubject.next([...currentItems, newItem]);
        }
    }

    /**
     * Remove Product from Cart Completely
     * 
     * Uses .filter() to create NEW array without the specified product
     * .filter() keeps only items where condition is TRUE
     * 
     * @param product - The product to remove
     * 
     * Example:
     * Before: [{id: 1}, {id: 5}, {id: 10}]
     * Remove id: 5
     * After:  [{id: 1}, {id: 10}]
     */
    removeFromCart(product: Product) {
        // Get current cart state
        // Note: .getValue() and .value do the same thing
        const currentItems = this.cartSubject.getValue();
        
        // .filter() creates NEW array containing only items where:
        // item.product.id !== product.id (i.e., NOT the product we're removing)
        // This is IMMUTABLE - original array unchanged, new array created
        const updatedItems = currentItems.filter(item => item.product.id !== product.id);
        
        // Emit the NEW array without the removed item
        this.cartSubject.next(updatedItems);
    }

    /**
     * Clear All Items from Cart
     * 
     * Emits empty array [] to reset cart to initial state
     * All subscribers (components) will receive the empty array
     * 
     * Usage: Call this after checkout or when user clicks "Clear Cart"
     */
    clearCart() {
        this.cartSubject.next([]);
    }    
}