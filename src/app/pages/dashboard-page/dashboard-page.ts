import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from "../../components/project-selector-component/project-selector-component";

@Component({
  selector: 'app-dashboard-page',
  imports: [MenuComponent, ProjectSelectorComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css'
})
export class DashboardPage 
{

}
