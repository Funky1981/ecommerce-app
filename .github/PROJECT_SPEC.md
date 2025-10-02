# 🛍 PROJECT_SPEC.md — Angular E-Commerce App

This file is the **master project specification** for the Angular E-Commerce app.  

## 📋 Related Documentation

- **[PROJECT_ROADMAP.md](../PROJECT_ROADMAP.md)** — Development checklist and learning objectives
- **[copilot-instructions.md](.github/copilot-instructions.md)** — Angular/TypeScript coding standards & best practices
- **[learning-style-global.md](.github/learning-style-global.md)** — Chris's learning preferences for AI explanations
- **[developer.chatmode.md](.github/chatmodes/developer.chatmode.md)** — Custom Copilot commands for this project
- **[README.md](../README.md)** — Public-facing portfolio documentation (to be updated)

---

## 🚀 Project Overview

Build a production-ready, **enterprise-grade** e-commerce application using **Angular** that demonstrates clean architecture, industry design patterns, and professional best practices. This project is specifically designed to be **interview-ready and portfolio-worthy**, showcasing the skills expected in senior developer positions, with a working MVP completed within **2 weeks**.

**MVP goals:** product catalog, product detail, shopping cart, authentication, checkout, and order history.  
**Enterprise features:** ITCSS + BEM architecture, responsive design, TypeScript strict mode, professional testing coverage.  
**Optional / Stretch:** admin dashboard, reviews, wishlist, NgRx state, SSR with Angular Universal.

---

## 🎯 Core Features (MVP)

1. **Product Catalog**
   - Product grid with image, title, price, rating
   - Search and filtering (category, price)
   - Product detail page (`/products/:id`)

2. **Shopping Cart**
   - Add / remove / update quantity
   - Live subtotal and total
   - Cart state stored in a service using RxJS (`BehaviorSubject`)
   - Cart badge in navbar

3. **Authentication**
   - Login & signup (Reactive Forms)
   - JWT-based flow (JSON Server + JWT or Firebase Auth)
   - Persist token (localStorage) and auto-logout on expiry
   - Protected routes (checkout, profile, admin)

4. **Checkout & Orders**
   - Checkout form (address, payment placeholder)
   - Order persistence in backend or mock store
   - Order confirmation page
   - User profile with past orders

5. **Polish**
   - Responsive UI
   - Error handling & notifications
   - Deploy to Netlify / Firebase Hosting

---

## 🚀 Optional Features (Nice-to-have)

- Admin dashboard (product CRUD + sales charts)
- Reviews & ratings, wishlist
- NgRx for state management (cart, auth, products)
- Angular Universal (SSR) for SEO
- Real payment integration (Stripe sandbox)
- E2E tests (Cypress)

---

## 🏗 Architecture Overview

- **Clean Architecture** — Core/Shared/Features separation with enterprise-grade organization
- **ITCSS + BEM** — 7-layer CSS architecture with Block Element Modifier naming conventions
- **Core Module** — singleton services, guards, interceptors (AuthService, ProductService, CartService, OrderService, HttpInterceptor, AuthGuard)
- **Shared Module** — reusable UI components (ProductCard, Navbar, Loader), pipes, directives
- **Feature Modules** — domain modules lazy-loaded: Products, Cart, Auth, Checkout, Profile, Admin
- **Services as Facades** — components interact with services; services handle API/logic
- **RxJS** — reactive state with `BehaviorSubject` / Observables for cart & auth
- **Enterprise Standards** — TypeScript strict mode, responsive design, cross-browser compatibility

---

## 📂 Project Scaffold (Folder Structure)

```plaintext
ecommerce-app/
│
├── PROJECT_SPEC.md        # This file - internal spec for Copilot/devs
├── README.md              # Public-facing portfolio README
├── angular.json
├── package.json
├── tsconfig.json
│
└── src/
    ├── index.html
    ├── main.ts
    └── app/
        ├── app.module.ts
        ├── app-routing.module.ts
        │
        ├── core/                     # Singleton services & global features
        │   ├── guards/
        │   │   └── auth.guard.ts
        │   ├── interceptors/
        │   │   └── auth.interceptor.ts
        │   ├── services/
        │   │   ├── auth.service.ts
        │   │   ├── product.service.ts
        │   │   ├── cart.service.ts
        │   │   └── order.service.ts
        │   └── core.module.ts
        │
        ├── shared/                   # Reusable components, pipes, directives
        │   ├── components/
        │   │   ├── navbar/
        │   │   │   ├── navbar.component.ts
        │   │   │   └── navbar.component.html
        │   │   ├── product-card/
        │   │   │   ├── product-card.component.ts
        │   │   │   └── product-card.component.html
        │   │   └── loader/
        │   │       ├── loader.component.ts
        │   │       └── loader.component.html
        │   └── shared.module.ts
        │
        ├── features/                 # Domain-specific feature modules
        │   ├── products/
        │   │   ├── product-list/
        │   │   │   ├── product-list.component.ts
        │   │   │   └── product-list.component.html
        │   │   ├── product-detail/
        │   │   │   ├── product-detail.component.ts
        │   │   │   └── product-detail.component.html
        │   │   ├── products-routing.module.ts
        │   │   └── products.module.ts
        │   │
        │   ├── cart/
        │   │   ├── cart-page/
        │   │   │   ├── cart-page.component.ts
        │   │   │   └── cart-page.component.html
        │   │   ├── cart-routing.module.ts
        │   │   └── cart.module.ts
        │   │
        │   ├── auth/
        │   │   ├── login/
        │   │   │   ├── login.component.ts
        │   │   │   └── login.component.html
        │   │   ├── signup/
        │   │   │   ├── signup.component.ts
        │   │   │   └── signup.component.html
        │   │   ├── auth-routing.module.ts
        │   │   └── auth.module.ts
        │   │
        │   ├── checkout/
        │   │   ├── checkout-page/
        │   │   │   ├── checkout-page.component.ts
        │   │   │   └── checkout-page.component.html
        │   │   ├── order-summary/
        │   │   │   ├── order-summary.component.ts
        │   │   │   └── order-summary.component.html
        │   │   ├── checkout-routing.module.ts
        │   │   └── checkout.module.ts
        │   │
        │   ├── profile/
        │   │   ├── user-profile/
        │   │   │   ├── user-profile.component.ts
        │   │   │   └── user-profile.component.html
        │   │   ├── order-history/
        │   │   │   ├── order-history.component.ts
        │   │   │   └── order-history.component.html
        │   │   ├── profile-routing.module.ts
        │   │   └── profile.module.ts
        │   │
        │   └── admin/ (optional bonus)
        │       ├── product-crud/
        │       │   ├── product-crud.component.ts
        │       │   └── product-crud.component.html
        │       ├── sales-dashboard/
        │       │   ├── sales-dashboard.component.ts
        │       │   └── sales-dashboard.component.html
        │       ├── admin-routing.module.ts
        │       └── admin.module.ts
        │
        └── assets/
            └── (images, mock data, etc.)
```

---

## 🛠 Key Concepts & Patterns

### Enterprise Angular Patterns

#### **🏗️ Component Architecture**

- **Standalone Components**: Always use standalone components over NgModules
- **OnPush Change Detection**: Set `changeDetection: ChangeDetectionStrategy.OnPush` for performance
- **Signal-Based State**: Use `signal()`, `computed()`, and modern reactive primitives
- **Input/Output Functions**: Use `input()` and `output()` functions instead of decorators
- **Query Migration**: Use `viewChild()`, `contentChild()` instead of decorators

#### **🎨 Template Best Practices**

- **Modern Control Flow**: Use `@if`, `@for`, `@switch` instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- **Native Bindings**: Use `[style]` and `[class]` instead of `ngStyle` and `ngClass`
- **Proper Tracking**: Always use proper `track` expressions in `@for` loops for performance
- **Self-Closing Tags**: Use self-closing syntax `<component />` where appropriate

#### **🔧 Service & Dependency Injection**

- **Inject Function**: Use `inject()` function instead of constructor injection
- **ProvidedIn Root**: Use `providedIn: 'root'` for singleton services
- **Service Facades**: Services should hide implementation details and provide clean APIs
- **Observable Patterns**: Return Observables from services, handle subscriptions in components

#### **🛡️ Security & Performance**

- **Static Security Attributes**: Never bind to security-sensitive attributes like `sandbox`
- **Lazy Loading**: Implement lazy-loaded feature modules for performance
- **Bundle Optimization**: Use self-closing tags and tree-shaking optimizations
- **Memory Management**: Properly unsubscribe from Observables to prevent memory leaks

#### **📋 Code Quality Standards**

- **TypeScript Strict Mode**: Enable strict type checking and avoid `any`
- **Consistent Return Types**: Use single return types in guards/resolvers
- **Enum Usage**: Use enums/constants instead of string literals for routes and statuses
- **Intermediate Constants**: Extract complex expressions into named constants
- **Proper Comments**: Explain the "why" not the "what" in code comments

### Lazy Loading

Load feature modules on demand to reduce the initial bundle size. Use `loadChildren` in `app-routing.module.ts`.

Example:

```ts
{
  path: 'cart',
  loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule)
}
```

### DRY — Don’t Repeat Yourself

- Centralize repeated logic in services rather than duplicating in components.
- Use shared components, pipes, and directives instead of copy-pasting UI or logic.

### Angular Design Patterns

- **Service Pattern:** business logic in services (ProductService, CartService, AuthService)  
- **Observer Pattern:** RxJS `BehaviorSubject` / Observables for reactive state updates (cart, auth)  
- **Facade Pattern:** services provide a simple API to components while hiding implementation details / API calls  
- **Interceptor Pattern:** HTTP interceptors for attaching tokens and global error handling  
- **Module Pattern:** Core / Shared / Feature modules for separation of concerns  
- **Dependency Injection:** Angular DI to decouple components from implementations

---

## 🎨 UX Design Principles (User Experience)

_These are about how a product feels to use — the overall journey of the user._

- **User-Centered Design** – Always design with the user’s needs, goals, and context in mind.  
- **Clarity** – Make the purpose of each page, feature, or step obvious.  
- **Consistency** – Use predictable patterns so users don’t have to relearn things.  
- **Accessibility** – Ensure people of all abilities (e.g., vision, mobility, cognitive) can use the product.  
- **Feedback** – Give users clear responses to their actions (loading indicators, success/error messages).  
- **Efficiency** – Minimize steps and reduce friction to help users achieve tasks quickly.  
- **Error Prevention & Recovery** – Prevent mistakes where possible and make errors easy to fix.  
- **Simplicity** – Remove unnecessary complexity; every element should serve a purpose.

---

## 🎨 UI Design Principles (User Interface)

_These are about how a product looks and interacts visually._

- **Visual Hierarchy** – Use size, color, and spacing to show what’s most important.  
- **Consistency** – Reuse design patterns, typography, and colors for familiarity.  
- **Contrast & Legibility** – Text and elements must be easy to read and distinguish.  
- **Alignment & Spacing** – Clean layouts improve readability and reduce clutter.  
- **Affordance** – Design elements should hint at how they’re used (e.g., buttons look clickable).  
- **Feedback & Interactivity** – Hover states, animations, and transitions show users that the system is responding.  
- **Scalability & Responsiveness** – Designs should adapt to different screen sizes and devices.  
- **Aesthetic Usability Effect** – Attractive, polished visuals build trust and make the product feel easier to use.

---

## 📋 Development Guidelines (Coding & Process)

- Keep components **lean** — push logic and state to services.  
- Use **Reactive Forms** (FormBuilder) for login, signup, and checkout with validation.  
- Protect sensitive pages with **Route Guards** (AuthGuard).  
- Use **HTTP Interceptors** for token handling & global error handling.  
- Use **lazy-loaded feature modules** for performance.  
- Follow **DRY**: centralize repeated logic.  
- Add unit tests for services & critical components; add e2e tests for the main user flows.  
- Use GitHub Actions (or similar) for CI: lint → test → build → deploy.

**2-week roadmap (MVP-first)**:

- Week 1: Project scaffold, Core module, Shared components, Products feature, Cart feature  
- Week 2: Auth, Checkout, Profile, polish, testing, deploy  
- Stretch: Admin, NgRx, SSR

---

## ✅ Deliverables & Success Criteria

- `PROJECT_SPEC.md` and `README.md` at repo root.  
- Working Angular app implementing MVP features.  
- Lazy-loaded feature modules and clear Core/Shared separation.  
- Cart implemented as reactive state via a service (BehaviorSubject).  
- Auth implemented (mock or Firebase) with guards and interceptors.  
- Deployed demo link (Netlify / Firebase Hosting).  
- Unit tests for services; at least one e2e test for add-to-cart → checkout.  
- Architecture diagram (Mermaid or image) included in repo.  
- Clean README for interviewers with screenshots & run instructions.

---

## 🔧 Notes for GitHub Copilot / Contributors

- Use the folder scaffold and naming conventions above.  
- Keep feature modules focused (single responsibility) and lazy-load them via routing.  
- Keep component templates minimal — heavy lifting should be in services.  
- Document design pattern choices in code comments and in README (e.g., why a service is a facade).

---

## 📦 Quick Start (for README)

Include a README with these essentials:

- Short project summary and live demo link  
- Tech stack & architecture summary  
- Setup instructions: `npm install` → `ng serve`  
- How to run tests: `ng test`, `ng e2e`  
- Notes on mock backend / environment variables for API

---

## 📚 References

- [Angular official docs](https://angular.io)
- [Fake Store API for quick product data](https://fakestoreapi.com)
- [JSON Server + JWT for mock auth](https://github.com/typicode/json-server)

---
