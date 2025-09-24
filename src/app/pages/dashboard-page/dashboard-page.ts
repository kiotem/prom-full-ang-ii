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
