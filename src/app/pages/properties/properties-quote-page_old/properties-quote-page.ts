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
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AgentService } from '../../../services/agent-service';
import { displayHTML, getNumberFromField } from '../../../commons/utils';
import WhatsApp from '../../../models/WhatsApp';
import { WhatsAppService } from '../../../services/whatsapp-service';
import { SaleService } from '../../../services/sale-service';
import { WompiService } from '../../../services/wompi-service';


@Component({
  selector: 'app-properties-quote-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, PropertyCardComponent, DecimalPipe, DatePipe, ReactiveFormsModule],
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
  quotas : FormControl;



  constructor(public propertyQuoteService: PropertyQuoteService, private clientService: ClientService, public loaderService: LoaderService, public cdr: ChangeDetectorRef, public projectService: ProjectService, public propertyService: PropertyService, public agentService: AgentService, private whatsAppService: WhatsAppService, private saleService: SaleService, private wompiService: WompiService) 
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
    this.quotas = new FormControl([]);

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
      propertyAmount: this.propertyAmount,
      quotas: this.quotas
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
    if (event.key === 'Enter') 
    {
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
    this.separationForm.reset();

    this.propertyQuoteService.setProperty(property); // Set the property in the service

    this.separationQuota.setValue(1000000);
    this.initialPercent.setValue(30);
    this.initialNumberOfQuotas.setValue(6);
    this.finalNumberOfQuotas.setValue(36);

    this.propertyId.setValue(property.objectId);
    this.propertyAmount.setValue(property.amount);

    displayHTML('panel-property-search', 'none');
    displayHTML('panel-quote', 'block');

    this.process();
  }

  onCloseQuotePanel(): void 
  {
    displayHTML('panel-quote', 'none');
    displayHTML('panel-property-search', 'block');
  }

  getClientByPms(json: any) {
  console.log('getClientByPms called with Pre:', json);
      this.loaderService.show();

      this.clientService.getByPms(json).subscribe({
      next: (data) => {
        this.loaderService.hide();

        try
        {

        console.log('ClientsByPms fetched successfully:', data);

        if(data.result.length == 0) 
        {
          displayHTML('panel-client-name', 'none');
          displayHTML('panel-client-empty', 'block');
        }else
        {
          this.propertyQuoteService.setClient(data.result[0]); // Set the client in the service
          
          displayHTML('panel-client-name', 'block');
          displayHTML('panel-client-empty', 'none');

          if(displayHTML('panel-property-search', 'block'))
          {
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

  process(): boolean
  {
      this.propertyQuoteService.separationQuotaValue = getNumberFromField('iSeparationQuota');
      this.propertyQuoteService.initialPercentValue = getNumberFromField('iInitialPercent');
      this.propertyQuoteService.initialNumberOfQuotasValue = getNumberFromField('iInitialNumberOfQuotas');
      this.propertyQuoteService.finalNumberOfQuotasValue = getNumberFromField('iFinalNumberOfQuotas');

      if(this.propertyQuoteService.initialPercentValue < 0 || this.propertyQuoteService.initialPercentValue > 100)
      {
        alert('El porcentaje de cuota inicial debe estar entre 0 y 100');
        return false;
      }

      this.propertyQuoteService.calculate();

      this.initialBalance.setValue(this.propertyQuoteService.initialBalanceValue);
      this.initialQuota.setValue(this.propertyQuoteService.initialQuotaValue);
      this.finalBalance.setValue(this.propertyQuoteService.finalBalanceValue);
      this.finalQuota.setValue(this.propertyQuoteService.finalQuotaValue);

      this.cdr.detectChanges();

      return true;
  }

  generateQuotas(): void
  {
    if(this.process())
    {
      this.propertyQuoteService.calculateQuotas();
      this.quotas.setValue(this.propertyQuoteService.quotas);
      this.cdr.detectChanges();
    }
  }

  submit()
  {
    console.log('Separation form submitted');
    this.clientId.setValue(this.propertyQuoteService.client.objectId);

    this.loaderService.show();

    if (this.separationForm.invalid) {
      console.error('Form is invalid');
      this.loaderService.hide();
      alert('Formulario inválido. Por favor, verifica los datos ingresados.');
      return;
    }

    let jsonData = this.separationForm.value;

    console.log('Form Data:', jsonData);

    this.saleService.create(jsonData).subscribe({
          next: (response) => {
            console.log('Create successful', response);

            let result = response.result;

            this.loaderService.hide();

            if(result.success) {
              // Handle successful creation
              alert('Venta creada exitosamente');
              // Reset the form after successful submission
              //this.propertyForm.reset();

              let object = result.object;

              this.propertyQuoteService.saleId = object.objectId;
            
              console.log('ObjectId created:', object.objectId);

              /*
              //vencimiento en 24 horas
              let expirationDate = new Date();
              expirationDate.setHours(expirationDate.getHours() + 24);

              console.log('Expiration Date:', expirationDate.toISOString());

              let expires_at = expirationDate.toISOString();

              */

              this.wompiService.createLink(
                'Separación de propiedad',
                'Lote ' + this.propertyQuoteService.property.code,
                this.propertyQuoteService.separationQuotaValue,
                object.objectId
              ).subscribe({
                next: (linkResponse: any) => {
                  console.log('Wompi link created successfully:', linkResponse);

                  this.propertyQuoteService.wompiResponse = linkResponse.data;
                  
                  let wompiId = linkResponse.data.id;
                  if(wompiId) 
                  {
                    console.log('Wompi ID:', wompiId);
                    this.sendLinktToWhatsApp(wompiId);
                  }else
                  {
                    console.error('Wompi ID not found');
                  }
                  //alert('Link de pago creado exitosamente: ' + linkResponse.data.link);
                  // You can redirect to the link or show it to the user
                  //window.open(linkResponse.data.link, '_blank');
                },
                error: (error) => {
                   this.loaderService.hide();
                  console.error('Error creating Wompi link:', error);           
                  alert('Error al crear el link de pago: ' + error.error.code);
                }
              });

              this.separationForm.reset();
              
            }else{
              alert('Error al crear: ' + result.message);
            }
          },
          error: (error) => {
            console.error('Create failed', error);
            console.log('Create failed error', error.error.code);
            alert('Error al crear: ' + error.error.code);

            this.loaderService.hide();

            // Handle login error, e.g., show an error message
          }
        });
  }

  sendLinktToWhatsApp(wompiId: string): void 
  {
    let jsonSale = 
    { 
      objectId: this.propertyQuoteService.saleId,
      amount: this.propertyQuoteService.separationQuotaValue,
      propertyId: this.propertyQuoteService.property.objectId,
      clientName: this.propertyQuoteService.client.name+' '+this.propertyQuoteService.client.lastName1,
      clientPmsId: this.propertyQuoteService.client.pmsId,
      clientPhone: this.propertyQuoteService.client.phone,
      clientEmail: this.propertyQuoteService.client.email,
      propertyCode: this.propertyQuoteService.property.code,
      projectName: this.propertyQuoteService.project.name
    };

    let data: WhatsApp = {
      //phone: this.propertyQuoteService.client.phone,
      phone: '3156738411',
      body: '',
      template: 'template_separation_x',
      name: this.propertyQuoteService.client.name,
      arg1: this.propertyQuoteService.property.code+' de '+this.propertyQuoteService.project.name,
      arg2: 'https://checkout.wompi.co/l/' + wompiId,
      wompiObject: this.propertyQuoteService.wompiResponse,
      saleObject: jsonSale
    };

    this.whatsAppService.sendMessageSeparation(data).subscribe({
      next: (response) => {
        console.log('WhatsApp message sent successfully:', response);
      },
      error: (error) => {
        console.error('Error sending WhatsApp message:', error);
      }
    });
  }

}
