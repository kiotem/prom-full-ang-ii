import { Component } from '@angular/core';
import { PropertiesQuotationService } from '../../services/properties-quotation-service';
import { PropertyQuoteFormComponent } from '../property-quote-form-component/property-quote-form-component';
import { PropertyCardComponent } from '../property-card-component/property-card-component';
import { PropertyQuoteCardComponent } from '../property-quote-card-component/property-quote-card-component';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-budget-create-component',
  imports: [PropertyQuoteFormComponent, PropertyQuoteCardComponent, DatePipe, DecimalPipe],
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
