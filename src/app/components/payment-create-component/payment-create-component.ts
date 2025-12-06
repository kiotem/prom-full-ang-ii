import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader-service';
import { displayHTML } from '../../commons/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-create-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment-create-component.html',
  styleUrl: './payment-create-component.css'
})
export class PaymentCreateComponent implements OnInit {
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
  bankEntity: FormControl;
  bankAccount: FormControl;

  constructor(public loaderService: LoaderService) {
    console.log('PaymentCreate component initialized');  
    
    this.amount = new FormControl('', [Validators.required, Validators.min(0.01)]);
    this.paymentMethod = new FormControl('Efectivo', [Validators.required]);
    this.description = new FormControl('');
    this.clientName = new FormControl('');
    this.projectName = new FormControl('');
    this.paymentType = new FormControl('Cuota', [Validators.required]);
    this.quotaNumber = new FormControl('');
    this.reference = new FormControl('', [Validators.required]);
    this.bankEntity = new FormControl('');
    this.bankAccount = new FormControl('');

    this.paymentForm = new FormGroup({
      amount: this.amount,
      paymentMethod: this.paymentMethod,
      description: this.description,
      clientName: this.clientName,
      projectName: this.projectName,
      paymentType: this.paymentType,
      quotaNumber: this.quotaNumber,
      reference: this.reference,
      bankEntity: this.bankEntity,
      bankAccount: this.bankAccount
    });
  }

  ngOnInit(): void {
    // Subscribe to payment method changes
    this.paymentMethod.valueChanges.subscribe(value => {
      this.updateBankFieldsValidation(value);
    });
  }

  updateBankFieldsValidation(paymentMethod: string): void {
    if (paymentMethod === 'Transferencia') {
      this.bankEntity.setValidators([Validators.required]);
      this.bankAccount.setValidators([Validators.required]);
    } else {
      this.bankEntity.clearValidators();
      this.bankAccount.clearValidators();
      this.bankEntity.setValue('');
      this.bankAccount.setValue('');
    }
    this.bankEntity.updateValueAndValidity();
    this.bankAccount.updateValueAndValidity();
  }

  get isTransferencia(): boolean {
    return this.paymentMethod.value === 'Transferencia';
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
