import { Component } from '@angular/core';
import MenuItems from './menuItems';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-menu-component',
  imports: [],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css'
})
export class MenuComponent {
  menuItems = MenuItems.items;

  constructor(private router: Router, private userService: UserService, public menuService: MenuService) {
    console.log('Menu component initialized: '+this.menuItems.length + ' items loaded');
  
  }
  ngOnInit(): void {
    
  }

  logout() {
    this.userService.logout();
    console.log('User logged out');
    this.router.navigate(['login']);
  }

  launchOption(item: any) {
    console.log('Launching option:', item.name);

    if(item.id == 'logout') {
      this.logout();
    }else if(item.is_action == true && item.router != '-') 
      {
      this.router.navigate([item.router]);
      this.menuService.setPathPage(item.title);
    }
  }
}
