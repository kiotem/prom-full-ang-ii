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
import { PDFEstadoCuentaService } from '../../../services/pdf-estado-cuenta-service';
import { Router } from '@angular/router';
import { LinkService } from '../../../services/link-service';

@Component({
  selector: 'app-properties-quotation-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, ClientSearchComponent, PropertySearchComponent, PropertyQuoteFormComponent, PropertyQuoteCardComponent, DecimalPipe, DatePipe],
  templateUrl: './properties-quotation-page.html',
  styleUrls: ['./properties-quotation-page.css' , '../../../../styles/reports.css', '../../../../styles/forms.css']
})

export class PropertiesQuotationPage implements OnInit, ClientSearchInterface, PropertySearchInterface
{
  
  @ViewChild(PropertyQuoteFormComponent, { static: false }) propertyQuoteFormComponent!: PropertyQuoteFormComponent;

  constructor(public propertiesQuotationService: PropertiesQuotationService, private loaderService: LoaderService, private saleService: SaleService, private wompiService: WompiService, private whatsAppService: WhatsAppService, private pdfEstadoCuenta: PDFEstadoCuentaService, private router: Router, public linkService: LinkService) 
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

  onSubmit(): void
  {
    if(this.propertiesQuotationService.separationForm.invalid)
    {
      console.log('Por favor llene los campos requeridos');
      return;
    }

    this.loaderService.show();

    let jsonData = this.propertiesQuotationService.separationForm.value;

    this.saleService.createSale(jsonData, (response, success) => {
      this.loaderService.hide();
      if(success)
      {
        console.log('Sale created successfully:', response);

        let object = response.result.object;

        this.propertiesQuotationService.saleId = object.objectId;

        alert('Cotización creada exitosamente');

        this.getSale(object.objectId);
      }else
      {
        console.error('Error creating sale');
        alert('Error al crear la cotización');
      }
    });
  }

  getSale(id: string): void
  {
    console.log('Getting sale with ID:', id);
    this.loaderService.show();

    this.saleService.downloadSale({ search: id, searchBy: 'id'}, (data, success) => {
      this.loaderService.hide();
      if(success)
      {
        console.log('Sale downloaded successfully:', data);

        this.propertiesQuotationService.sale = data.result.sale;
        this.propertiesQuotationService.quotas = data.result.quotas;

        if(this.propertiesQuotationService.sale)
        {
          this.createWompiLink();
          this.pdfEstadoCuenta.createEstadoIndividual(this.propertiesQuotationService.sale, this.propertiesQuotationService.quotas, [], 'whatsapp');
        }
        
      }else
      {
        console.error('Error downloading sale');
      }
    });
  }

  createWompiLink(): void
  {
    this.loaderService.show();

    this.wompiService.createLink(
      'Separación de propiedad',
      'Lote ' + this.propertiesQuotationService.property.code,
      this.propertiesQuotationService.separationQuotaValue,
      this.propertiesQuotationService.saleId,
      (success, linkResponse) => 
      {
        if(success)
        {
          this.loaderService.hide();
          console.log('Wompi link created successfully:', linkResponse);
          this.propertiesQuotationService.wompiResponse = linkResponse.data;
          
          let wompiId = linkResponse.data.id;

          console.log('Wompi ID:', wompiId);
          if(wompiId)
          {
            this.saveLink(linkResponse.data);
          }else
          {
            console.error('Wompi ID not found');
          }
        }else
        {
          this.loaderService.hide();
          console.error('Error creating Wompi link:', linkResponse);           
          alert('Error al crear el link de pago: ' + linkResponse);
        }
      });
  }

  saveLink(wompiObject: any): void
  {
    this.loaderService.show();

    let saleObject = this.propertiesQuotationService.getJsonWhatsApp();

    this.linkService.save(saleObject as any, wompiObject, (data, success) => {
      this.loaderService.hide();
      if(success)
      {
        console.log('Link saved successfully:', data);
        this.sendWompiLinktToWhatsApp(wompiObject.id);
      }else
      {
        console.error('Error saving link:', data);
        alert('Error al guardar el link de pago');
      }
    });
  }

  sendWompiLinktToWhatsApp(wompiId: string): void 
  {

    this.loaderService.show();

    if(this.propertiesQuotationService.property.code)

    this.whatsAppService.sendSeparationLink(wompiId, this.propertiesQuotationService.client, this.propertiesQuotationService.property.code, this.propertiesQuotationService.project.name, (data, success) => {
      this.loaderService.hide();
      if(success)
      {
        alert('Link de pago enviado exitosamente al WhatsApp del cliente');
        this.router.navigate(['properties/quotation/list']);
        console.log('WhatsApp message sent successfully:', data);
      }
      else
      {
        this.loaderService.hide();
        alert('Error al enviar el link de pago al WhatsApp del cliente');
        console.error('Error sending WhatsApp message:', data);
      }
    });
  }

  clientCreated(event: any): void 
  {
    console.log('Client created event:', event);
  }
}