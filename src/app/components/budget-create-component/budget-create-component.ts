import { Component } from '@angular/core';
import { PropertiesQuotationService } from '../../services/properties-quotation-service';
import { PropertyQuoteFormComponent } from '../property-quote-form-component/property-quote-form-component';
import { PropertyCardComponent } from '../property-card-component/property-card-component';
import { PropertyQuoteCardComponent } from '../property-quote-card-component/property-quote-card-component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ClientSearchComponent } from "../client-search-component/client-search-component";

@Component({
  selector: 'app-budget-create-component',
  imports: [PropertyQuoteFormComponent, PropertyQuoteCardComponent, DatePipe, DecimalPipe, ClientSearchComponent],
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

  launch()
  {
    // Logic to launch the budget creation process
  }

  onCreate()
  {
    // Logic to create a new budget
  } 

  onCancel()
  {
    // Logic to cancel budget creation  
  }
}
