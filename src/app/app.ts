import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './services/user-service';
import { StorageService } from './services/storage-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('prom-full-ang-ii');

  constructor(public userService: UserService, private router: Router, private storageService: StorageService){
   /*if(this.storageService.getItem('user') != undefined) {
        this.router.navigate(['dashboard']);

    }else
    {
      console.log('User not logged in');
      this.router.navigate(['login']);
    }*/

      if(this.userService.isLoggedIn())
      {
          this.router.navigate(['dashboard']);
      }else
      {
          console.log('User not logged in');
          this.router.navigate(['login']);
      } 
  }
}
