import { Injectable } from '@angular/core';
import Client from '../models/Client';
import Sale from '../models/Sale';
import jsPDF from 'jspdf';
import Quota from '../models/Quota';
import Property from '../models/Property';
import autoTable from 'jspdf-autotable';
import Payment from '../models/Payment';
import { HttpClient } from '@angular/common/http';
import WhatsApp from '../models/WhatsApp';
import { WhatsAppService } from './whatsapp-service';

@Injectable({
  providedIn: 'root'
})
export class PDFEstadoCuentaService 
{
  sale: Sale | undefined;
  quotas: Quota[] | undefined;
  payments: Payment[] | undefined;
  destiny: string | undefined;

  doc: jsPDF;
  
  constructor(private http: HttpClient, private whatsAppService: WhatsAppService) 
  {
    this.doc = new jsPDF();
    // Initialization code if needed
  }

  createEstadoIndividual(sale: Sale, quotas: Quota[], payments: Payment[], destiny: string): void
  {
    this.doc = new jsPDF();

    this.sale = sale;
    this.quotas = quotas;
    this.payments = payments;
    this.destiny = destiny;

    //const doc = new jsPDF();

    let margin = 15;

    let currentPage = 1;
    let textHeader = 'Estado individual de cartera';
    let textFooter = `Página ${currentPage}`;

    this.newPage('', textFooter, this.doc, false);

    this.doc.setFontSize(14);

    this.doc.text(textHeader, this.doc.internal.pageSize.width / 2, 48, { align: 'center' });

    this.doc.setFontSize(11);

    this.doc.text('Reciba cordial saludo', 15, 66);

    let yPosition = 80;

    let parrafo = 'Estimado cliente, a continuación adjuntamos el estado de su cartera actualizado a la fecha para su respectivo conocimiento, control, y conciliación, por lo tanto, si hay diferencias, por favor háganoslo saber a la brevedad para aclarar sus inquietudes.';

    // Ancho máximo del texto (ancho de la página - márgenes)
    const pageHeight = this.doc.internal.pageSize.height;
    const maxWidth = this.doc.internal.pageSize.width - (2 * margin);

    // Divide el texto en líneas que caben en el ancho de la página
    const splitText = this.doc.splitTextToSize(parrafo, maxWidth);

    splitText.forEach((linex: string) => {
      if (yPosition + 7 > pageHeight) { // Si la línea excede la altura de la página
        //this.doc.addPage(); // Añade una nueva página
        currentPage++;
        textFooter = `Página ${currentPage}`;
        this.newPage(textHeader, textFooter, this.doc, true);
        yPosition = margin; // Reinicia la posición Y al margen
      }
      this.doc.text(linex, margin, yPosition); // Dibuja la línea
      yPosition += 7; // Incrementa la posición Y para la siguiente línea
    });


    const clientData: any[] = [];

    clientData.push( {title: 'CC/NIT', value: sale.client.pmsId});
    clientData.push( { title: 'Nombre', value: sale.client.name + ' ' + sale.client.lastName1 + ' ' + (sale.client.lastName2 ? sale.client.lastName2 : '')});
    clientData.push( { title: 'Email', value: sale.client.email });
    clientData.push( { title: 'Teléfono', value: sale.client.phone });
    clientData.push( { title: 'Dirección', value: sale.client.address });
    clientData.push( { title: 'Ciudad', value: sale.client.city });

    autoTable(this.doc, {
      body: clientData,
      didDrawCell: data => 
      {
        //console.log(data.column.index);
      },
      rowPageBreak: 'auto',
      headStyles: { fillColor: [22, 160, 133], lineColor: [0, 0, 0], halign: 'center', lineWidth: 0.1 },
      columnStyles: { 
        0: { cellWidth: 34, lineColor: [0, 0, 0], lineWidth: 0.1, fontStyle: 'bold' }, // ID
        1: { cellWidth: 66, lineColor: [0, 0, 0], lineWidth: 0.1 }, // Country
      },
      margin: { top: 15, left: 15, right: 10, bottom: 15 },
      startY: 105,
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      tableWidth: 100,
      styles: { fontSize: 9, cellPadding: 1, overflow: 'linebreak' }
    });

    const propertyData: any[] = [];
    propertyData.push( {title: 'Propiedad', value: this.sale.property.code });
    propertyData.push( { title: 'Área', value: this.sale.property.area + ' m2'});
    propertyData.push( { title: 'Proyecto', value: this.sale.project.name });
    propertyData.push( { title: 'Valor', value: '$ '+this.sale.amount.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) });
    propertyData.push( { title: 'Fecha de compra', value: this.sale.createdAt });
    propertyData.push( { title: 'Tasa de Mora E.M.', value: '3.00%' });
    propertyData.push( { title: 'Saldo', value: '$ '+this.sale.balance.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) });
    propertyData.push( { title: 'Fecha de corte', value:new Date().toLocaleString('es-CO') });

    autoTable(this.doc, {
      body: propertyData,
      didDrawCell: data => 
      {
        //console.log(data.column.index);
      },
      rowPageBreak: 'auto',
      headStyles: { fillColor: [22, 160, 133], lineColor: [0, 0, 0], halign: 'center', lineWidth: 0.1 },
      columnStyles: { 
        0: { cellWidth: 34, lineColor: [0, 0, 0], lineWidth: 0.1, fontStyle: 'bold' }, // ID
        1: { cellWidth: 66, lineColor: [0, 0, 0], lineWidth: 0.1 }, // Country
      },
      margin: { top: 15, left: 15, right: 10, bottom: 15 },
      startY: 150,
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      tableWidth: 100,
      styles: { fontSize: 9, cellPadding: 1, overflow: 'linebreak' }
    });

    this.generateQuotas();

    switch (destiny) {
      case 'download':
        this.doc.save(`estado_individual_${this.sale.property.code}.pdf`);
        break;
      case 'print':
        this.doc.autoPrint();
        this.doc.output('dataurlnewwindow');
        break;
      case 'view':
        this.doc.output('dataurlnewwindow');
        break;
      case 'mail':
        //this.doc.output('dataurlnewwindow');
        let pdfOutputMail = this.doc.output('blob'); // Get PDF as a Blob

        this.uploadPdfToServerCB(pdfOutputMail, (success) => {
          if(success) 
          {
            /*
            console.log('PDF uploaded, now sending WhatsApp message.');
            this.sendWhatsappFileCB((whatsappSuccess) => {
              if (whatsappSuccess) {
                console.log('WhatsApp message sent successfully!');
              }
            });
            */
          }
        });
        break;
      case 'whatsapp':
        let pdfOutputWA = this.doc.output('blob'); // Get PDF as a Blob

        this.uploadPdfToServerCB(pdfOutputWA, (success) => {
          if(success) 
          {
            console.log('PDF uploaded, now sending WhatsApp message.');

            this.whatsAppService.sendAccountStatus(this.sale!, (whatsappSuccess) => {
              if (whatsappSuccess) {
                console.log('WhatsApp message sent successfully from callback!');
              }
            });
            /*
            this.sendWhatsappFileCB((whatsappSuccess) => {
              if (whatsappSuccess) {
                console.log('WhatsApp message sent successfully!');
              }
            });
            */
          }
        });

        break;
      default:
        this.doc.output('dataurlnewwindow');
        break;
    }
    //this.doc.output('dataurlnewwindow');
  }

  newPage(header: string, footer: string, doc: jsPDF, add: boolean)
  {
    if(add)
    {
      this.doc.addPage();
    }
    
    doc.setFontSize(10);
    doc.text(header, 10, 10);
    doc.setFontSize(9);
    doc.text(footer, 200, 290, { align: 'right' });
  }

  generateQuotas(): void
  {
    let position = 0;
    let pageSize = 45;

    if(this.quotas) 
    {
      this.newPage('', '', this.doc, true);
      
      let totalQuotas = this.quotas.length;

      let head = [["Cuota", "Fecha", "Valor", "Pagado"]];

       var data: any[] = [];

      let currentBlock = -1;
      let createRows = 0;

      while (totalQuotas > 0) 
      {
        currentBlock++;

         data = [];

        if(totalQuotas > pageSize) {
          createRows = pageSize;
          totalQuotas -= pageSize;
        }else{
          createRows = totalQuotas;
          totalQuotas = 0;
        }
        
        for(let j = 0; j < createRows; j++)
        {
          if(this.quotas[position]) 
          {
            const quota = this.quotas[position];

            data.push([quota.type, quota.dueDateString, '$' + quota.amount.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }), quota.paid]);
            position++;
          }else 
          {
            data.push(['', '', '', '']);
          }
        }

        this.tabQuotas(this.doc, head, data, currentBlock, position);
      }
    }
  }

  tabQuotas(doc: jsPDF, head: any[], data: any[], block: number, position: number): void 
  {
    // Implementación de la tabla
    let left = 10;
    let right = 10;

    if(block % 2 == 0 && block > 0) {
      doc.addPage();
    }

    if(block % 2 == 0) {
      left = 15;
      right = 10;
    }else{
      left = 110;
      right = 10;
    }

    autoTable(doc, {
      head: head,
      body: data,
      didDrawCell: data => 
      {
        //console.log(data.column.index);
      },
      rowPageBreak: 'auto',
      headStyles: { fillColor: [22, 160, 133], lineColor: [0, 0, 0], halign: 'center', lineWidth: 0.1 },
      columnStyles: { 
        0: { cellWidth: 25, lineColor: [0, 0, 0], lineWidth: 0.1 }, // ID
        1: { cellWidth: 20, lineColor: [0, 0, 0], lineWidth: 0.1 }, // Country
        2: { cellWidth: 20, halign: 'right', lineColor: [0, 0, 0], lineWidth: 0.1 }, // Index
        3: { cellWidth: 20, halign: 'right', lineColor: [0, 0, 0], lineWidth: 0.1 } // Capital
      },
      margin: { top: 15, left: left, right: right, bottom: 15 },
      startY: 15,
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      tableWidth: 85,
      styles: { fontSize: 9, cellPadding: 1, overflow: 'linebreak' }
    });
  }

  uploadPdfToServer(pdfBlob: Blob): void
  {
    const formData = new FormData();
    //formData.append('pdfFile', pdfBlob, 'document.pdf'); // 'pdfFile' is the field name on server
    formData.append('pdfFile', pdfBlob, 'fl_'+this.sale?.objectId+'.pdf'); // 'pdfFile' is the field name on server

    // Send the FormData using Angular's HttpClient

    this.http.post('https://promotorasfull.co/media/upload_pdf.php', formData).subscribe(
      (response) => {
        console.log('PDF uploaded successfully!', response);

        this.sendWhatsappFile();
      },
      (error) => {
        console.error('Error uploading PDF:', error);
      }
    );
    
  }

  uploadPdfToServerCB(pdfBlob: Blob, callback: (success: boolean) => void): void
  {
    console.log('Uploading PDF to server... callback');
    const formData = new FormData();
    formData.append('pdfFile', pdfBlob, 'fl_'+this.sale?.objectId+'.pdf');

    this.http.post('https://promotorasfull.co/media/upload_pdf.php', formData).subscribe(
      (response) => {
        console.log('PDF uploaded successfully!', response);
        callback(true);
      },
      (error) => {
        console.error('Error uploading PDF:', error);
        callback(false);
      }
    );
  }

  sendWhatsappFile(): void
  {
    let data: WhatsApp = {
      //phone: this.propertyQuoteService.client.phone,
      phone: '3156738411',
      body: '',
      template: 'separation_plan',
      name: this.sale!.client.name,
      arg1: this.sale!.property.code+' de '+this.sale!.project.name,
      arg2: 'fl_'+this.sale!.objectId+'.pdf'
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

  sendWhatsappFileCB(callback: (success: boolean) => void): void
  {
    let data: WhatsApp = {
      //phone: this.propertyQuoteService.client.phone,
      phone: '3156738411',
      body: '',
      template: 'separation_plan',
      name: this.sale!.client.name,
      arg1: this.sale!.property.code+' de '+this.sale!.project.name,
      arg2: 'fl_'+this.sale!.objectId+'.pdf'
    };

        this.whatsAppService.sendMessageSeparationPlan(data).subscribe({
      next: (response) => {
        console.log('WhatsApp message sent successfully:', response);
        callback
      },
      error: (error) => {
        console.error('Error sending WhatsApp message:', error);
        callback(false);
      }
    });


  }

}
