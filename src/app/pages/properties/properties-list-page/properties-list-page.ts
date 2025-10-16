import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectService } from '../../../services/project-service';
import { PropertyService } from '../../../services/property-service';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from "../../../components/loader-component/loader-component";
import { LoaderService } from '../../../services/loader-service';
import { Router } from '@angular/router';
import { PropertyCreateComponent } from "../../../components/property-create-component/property-create-component";
import { displayHTML } from '../../../commons/utils';

@Component({
  selector: 'app-properties-list-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, PropertyCreateComponent],
  templateUrl: './properties-list-page.html',
  styleUrls: ['./properties-list-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css']
})


export class PropertiesListPage implements OnInit
{
  constructor(public router: Router, public propertyService: PropertyService, private cdr: ChangeDetectorRef, public projectService: ProjectService, public loaderService: LoaderService) 
  {

  }

  ngOnInit(): void 
  {
    let selectedProject = this.projectService.getSelected();
    if(selectedProject?.objectId)
    {
    let json = {project: selectedProject.objectId};
        console.log('Search criteria:', json);
      this.download(json);
    }
  }

  onKeyup(event: KeyboardEvent): void
  {
      console.log('Key pressed:', event.key);
      this.checkFilter();
  }

  convertTimeToLocal(time: any): string 
  {
      const date = new Date(time);
      return date.toLocaleString();
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
      if(s_status)
      {
        let searchValue = (i_search as HTMLInputElement).value.toUpperCase();
        let statusValue = (s_status as HTMLSelectElement).value;

        jsonSearch = {project: currentProject.objectId, search: searchValue, status: statusValue}
      }

      this.download(jsonSearch);
    }
  }

  download(json: any) {
      this.loaderService.show();
    this.propertyService.getProperties(json).subscribe({
      next: (data) => {
        this.loaderService.hide();
        console.log('Properties fetched successfully:', data);
        //this.properties = data.result;

        this.propertyService.setData(data.result);
        // Then here:
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loaderService.hide();
        console.error('Error fetching properties:', error);
      }
    });
  }

  goCreate(): void {
    //this.router.navigate(['properties/create']);
    displayHTML('property-create-component', 'block');
  }

  goMap(): void {
    this.router.navigate(['properties/map']);
  }
}
