import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from '../../services/loader-service';
import { displayHTML } from '../../commons/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-create-component',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-create-component.html',
  styleUrl: './payment-create-component.css'
})
export class PaymentCreateComponent {
  @Output() paymentCreatedAction = new EventEmitter<any>();

  paymentForm: FormGroup;
  amount: FormControl;
  paymentMethod: FormControl;
  description: FormControl;
  clientName: FormControl;
  projectName: FormControl;
  paymentType: FormControl;
  quotaNumber: FormControl;
  reference: FormControl;

  constructor(public loaderService: LoaderService) {
    console.log('PaymentCreate component initialized');  
    
    this.amount = new FormControl('', [Validators.required, Validators.min(0.01)]);
    this.paymentMethod = new FormControl('Efectivo', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.clientName = new FormControl('', [Validators.required]);
    this.projectName = new FormControl('', [Validators.required]);
    this.paymentType = new FormControl('Cuota', [Validators.required]);
    this.quotaNumber = new FormControl('');
    this.reference = new FormControl('', [Validators.required]);

    this.paymentForm = new FormGroup({
      amount: this.amount,
      paymentMethod: this.paymentMethod,
      description: this.description,
      clientName: this.clientName,
      projectName: this.projectName,
      paymentType: this.paymentType,
      quotaNumber: this.quotaNumber,
      reference: this.reference
    });
  }

  onSubmit(): void {
    if(this.paymentForm.valid) {
      this.loaderService.show();

      // Simular guardado del pago
      setTimeout(() => {
        console.log('Payment created successfully:', this.paymentForm.value);
        
        const newPayment = {
          id: Date.now(),
          ...this.paymentForm.value,
          createdAt: new Date(),
          status: 'Pendiente'
        };

        this.paymentForm.reset();
        this.paymentCreatedAction.emit(newPayment);
        
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Pago registrado exitosamente'
        });

        displayHTML('payment-create-component', 'none');
        this.loaderService.hide();
      }, 1000);
    } else {
      console.error('Form is invalid');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor completa todos los campos requeridos'
      });
    }
  }

  onCancel(): void {
    displayHTML('payment-create-component', 'none');
    this.paymentForm.reset();
  }
}
