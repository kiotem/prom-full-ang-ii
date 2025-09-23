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

    onGenerateTable(): void 
    {
          const head = [["ID", "Country", "Index", "Capital"]];
    const data = [
      [1, "Finland", 7.632, "Helsinki"],
      [2, "Norway", 7.594, "Oslo"],
      [3, "Denmark", 7.555, "Copenhagen"],
      [4, "Iceland", 7.495, "Reykjavík"],
      [5, "Switzerland", 7.487, "Bern"],
      [9, "Sweden", 7.314, "Stockholm"],
      [73, "Belarus", 5.483, "Minsk"]
    ];

    const doc = new jsPDF();
    autoTable(doc, {
      head: head,
      body: data,
      didDrawCell: data => {
        //console.log(data.column.index);
      },
      headStyles: { fillColor: [22, 160, 133], lineColor: [0, 0, 0], lineWidth: 0.1 },
      columnStyles: { 
        0: { cellWidth: 10, lineColor: [0, 0, 0], lineWidth: 0.1 }, // ID
        1: { cellWidth: 40, lineColor: [0, 0, 0], lineWidth: 0.1 }, // Country
        2: { cellWidth: 30, halign: 'right', lineColor: [0, 0, 0], lineWidth: 0.1 }, // Index
        3: { cellWidth: 40, lineColor: [0, 0, 0], lineWidth: 0.1 } // Capital
      },
      margin: { top: 10, left: 10, right: 10, bottom: 10 },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      tableWidth: 120,
      styles: { fontSize: 10 }
    });

     doc.save("table.pdf");
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
}
