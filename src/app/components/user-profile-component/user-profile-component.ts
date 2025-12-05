import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-component',
  imports: [],
  templateUrl: './user-profile-component.html',
  styleUrl: './user-profile-component.css'
})
export class UserProfileComponent implements OnInit {
  user: any = null;
  showDropdown: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.user = this.userService.getUser();
    if (!this.user) {
      // Si no hay usuario, redirigir al login
      this.router.navigate(['/login']);
    }
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {
    this.showDropdown = false;
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    // Implementar navegación al perfil si existe
    console.log('Ir al perfil del usuario');
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.showDropdown) {
      this.showDropdown = false;
    }
  }

  onProfileClick(event: Event): void {
    event.stopPropagation();
    this.toggleDropdown();
  }
}