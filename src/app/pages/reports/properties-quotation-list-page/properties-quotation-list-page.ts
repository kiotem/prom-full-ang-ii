import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-properties-quotation-list-page',
  imports: [MenuComponent, LoaderComponent, ProjectSelectorComponent,MatInputModule, MatDatepickerModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './properties-quotation-list-page.html',
  styleUrls: ['./properties-quotation-list-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css'],
    providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesQuotationListPage {

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private router: Router) {
    let today = new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
    let startDate = new Date(today + ' 00:00:00').toISOString();
    let endDate = new Date(today + ' 23:59:59').toISOString();


    this.range.setValue({start: new Date(startDate), end: new Date(endDate)});
    console.log('Initial range:', this.range.value);
    

  }


  goCreate(): void{
    console.log("Go to create new quotation");
    this.router.navigate(['properties/quotation']);
  }

  onKeyup(event: KeyboardEvent): void
  {
      console.log('Key pressed:', event.key);
      //this.checkFilter();
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
  }

}
