import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { BudgetSendFormService } from '../../services/budget-send-form-service';
import { PropertiesQuotationService } from '../../services/properties-quotation-service';
import { SaleService } from '../../services/sale-service';
import { WompiService } from '../../services/wompi-service';
import { WhatsAppService } from '../../services/whatsapp-service';
import { PDFEstadoCuentaService } from '../../services/pdf-estado-cuenta-service';
import { LinkService } from '../../services/link-service';

export default interface BudgetSendFormInterface 
{
  sendSuccessfully(): void;
}

@Component({
  selector: 'app-budget-send-form-component',
  imports: [MatStepperModule, MatIconModule],
  templateUrl: './budget-send-form-component.html',
  styleUrl: './budget-send-form-component.css'
})
export class BudgetSendFormComponent {

  stepNumber: number = 0;
  stepText: string[] = ['Creando presupuesto', 'Confirmando envío', 'Creando Link', 'Enviando Link', 'Finalizando...'];

  constructor(public budgetSendFormService: BudgetSendFormService, private propertiesQuotationService: PropertiesQuotationService, private saleService: SaleService, private wompiService: WompiService, private whatsAppService: WhatsAppService, private pdfEstadoCuenta: PDFEstadoCuentaService, private linkService: LinkService)
  {
    // Initialization logic can go here
  }

  startSendProcess(data: any): void {
    console.log('Starting budget send process...');
    // Simulate sending process
    //this.budgetSendFormService.executeStep(1);

    this.createSale();
  }

  sendSuccessfully(): void {
    console.log('Budget sent successfully!');
    // Additional logic after successful send can be added here
  }

  createSale(): void {
    console.log('Creating sale...');
    this.stepNumber = 1;
   
    let jsonData = this.propertiesQuotationService.separationForm.value;

      console.log('Sale data to be sent:', jsonData);

    this.saleService.createSale(jsonData, (response, success) => {
      
      if(success)
      {
        let result = response.result;

        if(result.success)
        {
          console.log('Sale created successfully:', response);

          let object = response.result.object;

          this.propertiesQuotationService.saleId = object.objectId;

          //alert('Cotización creada exitosamente');

          this.getSale(object.objectId);
        }else
        {
          console.error('Error in sale creation response:', response);
          alert('Error al crear la cotización: ' + result.message);
        }
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
    this.stepNumber = 2;
    this.saleService.downloadSale({ search: id, searchBy: 'id'}, (data, success) => {
      if(success)
      {
        console.log('Sale downloaded successfully:', data);

        this.propertiesQuotationService.sale = data.result.sale;
        this.propertiesQuotationService.quotas = data.result.quotas;

        if(this.propertiesQuotationService.sale)
        {
          //this.createWompiLink();
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
    this.stepNumber = 3;
    this.wompiService.createLink(
      'Separación de propiedad',
      'Lote ' + this.propertiesQuotationService.property.code,
      this.propertiesQuotationService.separationQuotaValue,
      this.propertiesQuotationService.saleId,
      (success, linkResponse) => 
      {
        if(success)
        {
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
          console.error('Error creating Wompi link:', linkResponse);           
          alert('Error al crear el link de pago: ' + linkResponse);
        }
      });
  }

  saveLink(wompiObject: any): void
  {
    this.stepNumber = 4;

    let saleObject = this.propertiesQuotationService.getJsonWhatsApp();

    this.linkService.save(saleObject as any, wompiObject, (data, success) => {
      if(success)
      {
        console.log('Link saved successfully:', data);
        this.sendWompiLinktToWhatsApp(wompiObject.id);
      }else
      {
        console.error('Error saving link:', data);
        //alert('Error al guardar el link de pago');
      }
    });
  }

  sendWompiLinktToWhatsApp(wompiId: string): void 
  {
    this.stepNumber = 5;

    if(this.propertiesQuotationService.property.code)

    this.whatsAppService.sendSeparationLink(wompiId, this.propertiesQuotationService.client, this.propertiesQuotationService.property.code, this.propertiesQuotationService.project.name, (data, success) => {
      if(success)
      {
        //alert('Link de pago enviado exitosamente al WhatsApp del cliente');
        console.log('WhatsApp message sent successfully:', data);
      }
      else
      {
        //alert('Error al enviar el link de pago al WhatsApp del cliente');
        console.error('Error sending WhatsApp message:', data);
      }
    });
  }


  getStepText(): string 
  {
    if(this.stepNumber > 0)
    {
      return this.stepText[this.stepNumber - 1];
    }else{
      return '';
    }
    
  }
}
