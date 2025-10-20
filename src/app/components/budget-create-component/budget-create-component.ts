import { Component, ViewChild } from '@angular/core';
import { PropertiesQuotationService } from '../../services/properties-quotation-service';
import { PropertyQuoteFormComponent } from '../property-quote-form-component/property-quote-form-component';
import { PropertyCardComponent } from '../property-card-component/property-card-component';
import { PropertyQuoteCardComponent } from '../property-quote-card-component/property-quote-card-component';
import { DatePipe, DecimalPipe } from '@angular/common';
import ClientSearchInterface, { ClientSearchComponent } from "../client-search-component/client-search-component";
import Client from '../../models/Client';
import { displayHTML } from '../../commons/utils';
import PropertySearchInterface, { PropertySearchComponent } from '../property-search-component/property-search-component';
import Property from '../../models/Property';

@Component({
  selector: 'app-budget-create-component',
  imports: [PropertyQuoteFormComponent, PropertyQuoteCardComponent, DatePipe, DecimalPipe, ClientSearchComponent, PropertySearchComponent],
  templateUrl: './budget-create-component.html',
  styleUrls: ['./budget-create-component.css', '../../../styles/reports.css']
})

export class BudgetCreateComponent implements ClientSearchInterface, PropertySearchInterface
{
  @ViewChild(PropertyQuoteFormComponent, { static: false }) propertyQuoteFormComponent!: PropertyQuoteFormComponent;
  
  constructor(public propertiesQuotationService: PropertiesQuotationService)
  {
    console.log('BudgetCreateComponent initialized');
  }
  selectProperty(property: Property): void {
    console.log('Selected property received:', property);
    this.propertiesQuotationService.property = property;

    if(this.propertyQuoteFormComponent)
    {
      this.propertyQuoteFormComponent.process();
    }
  }
  cancelSearchProperty(): void {
    throw new Error('Method not implemented.');
  }


  cancelSearchClient(): void {
    console.log('Cancel search client action triggered');
    this.showClientSearch(false);
  }

  selectClient(client: Client): void 
  {
    console.log('Selected client received:', client);
    this.propertiesQuotationService.setClient(client);

    this.showClientSearch(false);

    //displayHTML('client-search-component', 'none');

    //displayHTML('budget-create-component', 'block');

    if(this.propertiesQuotationService.property.code == '')
    {
      this.showPropertySearch(true);
      //displayHTML('property-search-component', 'block');
    }
  }

  showPropertySearch(visible: boolean) 
  {
    if(visible)
    {
      displayHTML('budget-create-component', 'none');
      displayHTML('property-search-component', 'block');
    }
    else
    {
      displayHTML('budget-create-component', 'block');
      displayHTML('property-search-component', 'none');
    }
  }

  showClientSearch(visible: boolean) 
  {
    if(visible)
    {
      displayHTML('budget-create-component', 'none');
      displayHTML('client-search-component', 'block');
    }
    else
    {
      displayHTML('budget-create-component', 'block');
      displayHTML('client-search-component', 'none');
    }
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
