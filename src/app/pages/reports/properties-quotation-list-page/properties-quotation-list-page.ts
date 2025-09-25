import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SaleService } from '../../../services/sale-service';
import { LoaderService } from '../../../services/loader-service';
import { getTextFromField } from '../../../commons/utils';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-properties-quotation-list-page',
  imports: [MenuComponent, LoaderComponent, ProjectSelectorComponent,MatInputModule, MatDatepickerModule, ReactiveFormsModule, LoaderComponent, DecimalPipe],
  templateUrl: './properties-quotation-list-page.html',
  styleUrls: ['./properties-quotation-list-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css'],
    providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesQuotationListPage implements OnInit {

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private router: Router, public salesService: SaleService, private loaderService: LoaderService, private cdr: ChangeDetectorRef) {
    let today = new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
    let startDate = new Date(today + ' 00:00:00').toISOString();
    let endDate = new Date(today + ' 00:00:00').toISOString();


    this.range.setValue({start: new Date(startDate), end: new Date(endDate)});
    console.log('Initial range:', this.range.value);
    
    this.range.valueChanges.subscribe(newValue => {
    console.log('Reactive Form value changed:', newValue);

    if(!this.range.invalid) 
    {
      this.download({});
    }

    //this.list();
    });

  }

  ngOnInit(): void {
    console.log('Component initialized with range:', this.range.value);
    //this.list();
    this.download({});
  }


  goCreate(): void{
    console.log("Go to create new quotation");
    this.router.navigate(['properties/quotation']);
  }

  onKeyup(event: KeyboardEvent): void
  {
      console.log('Key pressed:', event.key);
      //this.checkFilter();
      if (event.key === 'Enter') 
      {
        this.download({});
      }
  }

  convertTimeToLocal(time: any): string 
  {
      const date = new Date(time);
      return date.toLocaleString();
  }

  onChangeStatus(event: any): void 
  {
    console.log('Status changed:', event.target.value); 
    //this.checkFilter();
    let search = getTextFromField('i_search');
    if(search.length > 2)
    {
      this.download({});
    }
  }

    download(jsont: any) 
    {
    let search = getTextFromField('i_search');
    let searchBy = getTextFromField('s_status');

    let startDate = this.range.value.start ? this.range.value.start.toISOString() : null;
    let endDate = this.range.value.end ? this.range.value.end.toISOString() : null;

    if(endDate) {
      const end = new Date(this.range.value.end!);
      end.setDate(end.getDate() + 1);
      endDate = end.toISOString();
    }

    let json =
    {
      search: search,
      searchBy: searchBy,
      start: startDate,
      end: endDate
    }

    console.log('Downloading sales with parameters:', json);

    this.loaderService.show();
    this.salesService.list(json).subscribe({
      next: (data) => {
        this.loaderService.hide();
        console.log('Sales fetched successfully:', data);
        //this.properties = data.result;
        let sales = data.result.sales;
        let size = sales.length;
        console.log('Number of sales received:', size);
        // Fill the service's sales array
        this.salesService.fill(sales);

        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loaderService.hide();
        console.error('Error fetching properties:', error);
      }
    });
  }

}
