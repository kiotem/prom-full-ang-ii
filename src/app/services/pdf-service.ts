import { Injectable } from '@angular/core';
import Client from '../models/Client';
import Sale from '../models/Sale';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PDFService 
{
  constructor() 
  {
    // Initialization code if needed
  }

  createEstadoIndividual(client: Client): void
  {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text('Estado individual de cartera', 15, 22);
    doc.setFontSize(11);

    let margin = 15;
    let yPosition = 50;

    let parrafo = 'Estimado cliente, a continuación adjuntamos el estado de su cartera actualizado a la fecha para su respectivo conocimiento, control, y conciliación, por lo tanto, si hay diferencias, por favor háganoslo saber a la brevedad para aclarar sus inquietudes.';


    doc.text('Reciba cordial saludo', 15, 36);



        // Ancho máximo del texto (ancho de la página - márgenes)
    const pageHeight = doc.internal.pageSize.height;
    const maxWidth = doc.internal.pageSize.width - (2 * margin);

    // Divide el texto en líneas que caben en el ancho de la página
    const splitText = doc.splitTextToSize(parrafo, maxWidth);

    splitText.forEach((linex: string) => {
      if (yPosition + 7 > pageHeight) { // Si la línea excede la altura de la página
        doc.addPage(); // Añade una nueva página
        yPosition = margin; // Reinicia la posición Y al margen
      }
      doc.text(linex, margin, yPosition); // Dibuja la línea
      yPosition += 7; // Incrementa la posición Y para la siguiente línea
    });
/*
    doc.text(`Cliente: ${client.name} ${client.lastName1}`, 15, 32);
    doc.text(`DNI: ${client.pmsId}`, 15, 40);
    doc.text(`Email: ${client.email}`, 15, 48);
    doc.text(`Teléfono: ${client.phone}`, 15, 56);
*/
    doc.output('dataurlnewwindow');
  }
}
