import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { ClientService } from '../../../services/client-service';
import { LoaderService } from '../../../services/loader-service';

@Component({
  selector: 'app-clients-create-page',
  imports: [MenuComponent, ProjectSelectorComponent, ReactiveFormsModule, LoaderComponent],
  templateUrl: './clients-create-page.html',
  styleUrls: ['./clients-create-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css']
})
export class ClientsCreatePage {
  clientForm: FormGroup;
  pmsType: FormControl;
  pmsId: FormControl;
  name: FormControl;
  lastName1: FormControl;
  lastName2: FormControl;
  email: FormControl;
  phone: FormControl;
  address: FormControl;
  city: FormControl;
  state: FormControl;

  constructor(public clientService: ClientService, public loaderService: LoaderService) {
    console.log('ClientsCreate component initialized');

    this.pmsId = new FormControl('');
    this.pmsType = new FormControl('CC');
    this.name = new FormControl('');
    this.lastName1 = new FormControl('');
    this.lastName2 = new FormControl('');
    this.email = new FormControl('');
    this.phone = new FormControl('');
    this.address = new FormControl('');
    this.city = new FormControl('');
    this.state = new FormControl(''); 

    this.clientForm = new FormGroup({
      pmsId: this.pmsId,
      pmsType: this.pmsType,
      name: this.name,
      lastName1: this.lastName1,
      lastName2: this.lastName2,
      email: this.email,
      phone: this.phone,
      address: this.address,
      city: this.city,
      state: this.state
    });
  }

    ngOnInit(): void {
    // Initialization logic can go here
    console.log('ClientsCreate component ngOnInit called');
  }

handleSubmit() {

    if(this.clientForm.valid) 
      {

        this.loaderService.show();

        let jsonData = this.clientForm.value;

        console.log('Form submitted', jsonData);
        
        this.clientService.create(jsonData).subscribe({
          next: (response) => {
            console.log('Create successful', response);

            let result = response.result;



            if(result.success) {
              // Handle successful creation
              this.loaderService.hide();

              alert('Cliente creado exitosamente');
              // Reset the form after successful submission
              //this.propertyForm.reset();
              this.clientForm.reset();
              
            }else{
              alert('Error al crear la propiedad: ' + result.message);
            }
          },
          error: (error) => {
            this.loaderService.hide();
            console.error('Create failed', error);
            console.log('Create failed error', error.error.code);
            alert('Error al crear la propiedad: ' + error.error.code);

            // Handle login error, e.g., show an error message
          }
        });
    }else{
      console.error('Form is invalid');
      alert('Por favor llena los campos requeridos');
    }
  }
}
