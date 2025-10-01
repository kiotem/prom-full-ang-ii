import { Injectable } from '@angular/core';
import Client from '../models/Client';
import Sale from '../models/Sale';
import jsPDF from 'jspdf';
import Quota from '../models/Quota';
import Property from '../models/Property';
import autoTable from 'jspdf-autotable';
import Payment from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PDFEstadoCuentaService 
{
  sale: Sale | undefined;
  quotas: Quota[] | undefined;
  payments: Payment[] | undefined;
  
  constructor() 
  {
    // Initialization code if needed
  }

  createEstadoIndividual(sale: Sale, payments: Payment[], quotas: Quota[]): void
  {
    this.sale = sale;
    this.payments = payments;
    this.quotas = quotas;

    const doc = new jsPDF();

    let margin = 15;

    let currentPage = 1;
    let textHeader = 'Estado individual de cartera';
    let textFooter = `Página ${currentPage}`;

    this.newPage('', textFooter, doc, false);

    doc.setFontSize(14);
    //doc.text(textHeader, 15, 52);

    doc.text(textHeader, doc.internal.pageSize.width / 2, 48, { align: 'center' });


    doc.setFontSize(11);

    doc.text('Reciba cordial saludo', 15, 66);



    let yPosition = 80;

    let parrafo = 'Estimado cliente, a continuación adjuntamos el estado de su cartera actualizado a la fecha para su respectivo conocimiento, control, y conciliación, por lo tanto, si hay diferencias, por favor háganoslo saber a la brevedad para aclarar sus inquietudes.';


    
    // Ancho máximo del texto (ancho de la página - márgenes)
    const pageHeight = doc.internal.pageSize.height;
    const maxWidth = doc.internal.pageSize.width - (2 * margin);

    // Divide el texto en líneas que caben en el ancho de la página
    const splitText = doc.splitTextToSize(parrafo, maxWidth);

    splitText.forEach((linex: string) => {
      if (yPosition + 7 > pageHeight) { // Si la línea excede la altura de la página
        //doc.addPage(); // Añade una nueva página
        currentPage++;
        textFooter = `Página ${currentPage}`;
        this.newPage(textHeader, textFooter, doc, true);
        yPosition = margin; // Reinicia la posición Y al margen
      }
      doc.text(linex, margin, yPosition); // Dibuja la línea
      yPosition += 7; // Incrementa la posición Y para la siguiente línea
    });


    const clientData: any[] = [];

    clientData.push( {title: 'CC/NIT', value: sale.client.pmsId});
    clientData.push( { title: 'Nombre', value: sale.client.name + ' ' + sale.client.lastName1 + ' ' + (sale.client.lastName2 ? sale.client.lastName2 : '')});
    clientData.push( { title: 'Email', value: sale.client.email });
    clientData.push( { title: 'Teléfono', value: sale.client.phone });
    clientData.push( { title: 'Dirección', value: sale.client.address });
    clientData.push( { title: 'Ciudad', value: sale.client.city });

    autoTable(doc, {
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
    propertyData.push( { title: 'Fecha de compra', value: this.sale.saleDate?.toLocaleDateString('es-CO') });
    propertyData.push( { title: 'Tasa de Mora E.M.', value: '3.00%' });
    propertyData.push( { title: 'Saldo', value: '$ '+this.sale.balance.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) });
    propertyData.push( { title: 'Fecha de corte', value:new Date().toLocaleString('es-CO') });


    autoTable(doc, {
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

    /*
        doc.text(`Cliente: ${client.name} ${client.lastName1}`, 15, 32);
        doc.text(`DNI: ${client.pmsId}`, 15, 40);
        doc.text(`Email: ${client.email}`, 15, 48);
        doc.text(`Teléfono: ${client.phone}`, 15, 56);
    */
    doc.output('dataurlnewwindow');
  }

  newPage(header: string, footer: string, doc: jsPDF, add: boolean)
  {
    if(add)
    {
      doc.addPage();
    }
    
    doc.setFontSize(10);
    doc.text(header, 10, 10);
    doc.setFontSize(9);
    doc.text(footer, 200, 290, { align: 'right' });
  }

}
