import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { PropertyQuoteService } from '../../../services/property-quote-service';
import { ClientService } from '../../../services/client-service';
import { LoaderService } from '../../../services/loader-service';
import Project from '../../../models/Project';
import { ProjectService } from '../../../services/project-service';
import { PropertyService } from '../../../services/property-service';
import Property from '../../../models/Property';
import { PropertyCardComponent } from '../../../components/property-card-component/property-card-component';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AgentService } from '../../../services/agent-service';

@Component({
  selector: 'app-properties-quote-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, PropertyCardComponent, DecimalPipe, ReactiveFormsModule],
  templateUrl: './properties-quote-page.html',
  styleUrls: ['./properties-quote-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css']
})
export class PropertiesQuotePage implements OnInit 
{
  selectedProject: Project | undefined;
  meterValue: number = 0;

  separationForm: FormGroup;
  separationQuota: FormControl;
  initialPercent: FormControl;
  initialBalance: FormControl;
  initialNumberOfQuotas: FormControl;
  initialQuota: FormControl;
  finalBalance: FormControl;
  finalNumberOfQuotas: FormControl;
  finalQuota: FormControl;
  agentId: FormControl;
  clientId: FormControl;
  propertyId: FormControl;
  propertyAmount: FormControl;


  constructor(public propertyQuoteService: PropertyQuoteService, private clientService: ClientService, public loaderService: LoaderService, public cdr: ChangeDetectorRef, public projectService: ProjectService, public propertyService: PropertyService, public agentService: AgentService) 
  {
    this.separationQuota = new FormControl('1000000');
    this.initialBalance = new FormControl(this.propertyQuoteService.initialBalanceValue);
    this.initialPercent = new FormControl('30');
    this.initialNumberOfQuotas = new FormControl('6');
    this.initialQuota = new FormControl(this.propertyQuoteService.initialQuotaValue);
    this.finalBalance = new FormControl(this.propertyQuoteService.finalBalanceValue);
    this.finalNumberOfQuotas = new FormControl('36');
    this.finalQuota = new FormControl(this.propertyQuoteService.finalQuotaValue);
    this.agentId = new FormControl('');
    this.clientId = new FormControl('');
    this.propertyId = new FormControl('');  
    this.propertyAmount = new FormControl('');

    this.separationForm = new FormGroup({
      separationQuota: this.separationQuota,
      initialPercent: this.initialPercent,
      initialBalance: this.initialBalance,
      initialNumberOfQuotas: this.initialNumberOfQuotas,
      initialQuota: this.initialQuota,
      finalBalance: this.finalBalance,
      finalNumberOfQuotas: this.finalNumberOfQuotas,
      finalQuota: this.finalQuota,
      agentId: this.agentId,
      clientId: this.clientId,
      propertyId: this.propertyId,
      propertyAmount: this.propertyAmount
    });
  }

  ngOnInit(): void 
  {
    this.selectedProject = this.projectService.getSelected();
    this.meterValue = this.selectedProject?.meterValue || 0;
    this.propertyService.clear();

    this.getAgents({});
    this.cdr.detectChanges();
    
    this.checkFilter();//deshabilitar
  }

  onKeydownClient(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const searchValue = (event.target as HTMLInputElement).value;
      if(searchValue.length > 2)
      {
        this.getClientByPms({ search: searchValue });
      }
    }
  }

  onKeyUpProperty(event: KeyboardEvent): void {
    this.checkFilter();
  }

  onPropertyClick(property: Property): void 
  {
    this.propertyQuoteService.setProperty(property); // Set the property in the service

    this.propertyId.setValue(property.objectId);
    this.propertyAmount.setValue(property.amount);


    const panel_property_search = document.getElementById('panel-property-search');
    if (panel_property_search) {
      panel_property_search.style.display = 'none';
    }

    const panel_quote = document.getElementById('panel-quote');
    if (panel_quote) {
      panel_quote.style.display = 'block';
    }

    this.process();
    //this.propertyQuoteService.calculate();
  }

  onCloseQuotePanel(): void {

    const panel_quote = document.getElementById('panel-quote');
    if (panel_quote) 
    {
      panel_quote.style.display = 'none';
    }

    const panel_property_search = document.getElementById('panel-property-search');
    if (panel_property_search) 
    {
      panel_property_search.style.display = 'block';
    }
  }

  getClientByPms(json: any) {
  console.log('getClientByPms called with Pre:', json);
      this.loaderService.show();

      this.clientService.getByPms(json).subscribe({
      next: (data) => {
        this.loaderService.hide();

        try{

        console.log('ClientsByPms fetched successfully:', data);

        const panel_client_name = document.getElementById('panel-client-name');
        const panel_customer_empty = document.getElementById('panel-client-empty');

        if(data.result.length == 0) 
        {
          panel_client_name!.style.display = 'none';
          panel_customer_empty!.style.display = 'block';
        }else
        {
          this.propertyQuoteService.setClient(data.result[0]); // Set the client in the service
          panel_client_name!.style.display = 'block';
          panel_customer_empty!.style.display = 'none';

          const panel_property_search = document.getElementById('panel-property-search');
          if (panel_property_search) 
          {
            panel_property_search.style.display = 'block';

            const i_search_property = document.getElementById('i_search_property');
            if (i_search_property) 
            {
              (i_search_property as HTMLInputElement).focus();
            }
          }

          this.checkFilter();
        }
        
        this.cdr.detectChanges();
      }catch (error) 
      {
        console.error('Error processing client data:', error);
      }
      },
      error: (error) => {
        this.loaderService.hide();
        console.error('Error fetching clients:', error);
      }
    });
  }

  checkFilter(): void{
    
    if (this.selectedProject) 
      {
      let jsonSearch: any = {project: this.selectedProject.objectId};

      let i_search_property = document.getElementById('i_search_property');
      
      if (i_search_property) 
      {
        let searchValue = (i_search_property as HTMLInputElement).value.toUpperCase();
        jsonSearch = {project: this.selectedProject.objectId, search: searchValue, status: "Libre"}
      }

      this.getProperties(jsonSearch);
    }
  }

  getProperties(json: any) 
  {
    this.propertyService.getProperties(json).subscribe({
      next: (data) => {
        console.log('Properties fetched successfully:', data);

        this.propertyService.setData(data.result);

        let size = this.propertyService.properties.length;

        for(let i = 0; i < size; i++) {
          this.propertyService.properties[i].amount = this.propertyService.properties[i].area * this.meterValue; // Example calculation
        }

        this.cdr.detectChanges();
      },
      error: (error) => 
      {
        console.error('Error fetching properties:', error);
      }
    });
  }

    getAgents(json: any) {
    this.agentService.getAgents(json).subscribe({
      next: (data) => {
        console.log('Agents fetched successfully:', data);
        this.agentService.fill(data.result);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching agents:', error);
      }
    });
  }

  process()
  {
      let iSeparationQuota = document.getElementById('iSeparationQuota');

      if(iSeparationQuota) 
      {
        this.propertyQuoteService.separationQuotaValue = parseFloat((iSeparationQuota as HTMLInputElement).value);
      }else
      {
        this.propertyQuoteService.separationQuotaValue = 0;
      }

      let iInitialPercent = document.getElementById('iInitialPercent');

      if(iInitialPercent)
      {
        this.propertyQuoteService.initialPercentValue = parseFloat((iInitialPercent as HTMLInputElement).value);
      }else
      {
        this.propertyQuoteService.initialPercentValue = 0;
      }

      let iInitialNumberOfQuotas = document.getElementById('iInitialNumberOfQuotas');
      if(iInitialNumberOfQuotas) 
      {
        this.propertyQuoteService.initialNumberOfQuotasValue = parseFloat((iInitialNumberOfQuotas as HTMLInputElement).value);
      }else
      {
        this.propertyQuoteService.initialNumberOfQuotasValue = 0;
      }

      let iFinalNumberOfQuotas = document.getElementById('iFinalNumberOfQuotas');
      if(iFinalNumberOfQuotas) 
      {
        this.propertyQuoteService.finalNumberOfQuotasValue = parseFloat((iFinalNumberOfQuotas as HTMLInputElement).value);
      }else
      {
        this.propertyQuoteService.finalNumberOfQuotasValue = 0;
      }

      this.propertyQuoteService.calculate();

      this.initialBalance.setValue(this.propertyQuoteService.initialBalanceValue);
      this.initialQuota.setValue(this.propertyQuoteService.initialQuotaValue);
      this.finalBalance.setValue(this.propertyQuoteService.finalBalanceValue);
      this.finalQuota.setValue(this.propertyQuoteService.finalQuotaValue);

      this.cdr.detectChanges();
  }

  submit()
  {
    
  }

}
