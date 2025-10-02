import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',  
  templateUrl: './navbar.component.html',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent { 
  // ✅ Signals go here as class properties
  isMenuOpen = signal<boolean>(false);
  cartItemCount: number = 0; //placeholder for cart badge

  
  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}

