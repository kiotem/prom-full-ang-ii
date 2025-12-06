import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from '../../services/loader-service';
import { LinkService } from '../../services/link-service';
import { displayHTML } from '../../commons/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-link-create-component',
  imports: [ReactiveFormsModule],
  templateUrl: './link-create-component.html',
  styleUrl: './link-create-component.css'
})
export class LinkCreateComponent {
  @Output() linkCreatedAction = new EventEmitter<any>();

  linkForm: FormGroup;
  amount: FormControl;
  currency: FormControl;
  concept: FormControl;
  clientName: FormControl;
  clientEmail: FormControl;
  propertyCode: FormControl;
  expirationDays: FormControl;
  platform: FormControl;

  constructor(public loaderService: LoaderService, private linkService: LinkService) {
    console.log('LinkCreate component initialized');  
    
    this.amount = new FormControl('', [Validators.required, Validators.min(1)]);
    this.currency = new FormControl('COP', [Validators.required]);
    this.concept = new FormControl('', [Validators.required]);
    this.clientName = new FormControl('', [Validators.required]);
    this.clientEmail = new FormControl('', [Validators.required, Validators.email]);
    this.propertyCode = new FormControl('', [Validators.required]);
    this.expirationDays = new FormControl(7, [Validators.required, Validators.min(1), Validators.max(30)]);
    this.platform = new FormControl('Wompi', [Validators.required]);

    this.linkForm = new FormGroup({
      amount: this.amount,
      currency: this.currency,
      concept: this.concept,
      clientName: this.clientName,
      clientEmail: this.clientEmail,
      propertyCode: this.propertyCode,
      expirationDays: this.expirationDays,
      platform: this.platform
    });
  }

  onSubmit(): void {
    if(this.linkForm.valid) {
      this.loaderService.show();
      
      const formData = this.linkForm.value;
      
      // Crear objeto de venta temporal para el link
      const saleObject = {
        amount: formData.amount,
        currency: formData.currency,
        concept: formData.concept,
        client: {
          name: formData.clientName,
          email: formData.clientEmail
        },
        propertyCode: formData.propertyCode
      };
      
      // Crear objeto Wompi
      const wompiObject = {
        platform: formData.platform,
        expirationDays: formData.expirationDays
      };
      
      /*
      this.linkService.save(saleObject, wompiObject, (response, success) => {
        this.loaderService.hide();
        
        if(success) {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Link de pago creado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          
          this.linkForm.reset();
          this.linkForm.patchValue({
            currency: 'COP',
            expirationDays: 7,
            platform: 'Wompi'
          });
          
          this.linkCreatedAction.emit(response);
          displayHTML('link-create-component', 'none');
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo crear el link de pago. Intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
      */
    } else {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor complete todos los campos requeridos.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }

  onCancel(): void {
    this.linkForm.reset();
    this.linkForm.patchValue({
      currency: 'COP',
      expirationDays: 7,
      platform: 'Wompi'
    });
    displayHTML('link-create-component', 'none');
  }
}
