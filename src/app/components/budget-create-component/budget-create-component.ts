import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { PropertiesQuotationService } from '../../services/properties-quotation-service';
import { PropertyQuoteFormComponent } from '../property-quote-form-component/property-quote-form-component';
import { PropertyQuoteCardComponent } from '../property-quote-card-component/property-quote-card-component';
import { DatePipe, DecimalPipe } from '@angular/common';
import ClientSearchInterface, { ClientSearchComponent } from "../client-search-component/client-search-component";
import Client from '../../models/Client';
import { displayHTML } from '../../commons/utils';
import PropertySearchInterface, { PropertySearchComponent } from '../property-search-component/property-search-component';
import Property from '../../models/Property';
import AgentSearchInterface, { AgentSearchComponent } from '../agent-search-component/agent-search-component';
import Agent from '../../models/Agent';
import BudgetSendFormInterface, { BudgetSendFormComponent } from '../budget-send-form-component/budget-send-form-component';
import { ClientCreateComponent } from '../client-create-component/client-create-component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-budget-create-component',
  imports: [PropertyQuoteFormComponent, PropertyQuoteCardComponent, DatePipe, DecimalPipe, ClientSearchComponent, PropertySearchComponent, BudgetSendFormComponent, AgentSearchComponent, BudgetSendFormComponent, ClientCreateComponent],
  templateUrl: './budget-create-component.html',
  styleUrls: ['./budget-create-component.css', '../../../styles/reports.css']
})

export class BudgetCreateComponent implements ClientSearchInterface, PropertySearchInterface, AgentSearchInterface, BudgetSendFormInterface
{
  @ViewChild(PropertyQuoteFormComponent, { static: false }) propertyQuoteFormComponent!: PropertyQuoteFormComponent;
  @ViewChild(BudgetSendFormComponent, { static: false }) budgetSendFormComponent!: BudgetSendFormComponent;

  @Output() sendSuccessfullyAction = new EventEmitter<any>();
  
  constructor(public propertiesQuotationService: PropertiesQuotationService, private cdr: ChangeDetectorRef)
  {
    console.log('BudgetCreateComponent initialized');
  }

  selectAgent(agent: Agent): void {
    console.log('Selected agent received BC:', agent);
    this.propertiesQuotationService.agent = agent;

    this.showAgentSearch(false);
    this.propertyQuoteFormComponent.process();
  }
  cancelSearchAgent(): void {
    console.log('Cancel search agent action triggered');
    this.showAgentSearch(false);
    
  }

  selectProperty(property: Property): void {
    console.log('Selected property received BC:', property);
    this.propertiesQuotationService.property = property;

    if(this.propertyQuoteFormComponent)
    {
      this.propertyQuoteFormComponent.process();
    }

    this.showPropertySearch(false);

    if(this.propertiesQuotationService.agent.objectId == '')
    {
      this.showAgentSearch(true);
    }
  }

  cancelSearchProperty(): void {
    //throw new Error('Method not implemented.');
    console.log('Cancel search property action triggered');
    this.showPropertySearch(false);
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

    if(this.propertiesQuotationService.property.code == '')
    {
      this.showPropertySearch(true);
      //displayHTML('property-search-component', 'block');
    }

    this.propertyQuoteFormComponent.process();
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

  showAgentSearch(visible: boolean) 
  {
    if(visible)
    {
      displayHTML('budget-create-component', 'none');
      displayHTML('agent-search-component', 'block');
    }
    else
    {
      displayHTML('budget-create-component', 'block');
      displayHTML('agent-search-component', 'none');
    }
  }

  showBudgetSendForm(visible: boolean) 
  {
    if(visible) 
    {
      displayHTML('budget-create-component', 'none');
      displayHTML('budget-send-form-component', 'block');

      if(this.propertiesQuotationService.separationForm.invalid)
      {
        console.log('Separation form is invalid. Cannot proceed to send budget.');
        return;
        
      }else
      {
        this.budgetSendFormComponent.startSendProcess({});
      }
    }else
    {
      displayHTML('budget-create-component', 'block');
      displayHTML('budget-send-form-component', 'none');
    }
  }

  launch()
  {
    // Logic to launch the budget creation process
  }

  onSend()
  {
    // Logic to create a new budget
    if(this.propertiesQuotationService.separationForm.invalid)
    {
      console.log('Separation form is invalid. Cannot proceed to send budget.');
    }else{
      console.log('Separation form is valid. Proceeding to send budget.');
      this.propertyQuoteFormComponent.process();
      this.showBudgetSendForm(true);
    }
  } 

  onCancel()
  {
    // Logic to cancel budget creation 
    this.propertiesQuotationService.reset();
    displayHTML('budget-create-component', 'none'); 

    this.propertiesQuotationService.reset();
    this.propertyQuoteFormComponent.restart();
    this.cdr.detectChanges();
  }

  sendSuccessfully()
  {
    console.log('Budget sent successfully from BC!');
    console.log('Returning to budgets list page.');

    displayHTML('budget-send-form-component', 'none');

     this.propertyQuoteFormComponent.restart();
    this.propertiesQuotationService.reset();
    this.cdr.detectChanges();

    this.sendSuccessfullyAction.emit({});
  }

  clientCreated(client: Client): void {
    console.log('Client created event received in BudgetCreateComponent:', client);

    this.propertiesQuotationService.setClient(client);

    this.propertyQuoteFormComponent.process();

    displayHTML('client-create-component', 'none');
    displayHTML('budget-create-component', 'block');

    Swal.fire({
      icon: 'success',
      title: 'Proceso exitoso',
      text: '¡Cliente creado exitosamente!',
      confirmButtonText: 'OK'
    });

    this.cdr.detectChanges();
  }
}
