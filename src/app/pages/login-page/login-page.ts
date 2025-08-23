import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../components/loader-component/loader-component';
import { LoaderService } from '../../services/loader-service';
import { UserService } from '../../services/user-service';
import { StorageService } from '../../services/storage-service';
import { Router } from '@angular/router';
import { tooglePasswordVisibility } from '../../commons/controls';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
tempUser: any;
  loginForm : FormGroup;
  username: FormControl;
  password: FormControl;

  launchVerificationCode: boolean;

  //@ViewChild(VerificationCodeComponent) verificationCodeChild: VerificationCodeComponent | undefined;


  constructor(private renderer: Renderer2, private loaderService: LoaderService, private userService: UserService, private cdr: ChangeDetectorRef, private storageService: StorageService, private router: Router) {
    this.launchVerificationCode = false; // Initialize the flag for verification code component
    // Initialize form controls or services if needed
    this.username = new FormControl('');
    this.password = new FormControl('');
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit(): void {
    // Component initialization logic
    this.storageService.clear();
  }

  ngOnDestroy(): void 
  {
    // Cleanup logic if needed
  }
    
  tooglePassword(): void
  {
    const passwordInput = document.getElementById('i_password') as HTMLInputElement;
    tooglePasswordVisibility(passwordInput);  
  }

  onKeydown(event: KeyboardEvent): void 
  {
    const divMessage = document.getElementById('div_message');
    if (divMessage) 
    {
      divMessage.style.display = 'none';
    }
    if (event.key === 'Enter') 
    {
      if(this.password.value === '') {
        console.log('Password is required');
        this.renderer.selectRootElement('#i_password').focus();
      }else
      {
        if(this.loginForm.valid) {
        this.handleSubmit();
      }
      return;
      }
    }
  }

  handleSubmit() 
  {
    if(this.loginForm.valid) {
      this.loaderService.show();

      const loginData = this.loginForm.value;

      this.userService.login(loginData).subscribe({
        next: (response) => 
          {          
            console.log('Login successful', response);
            this.tempUser = response.result;

            this.storageService.setItem('tempUser', JSON.stringify(this.tempUser));

            //this.storageService.setItem('vendorsList', JSON.stringify(response.result.vendorsList));

            this.loaderService.hide();

            //quitar PAso directo
            
            let tempUser = this.storageService.getItem('tempUser');
            if(tempUser)
            {
              this.storageService.setItem('user', tempUser);
              this.storageService.removeItem('tempUser');

              this.doDashboard();
            } 

            //fin quitar paso direct

            /*
            if(this.verificationCodeChild)
            {
                this.verificationCodeChild.sendVerificationCode({ user: this.tempUser });
            }*/

            this.cdr.detectChanges(); // Trigger change detection to update the view
          },
        error: (error) => 
        {
          this.loaderService.hide();
          console.error('Login failed', error);
          alert('¡Datos incorrectos!');
          this.loginForm.reset();
          this.renderer.selectRootElement('#i_username').focus();
        }
      });
    }
  }

  doDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
