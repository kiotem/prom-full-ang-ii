import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuComponent } from '../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from "../../components/project-selector-component/project-selector-component";
import { HighchartsChartComponent, ChartConstructorType } from 'highcharts-angular';
import { LoaderComponent } from '../../components/loader-component/loader-component';
import { ClientSearchComponent } from '../../components/client-search-component/client-search-component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-dashboard-page',
  imports: [MenuComponent, ProjectSelectorComponent, HighchartsChartComponent, LoaderComponent, MatInputModule, MatDatepickerModule],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css', '../../../styles/reports.css'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage 
{
  chartOptions: Highcharts.Options = {
    chart: {
        type: 'column'
    },
    series: 
    [
      {
          name: 'Cotizaciones',
          data: [2, 1, 4, 5, 10, 2],
          type: 'column'
      },
      {
          name: 'Separaciones',
          data: [0, 2, 2, 4, 8, 5],
          type: 'column'
      }
    ],
    xAxis: {
        categories: ['13-AGO', '14-AGO', '15-AGO', '16-AGO', '17-AGO', '18-AGO'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: { text: 'Cantidad' }
    },
    title: { text: 'Cotizaciones vs Separaciones', style: { color: '#000000'}},
    subtitle: {
        text:
        'Últimos 15 días'
    },
  };
  chartConstructor: ChartConstructorType = 'chart'; // Optional, defaults to 'chart'
  updateFlag: boolean = false; // Optional
  oneToOneFlag: boolean = true; // Optional, defaults to false

  chartOptionsPayments: Highcharts.Options = {
    chart: {
        type: 'column'
    },
    series: 
    [
      {
          name: 'Pagos',
          data: [2, 1, 4, 5, 10, 2],
          type: 'column'
      }
    ],
    xAxis: {
        categories: ['13-AGO', '14-AGO', '15-AGO', '16-AGO', '17-AGO', '18-AGO'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: { text: '' }
    },
    title: { text: 'Pagos recibidos', style: { color: '#000000'}},
    subtitle: {
        text:
        'Últimos 15 días'
    },
  };

    constructor(private http: HttpClient) {}

    genDataArray(): any[] {
      const data = [];
          for (let i = 10; i <= 89; i++) {
        data.push([`Ordinaria ${i}`, '09/09/2025', (Math.random() * 3 + 5).toFixed(7), (Math.random() * 3 + 5).toFixed(7)]);
      }
      return data;
    }

    onGenerateTable(): void 
    {
      /*
    const head = [["Cuota", "Fecha", "Valor", "Pagado"]];
    const data = this.genDataArray();

    const doc = new jsPDF();
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
      margin: { top: 15, left: 10, right: 10, bottom: 15 },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      tableWidth: 85,
      styles: { fontSize: 9, cellPadding: 1, overflow: 'linebreak' }
    });

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
      margin: { top: 15, left: 10, right: 10, bottom: 15 },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      tableWidth: 85,
      styles: { fontSize: 9, cellPadding: 1, overflow: 'linebreak'},
      startY: 200
    });


     //doc.save("table.pdf");
     doc.output('dataurlnewwindow');
     */
      this.testTable();
    }

    onGeneratePDF(): void 
    {
        // Lógica para generar el PDF
        console.log('Generando PDF...');

        const doc = new jsPDF(); // or use pdfMake's document definition
        doc.text('Hello world!', 10, 10); // Add content to your PDF
        //doc.save('dashboard.pdf'); // Save the PDF
        //doc.output('dataurlnewwindow');

        const pdfOutput = doc.output('blob'); // Get PDF as a Blob

        this.uploadPdfToServer(pdfOutput);
    }
    

    uploadPdfToServer(pdfBlob: Blob): void
    {
      const formData = new FormData();
      formData.append('pdfFile', pdfBlob, 'document.pdf'); // 'pdfFile' is the field name on server

      // Send the FormData using Angular's HttpClient

      this.http.post('https://www.safetrack.live/lab/pdf/upload_pdf.php', formData).subscribe(
        (response) => {
          console.log('PDF uploaded successfully!', response);
        },
        (error) => {
          console.error('Error uploading PDF:', error);
        }
      );
      
    }


    testTable(): void {
      let quotas = this.createTestRecords();

      let position = 0;
      let pageSize = 10;

      let totalQuotas = quotas.length;
      let totalPages = Math.ceil(totalQuotas / pageSize);

  

      const head = [["Cuota", "Fecha", "Valor", "Pagado"]];

      const doc = new jsPDF();

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
          if(quotas[position]) 
          {
            const quota = quotas[position];
            data.push([quota.concept, quota.expiration, quota.value, quota.paid]);
            position++;
          }else 
          {
            data.push(['', '', '', '']);
          }
        }

        this.tabular(doc, head, data, currentBlock);
      }

        


      /*
      while (position < totalQuotas) {
        let pageQuotas = quotas.slice(position, position + pageSize);
        console.log(`Página ${Math.floor(position / pageSize) + 1}:`, pageQuotas);
        position += pageSize;

        for (let i = 0; i < pageQuotas.length; i++) {
        const quota = pageQuotas[i];
        data.push([quota.concept, quota.expiration, quota.value, quota.paid]);
        }
      this.tabular(doc, head, data);
      }*/

      doc.output('dataurlnewwindow');
    
    }

    tabular(doc: jsPDF, head: any[], data: any[], block: number): void 
    {
      // Implementación de la tabla
      let left = 10;
      let right = 10;

      if(block % 2 == 0) {
        left = 15;
        right = 10;
      }else{
        left = 105;
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
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      tableWidth: 85,
      styles: { fontSize: 9, cellPadding: 1, overflow: 'linebreak' }
    });

    }

    createTestRecords(): any[] {
      const records = [];
      for (let i = 1; i <= 100; i++) {
        records.push({
          concept: `Ordinaria ${i}`,
          expiration: '09/09/2025',
          value:   (Math.random() * 3 + 5).toFixed(7),
          paid: (Math.random() * 100).toFixed(7)
        });
      }
      return records;
    }
  }
