import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';

@Component({
  selector: 'app-properties-create-page',
  imports: [MenuComponent, ProjectSelectorComponent],
  templateUrl: './properties-create-page.html',
  styleUrls: ['./properties-create-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css']
})
export class PropertiesCreatePage {

}
