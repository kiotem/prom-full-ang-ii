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
}
