import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetSendFormService {
  stepNumber: number = 0;
  stepText: string[] = ['Creando venta', 'Creando Link', 'Enviando Link', 'Finalizando...'];

  constructor() { } 

  executeStep(step: number): void {
    this.stepNumber = step;
    console.log(`Executing step ${step + 1}: ${this.stepText[step]}`);
    // Add logic for each step here
  }

  nextStep(): void {
    if (this.stepNumber < this.stepText.length - 1) {
      this.stepNumber++;
      this.executeStep(this.stepNumber);
    } else {
      console.log('All steps completed.');
    }
  }
  
}
