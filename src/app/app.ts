import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './services/user-service';
import { StorageService } from './services/storage-service';
import { BnNgIdleService } from 'bn-ng-idle';
import { ProjectService } from './services/project-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('prom-full-ang-ii');

  constructor(public userService: UserService, private router: Router, private storageService: StorageService, private bnIdle: BnNgIdleService, private projectService: ProjectService){
      if(this.userService.isLoggedIn() && this.projectService.getSelected())
      {
        let last_path = this.storageService.getItem('last_path');
        if(last_path)
          //this.router.navigate([last_path]);
        this.router.navigate(['dashboard']);
        else
          this.router.navigate(['dashboard']);
      }else
      {
          console.log('User not logged in');
          this.router.navigate(['login']);
      }

            //vencimiento en 24 horas
      let expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 24);

      console.log('Expiration Date:', expirationDate.toISOString());
      console.log('Expiration Date:', expirationDate.toLocaleDateString() + ' ' + expirationDate.toLocaleTimeString());
  }

  ngOnInit(): void {
    // Start watching for idle activity with a 600-second (10-minute) timeout
    this.bnIdle.startWatching(600).subscribe((isIdle: boolean) => {
      if (isIdle) {
        console.log('Session expired due to inactivity. Logging out...');
        // Implement your logout logic here, e.g., clear tokens, navigate to login page
        this.router.navigate(['login']); 
        location.reload();
      }
    });
  }
}
