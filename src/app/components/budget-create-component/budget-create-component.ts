import { Component } from '@angular/core';
import { PropertiesQuotationService } from '../../services/properties-quotation-service';

@Component({
  selector: 'app-budget-create-component',
  imports: [],
  templateUrl: './budget-create-component.html',
  styleUrls: ['./budget-create-component.css', '../../../styles/reports.css']
})

export class BudgetCreateComponent
{
  constructor(public propertiesQuotationService: PropertiesQuotationService)
  {
    console.log('BudgetCreateComponent initialized');
  }

  showPropertySearch(visible: boolean) 
  {
    // Logic to show property search
  }
}
