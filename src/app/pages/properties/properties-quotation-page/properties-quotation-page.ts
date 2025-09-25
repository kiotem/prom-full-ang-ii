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
import { LoaderService } from '../../../services/loader-service';
import { WompiService } from '../../../services/wompi-service';
import { SaleService } from '../../../services/sale-service';
import { WhatsAppService } from '../../../services/whatsapp-service';
import WhatsApp from '../../../models/WhatsApp';
import { PDFEstadoCuentaService } from '../../../services/pdf-estado-cuenta-service';

@Component({
  selector: 'app-properties-quotation-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, ClientSearchComponent, PropertySearchComponent, PropertyQuoteFormComponent, PropertyQuoteCardComponent, DecimalPipe, DatePipe],
  templateUrl: './properties-quotation-page.html',
  styleUrls: ['./properties-quotation-page.css' , '../../../../styles/reports.css', '../../../../styles/forms.css']
})

export class PropertiesQuotationPage implements OnInit, ClientSearchInterface, PropertySearchInterface
{
  @ViewChild(PropertyQuoteFormComponent, { static: false }) propertyQuoteFormComponent!: PropertyQuoteFormComponent;

  constructor(public propertiesQuotationService: PropertiesQuotationService, private loaderService: LoaderService, private saleService: SaleService, private wompiService: WompiService, private whatsAppService: WhatsAppService, private pdfEstadoCuenta: PDFEstadoCuentaService) 
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
    displayHTML('property-search-component', 'none');
  }

  cancelSearchClient(): void 
  {
    console.log('Cancel search client action triggered');
    displayHTML('client-search-component', 'none');
  }

  selectClient(client: Client): void 
  {
    console.log('Selected client received:', client);
    this.propertiesQuotationService.setClient(client);

    displayHTML('client-search-component', 'none');

    if(this.propertiesQuotationService.property.code == '')
    {
      displayHTML('property-search-component', 'block');
    }
  }
/*
  generateQuotas(event: any): void  
  {
    this.propertiesQuotationService.calculateQuotas();
  }
*/

  ngOnInit(): void 
  {
    console.log('PropertiesQuotationPage initialized');
  }

  showClientSearch(): void
  {
    displayHTML('client-search-component', 'block');
    displayHTML('property-search-component', 'none');
  }

  showPropertySearch(): void
  {
    displayHTML('property-search-component', 'block');
    displayHTML('client-search-component', 'none');
  }

  submit()
  {
    console.log('Quotas Length:', this.propertiesQuotationService.quotas.length);
    if(this.propertiesQuotationService.quotas.length == 0) {
      this.propertyQuoteFormComponent.process();
      console.log('Quotas were empty, processed form to generate quotas.');
    }

    this.loaderService.show();

    if (this.propertiesQuotationService.separationForm.invalid) 
    {
      this.loaderService.hide();
      alert('Formulario inválido. Por favor, verifica los datos ingresados.');
      return;
    }

    let jsonData = this.propertiesQuotationService.separationForm.value;

    console.log('Form Data:', jsonData);

    this.saleService.create(jsonData).subscribe({
      next: (response) => {
        console.log('Create successful', response);

        let result = response.result;

        this.loaderService.hide();

        if(result.success) {
          alert('Cotización creada exitosamente');

          let object = result.object;

          this.propertiesQuotationService.saleId = object.objectId;

          console.log('ObjectId created:', object.objectId);

          /*
          //vencimiento en 24 horas
          let expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 24);

          console.log('Expiration Date:', expirationDate.toISOString());

          let expires_at = expirationDate.toISOString();
          */

          this.sendPlanToWhatsApp();

          
          this.wompiService.createLink(
            'Separación de propiedad',
            'Lote ' + this.propertiesQuotationService.property.code,
            this.propertiesQuotationService.separationQuotaValue,
            object.objectId
          ).subscribe({
            next: (linkResponse: any) => {
              console.log('Wompi link created successfully:', linkResponse);

              this.propertiesQuotationService.wompiResponse = linkResponse.data;
              
              let wompiId = linkResponse.data.id;
              if(wompiId) 
              {
                console.log('Wompi ID:', wompiId);
                this.sendLinktToWhatsApp(wompiId);
              }else
              {
                console.error('Wompi ID not found');
              }
            },
            error: (error) => {
              this.loaderService.hide();
              console.error('Error creating Wompi link:', error);           
              alert('Error al crear el link de pago: ' + error.error.code);
            }
          });
        }else
        {
          alert('Error al crear: ' + result.message);
        }
      },
      error: (error) => {
        console.error('Create failed', error);
        console.log('Create failed error', error.error.code);
        alert('Error al crear: ' + error.error.code);
        this.loaderService.hide();
      }
    });
  }

  sendLinktToWhatsApp(wompiId: string): void 
  {
    let json = this.propertiesQuotationService.getJsonWhatsApp();

    let data: WhatsApp = {
      //phone: this.propertyQuoteService.client.phone,
      phone: '3156738411',
      body: '',
      template: 'template_separation_x',
      name: this.propertiesQuotationService.client.name,
      arg1: this.propertiesQuotationService.property.code+' de '+this.propertiesQuotationService.project.name,
      arg2: 'https://checkout.wompi.co/l/' + wompiId,
      wompiObject: this.propertiesQuotationService.wompiResponse,
      saleObject: json
    };

    this.whatsAppService.sendMessageSeparation(data).subscribe({
      next: (response) => 
      {
        console.log('WhatsApp message sent successfully:', response);
      },
      error: (error) => 
      {
        console.error('Error sending WhatsApp message:', error);
      }
    });
  }

  sendPlanToWhatsApp(): void 
  {
    //let json = this.propertiesQuotationService.getJsonWhatsApp();

    let data: WhatsApp = {
      //phone: this.propertyQuoteService.client.phone,
      phone: '3156738411',
      body: '',
      template: 'separation_plan',
      name: this.propertiesQuotationService.client.name,
      arg1: this.propertiesQuotationService.property.code+' de '+this.propertiesQuotationService.project.name,
      arg2: 'quotas.pdf'
    };

    console.log('Sending plan to WhatsApp:', data);

    this.whatsAppService.sendMessageSeparationPlan(data).subscribe({
      next: (response) => {
        console.log('WhatsApp message sent successfully:', response);
      },
      error: (error) => {
        console.error('Error sending WhatsApp message:', error);
      }
    });
  }

  clientCreated(event: any): void 
  {
    console.log('Client created event:', event);
  }

  testPDF(): void
  {
    this.pdfEstadoCuenta.createEstadoIndividual(this.propertiesQuotationService.client);
  }
}
