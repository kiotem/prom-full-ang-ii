import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../services/client-service';
import { LoaderService } from '../../services/loader-service';
import { displayHTML } from '../../commons/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-create-component',
  imports: [ReactiveFormsModule],
  templateUrl: './client-create-component.html',
  styleUrl: './client-create-component.css'
})
export class ClientCreateComponent {
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
    console.log('ClientCreate component initialized');  
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

    onSubmit(): void 
    {
      if(this.clientForm.valid) 
          {
            this.loaderService.show();

            this.clientService.create(this.clientForm.value, (data: any, success: boolean) => {
              if(success) {
                console.log('Client created successfully:', data);
                //alert('Propiedad creada exitosamente');
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'Cliente creado exitosamente'
                });
      
                displayHTML('property-create-component', 'none');
      
                this.clientForm.reset();
      
                //refrescar listado
              } else {
                console.error('Error creating property');
                alert('Error al crear la propiedad');
              }
              
              this.loaderService.hide();
            });
          }else{
            console.error('Form is invalid');
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor llena los campos requeridos'
            });
            
            //
          }
    }

    onCancel(): void {
      displayHTML('client-create-component', 'none');
    }


}
