import { Component } from '@angular/core';
import MenuItems from './menuItems';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-menu-component',
  imports: [],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css'
})
export class MenuComponent {
menuItems = MenuItems.items;


  constructor(private router: Router, private userService: UserService) {
    console.log('Menu component initialized: '+this.menuItems.length + ' items loaded');
  
  }
  ngOnInit(): void {
    
  }

  logout() {
    this.userService.logout();
    console.log('User logged out');
    this.router.navigate(['login']);
    // Redirect to login page or perform other actions as needed
  }

  launchOption(item: any) {
    console.log('Launching option:', item.name);
    switch(item.id) {
      case 'map':
        this.router.navigate(['map']);
      break;
      case 'dashboard':
        this.router.navigate(['dashboard']);
        break;
      case 'properties_list':
        this.router.navigate(['properties/list']);
        break;
      case 'properties_add':
        this.router.navigate(['properties/create']);
        break;
      case 'properties_separate':
        this.router.navigate(['properties/separate']);
        break;
      case 'settings':
        this.router.navigate(['settings']);
        break;
      case 'create_link':
        this.router.navigate(['links/create']);
      break;
      case 'clients_create':
        this.router.navigate(['clients/create']);
      break;
      case 'clients_list':
        this.router.navigate(['clients/list']);
      break;
      case 'logout':
        this.logout();
        break;
      default:
        console.warn('No action defined for item:', item.id);    
    } 
  }
}
