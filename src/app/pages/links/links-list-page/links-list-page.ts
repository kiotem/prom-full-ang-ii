import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';

@Component({
  selector: 'app-links-list-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent],
  templateUrl: './links-list-page.html',
  styleUrls: ['./links-list-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css']
})
export class LinksListPage {
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
