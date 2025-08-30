import { ChangeDetectorRef, Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import Property from '../../../models/Property';
import { ProjectService } from '../../../services/project-service';
import { PropertyService } from '../../../services/property-service';

@Component({
  selector: 'app-properties-list-page',
  imports: [MenuComponent],
  templateUrl: './properties-list-page.html',
  styleUrls: ['./properties-list-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css']
})

export class PropertiesListPage 
{
  constructor(public propertyService: PropertyService, private cdr: ChangeDetectorRef, public projectService: ProjectService) {
    
  }
  
  onKeyup(event: KeyboardEvent): void
  {
      console.log('Key pressed:', event.key);
      this.checkFilter();
  }

  onChangeStatus(event: any): void 
  {
    console.log('Status changed:', event.target.value); 
    this.checkFilter();
  }

  checkFilter(): void
  {
    let currentProject = this.projectService.getSelected() ;
    
    if (currentProject) {
        let jsonSearch: any = {project: currentProject.objectId};

      let i_search = document.getElementById('i_search');
      

      if (i_search) {
        let searchValue = (i_search as HTMLInputElement).value.toUpperCase();

        jsonSearch = {project: currentProject.objectId, search: searchValue}
      }

      let s_status = document.getElementById('s_status');
      if (s_status) 
      {
        let searchValue = (i_search as HTMLInputElement).value.toUpperCase();
        let statusValue = (s_status as HTMLSelectElement).value;

        jsonSearch = {project: currentProject.objectId, search: searchValue, status: statusValue}
      }

      this.getProperties(jsonSearch);
    }
  }

    getProperties(json: any) {
    this.propertyService.getProperties(json).subscribe({
      next: (data) => {
        console.log('Properties fetched successfully:', data);
        //this.properties = data.result;

        this.propertyService.setData(data.result);
        // Then here:
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching properties:', error);
      }
    });
  }

}
