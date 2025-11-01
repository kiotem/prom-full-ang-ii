import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LinkService } from '../../../services/link-service';
import { getTextFromField } from '../../../commons/utils';
import { DecimalPipe } from '@angular/common';
import Project from '../../../models/Project';
import { ProjectService } from '../../../services/project-service';

@Component({
  selector: 'app-links-list-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, MatInputModule, MatDatepickerModule, ReactiveFormsModule, DecimalPipe],
  templateUrl: './links-list-page.html',
  styleUrls: ['./links-list-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksListPage 
{
  project: Project | undefined;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(public linkService: LinkService, private cdr: ChangeDetectorRef, private projectService: ProjectService) {
    let today = new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
    let startDate = new Date(today + ' 00:00:00').toISOString();
    let endDate = new Date(today + ' 00:00:00').toISOString();


    this.range.setValue({start: new Date(startDate), end: new Date(endDate)});
    console.log('Initial range:', this.range.value);

    this.project = this.projectService.getSelected();

    /*
    this.range.valueChanges.subscribe(newValue => {
    console.log('Reactive Form value changed:', newValue);

    if(!this.range.invalid) 
    {
      //this.download({});
    }

    //this.list();
    });*/

    this.checkFilters();
  }

  onKeyUp(event: any) {
    console.log('Key up event:', event);
  }

  onChangeStatus(event: any) {
    console.log('Status changed:', event);
  }

  goCreate() 
  {
    console.log('Go to create link page');
  }

  onDestroy()
  {
    console.log('LinksListPage destroyed');
    this.linkService.reset();
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

    let search = getTextFromField('i_search');
    let searchBy = getTextFromField('s_status');

    let startDate = this.range.value.start ? this.range.value.start.toISOString() : null;
    let endDate = this.range.value.end ? this.range.value.end.toISOString() : null;

    if(endDate) 
    {
      const end = new Date(this.range.value.end!);
      end.setDate(end.getDate() + 1);
      endDate = end.toISOString();
    }

    console.log('Computed startDate:', startDate, 'endDate:', endDate);

    let json =
    {
      search: search,
      searchBy: searchBy,
      start: startDate,
      end: endDate,
      projectId: this.project!.objectId
    }

    this.download(json);
  }

  download(json: any)
  {
  
    this.linkService.download(json, (success: boolean, linkResponse: any) => {
      if (success) {
        console.log('Links downloaded successfully:', linkResponse);
        this.linkService.links = linkResponse.result.links;
        this.cdr.detectChanges();

      } else {
        console.error('Error downloading links:', linkResponse);
      }
    });
  }

  toggleStatusDropdown() {
    console.log('Toggle status dropdown');
    const dropdown = document.getElementById('s_status');
    if (dropdown) {
      dropdown.classList.toggle('show');
    } else {
      console.warn('Dropdown element not found');
    }
  }

  convertTimeToLocal(time: any): string 
  {
      const date = new Date(time);
      return date.toLocaleString();
  }
}
