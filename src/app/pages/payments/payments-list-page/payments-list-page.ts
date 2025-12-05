import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ProjectService } from '../../../services/project-service';
import { Utils, displayHTML } from '../../../commons/utils';
import { PaymentCreateComponent } from '../../../components/payment-create-component/payment-create-component';

@Component({
  selector: 'app-payments-list-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, MatInputModule, MatDatepickerModule, ReactiveFormsModule, PaymentCreateComponent],
  templateUrl: './payments-list-page.html',
  styleUrls: ['./payments-list-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsListPage 
{
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private cdr: ChangeDetectorRef, private projectService: ProjectService) {
    let today = new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
    let startDate = new Date(today + ' 00:00:00').toISOString();
    let endDate = new Date(today + ' 00:00:00').toISOString();


    this.range.setValue({start: new Date(startDate), end: new Date(endDate)});
    console.log('Initial range:', this.range.value);

    //this.project = this.projectService.getSelected();


    //this.checkFilters();
  }

  



  onKeyUp(event: any) {
    console.log('Key up event:', event);
  }

  onChangeStatus(event: any) {
    console.log('Status changed:', event);
  }

goCreate() 
  {
    console.log('Opening payment create modal');
    displayHTML('payment-create-component', 'block');
  }

  paymentCreated(payment: any): void {
    console.log('Payment created event received:', payment);
    // Aquí podrías agregar el pago a una lista o refrescar los datos
    this.cdr.detectChanges();
  }

  onDestroy()
  {
    console.log('LinksListPage destroyed');
    //this.linkService.reset();
    this.cdr.detectChanges();
  }

  goSearch()
  {
    console.log('Go to search links page');
    this.checkFilters();
  }

  checkFilters()
  {
    console.log('Check filters with range:', this.range.value);
  }

  convertTimeToLocal(time: any): string 
  {
      const date = new Date(time);
      return date.toLocaleString();
  }


}
