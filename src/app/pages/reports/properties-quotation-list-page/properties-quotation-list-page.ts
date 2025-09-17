import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties-quotation-list-page',
  imports: [MenuComponent, LoaderComponent, ProjectSelectorComponent],
  templateUrl: './properties-quotation-list-page.html',
  styleUrls: ['./properties-quotation-list-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css']
})
export class PropertiesQuotationListPage {

  constructor(private router: Router) {

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
