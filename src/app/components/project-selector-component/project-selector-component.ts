import { ChangeDetectorRef, Component } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import Project from '../../models/Project';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { ProjectCardComponent } from '../project-card-component/project-card-component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { displayHTML } from '../../commons/utils';

@Component({
  selector: 'app-project-selector-component',
  imports: [ProjectCardComponent, MatTooltipModule],
  templateUrl: './project-selector-component.html',
  styleUrl: './project-selector-component.css'
})
export class ProjectSelectorComponent {
  //projects: Project[];

  constructor(public projectService: ProjectService, public userService: UserService, private router: Router, private cdr: ChangeDetectorRef)
  {
    console.log('ProjectSelectorComponent initialized');
  }
  ngOnInit(): void 
  {
    let selected = this.projectService.getSelected();
    if(selected)
    {

      let button = document.getElementById('button-project-name');

      if(button != null) {

          button.innerHTML = selected.name;        
      }

      this.closeProjectSelector();
    }
  }

  openProjectSelector()
  {
    this.projectService.refillFiltered();
    
    displayHTML('project-selector', 'block');
    this.cdr.detectChanges();
  }

  closeProjectSelector() 
  {
    console.log('Toggling project selector visibility');

    let projectSelector = document.getElementById('project-selector');
    if (projectSelector) 
    {
      if(projectSelector.style.display === 'block') 
      {
        projectSelector.style.display = 'none';

        let currentProject = this.projectService.getSelected();
        if(!currentProject)
        {
          this.userService.clearUser();
          console.log('User logged out');
          this.router.navigate(['login']);
        }
      }else 
      {
        projectSelector.style.display = 'block';
      }
    }
  }

  onKeyup(event: any) 
  {
    console.log(event.target.value);
    
      const searchValue = (event.target as HTMLInputElement).value;
      this.projectService.getProjectsFiltered(searchValue);
      this.cdr.detectChanges();
  }
}
