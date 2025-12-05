import { ChangeDetectorRef, Component } from '@angular/core';
import MenuItems from './menuItems';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { MenuService } from '../../services/menu-service';
import { StorageService } from '../../services/storage-service';
import { displayHTML } from '../../commons/utils';
import { ProjectService } from '../../services/project-service';
import { UserProfileComponent } from '../user-profile-component/user-profile-component';

@Component({
  selector: 'app-menu-component',
  imports: [UserProfileComponent],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css'
})
export class MenuComponent {
  menuItems = MenuItems.items;

  constructor(private router: Router, private userService: UserService, public menuService: MenuService, private storageService: StorageService, private cdr: ChangeDetectorRef, public projectService: ProjectService) {
    console.log('Menu component initialized: '+this.menuItems.length + ' items loaded');
  
  }
  
  ngOnInit(): void {
    console.log('Menu componentrr OnInit');

    let last_path_title = this.storageService.getItem('last_path_title');
    //if(last_path_title)
      //this.menuService.setPathPage(last_path_title);    

  }

  logout() 
  {
    this.userService.logout();
    console.log('User logged out');
    this.router.navigate(['login']);
  }

  launchOption(item: any) 
  {
    console.log('Launching option:', item.name);

    if(item.id == 'logout') 
    {
      this.storageService.removeItem('last_path');
      this.storageService.removeItem('last_path_title');
      this.logout();
    }else if(item.is_action == true && item.router != '-') 
    {
      this.storageService.setItem('last_path', item.router);
      this.storageService.setItem('last_path_title', item.title);
      this.router.navigate([item.router]);
      this.menuService.setPathPage(item.title);
    }
  }

}
