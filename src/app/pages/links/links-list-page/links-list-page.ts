import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-links-list-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './links-list-page.html',
  styleUrls: ['./links-list-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksListPage {

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor() {
    let today = new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
    let startDate = new Date(today + ' 00:00:00').toISOString();
    let endDate = new Date(today + ' 00:00:00').toISOString();


    this.range.setValue({start: new Date(startDate), end: new Date(endDate)});
    console.log('Initial range:', this.range.value);
    
    this.range.valueChanges.subscribe(newValue => {
    console.log('Reactive Form value changed:', newValue);

    if(!this.range.invalid) 
    {
      //this.download({});
    }

    //this.list();
    });
  }

    onKeyUp(event: any) {
    console.log('Key up event:', event);
  }

  onChangeStatus(event: any) {
    console.log('Status changed:', event);
  }

  goCreate() {
    console.log('Go to create link page');
  }
}
