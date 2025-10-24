import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

export default interface BudgetSendFormInterface 
{
  sendSuccessfully(): void;
}

@Component({
  selector: 'app-budget-send-form-component',
  imports: [MatStepperModule, MatIconModule],
  templateUrl: './budget-send-form-component.html',
  styleUrl: './budget-send-form-component.css'
})
export class BudgetSendFormComponent {


}
