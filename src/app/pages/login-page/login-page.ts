import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../components/loader-component/loader-component';
import { LoaderService } from '../../services/loader-service';
import { UserService } from '../../services/user-service';
import { StorageService } from '../../services/storage-service';
import { Router } from '@angular/router';
import { tooglePasswordVisibility } from '../../commons/controls';
import { ProjectService } from '../../services/project-service';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login-service';
import { ProjectSelectorComponent } from "../../components/project-selector-component/project-selector-component";
import { displayHTML, visibilityHTML } from '../../commons/utils';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, LoaderComponent, ProjectSelectorComponent],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPage {
tempUser: any;
  loginForm : FormGroup;
  username: FormControl;
  password: FormControl;

  launchVerificationCode: boolean;

  //@ViewChild(VerificationCodeComponent) verificationCodeChild: VerificationCodeComponent | undefined;

  constructor(private renderer: Renderer2, private loaderService: LoaderService, private userService: UserService, private cdr: ChangeDetectorRef, private storageService: StorageService, private router: Router, public projectService: ProjectService, private loginService: LoginService) {
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

    this.showProjectSelector(false);
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
        this.onSubmit();
      }
      return;
      }
    }
  }

  onSubmit()
  {
    if(this.loginForm.valid) {
      this.loaderService.show();

      this.loginService.auth(this.loginForm.value, (response: any, success: boolean) => {
        if(success) {
          console.log('Login successful', response);
          this.tempUser = response.result.user;

          this.userService.setTempUser(this.tempUser);
          this.projectService.fill(response.result.projects);

          this.loaderService.hide();

          if(this.userService.confirmLogin())
          {
            //this.doDashboard();
            this.loginForm.reset();
            //this.showProjectSelector(true);
            displayHTML('container-form', 'none');
            this.projectService.showPanel = true;
            visibilityHTML('project-selector', 'visible');
          } 
          
          /*
          if(this.verificationCodeChild)
          {
              this.verificationCodeChild.sendVerificationCode({ user: this.tempUser });
          }*/

          this.cdr.detectChanges(); // Trigger change detection to update the view
        }else 
        {
          console.error('Error creating property');
          Swal.fire("¡Datos incorrectos!");
        }
        
        this.loaderService.hide();
      });
    }
  }

  /*
  handleSubmit() 
  {
    if(this.loginForm.valid) {
      this.loaderService.show();

      const loginData = this.loginForm.value;

      this.userService.login(loginData).subscribe({
        next: (response) => 
          {          
            console.log('Login successful', response);
            this.tempUser = response.result.user;
            //console.log('TempUser', this.tempUser);

            this.userService.setTempUser(this.tempUser);
            this.projectService.fill(response.result.projects);

            //this.storageService.setItem('vendorsList', JSON.stringify(response.result.vendorsList));

            this.loaderService.hide();

            if(this.userService.confirmLogin())
            {
              this.doDashboard();
            } 
            
            //fin quitar paso direct

            this.cdr.detectChanges(); // Trigger change detection to update the view
          },
        error: (error) => 
        {
          //Swal.fire("¡Datos incorrectos!");
          this.loaderService.hide();
          console.error('Login failed', error);
          alert('Error al iniciar');
          
          this.loginForm.reset();
          this.renderer.selectRootElement('#i_username').focus();
          this.cdr.detectChanges();
        }
      });
    }
  }
  */

  doDashboard() 
  {
    this.router.navigate(['/dashboard']);
  }



  showProjectSelector(visible: boolean)
  {
    if(visible)
    {
      displayHTML('container-form', 'none');
      displayHTML('project-selector', 'block');
    }else
    {
      this.loginForm.reset();
      displayHTML('project-selector', 'none');
      displayHTML('container-form', 'block');
    }
  }
}
