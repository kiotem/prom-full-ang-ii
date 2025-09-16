import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import ClientSearchInterface, { ClientSearchComponent } from '../../../components/client-search-component/client-search-component';
import Client from '../../../models/Client';
import { PropertiesQuotationService } from '../../../services/properties-quotation-service';
import { PropertyQuoteFormComponent } from '../../../components/property-quote-form-component/property-quote-form-component';
import { DatePipe, DecimalPipe } from '@angular/common';
import PropertySearchInterface, { PropertySearchComponent } from '../../../components/property-search-component/property-search-component';
import Property from '../../../models/Property';
import { displayHTML } from '../../../commons/utils';
import { PropertyQuoteCardComponent } from '../../../components/property-quote-card-component/property-quote-card-component';

@Component({
  selector: 'app-properties-quotation-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, ClientSearchComponent, PropertySearchComponent, PropertyQuoteFormComponent, PropertyQuoteCardComponent, DecimalPipe, DatePipe],
  templateUrl: './properties-quotation-page.html',
  styleUrls: ['./properties-quotation-page.css' , '../../../../styles/reports.css', '../../../../styles/forms.css']
})

export class PropertiesQuotationPage implements OnInit, ClientSearchInterface, PropertySearchInterface
{
  @ViewChild(PropertyQuoteFormComponent, { static: false }) propertyQuoteFormComponent!: PropertyQuoteFormComponent;
  
  constructor(public propertiesQuotationService: PropertiesQuotationService) 
  {
    this.propertiesQuotationService.reset();
  }

  selectProperty(property: Property): void 
  {
    console.log('Selected property received:', property);
    this.propertiesQuotationService.property = property;

    if(this.propertyQuoteFormComponent)
    {
      this.propertyQuoteFormComponent.process();
    }
  }
  cancelSearchProperty(): void 
  {
    console.log('Cancel search property action triggered');
  }

  cancelSearchClient(): void 
  {
    console.log('Cancel search client action triggered');
  }

  selectClient(client: Client): void 
  {
    console.log('Selected client received:', client);
    this.propertiesQuotationService.setClient(client);

    displayHTML('property-search-component', 'block');
    displayHTML('client-search-component', 'none');
  }

  generateQuotas(event: any): void  
  {
    this.propertiesQuotationService.calculateQuotas();
  }

  ngOnInit(): void 
  {
    console.log('PropertiesQuotationPage initialized');
  }

  submit(): void
  {
    console.log('Submit action triggered');
  }
  

}
