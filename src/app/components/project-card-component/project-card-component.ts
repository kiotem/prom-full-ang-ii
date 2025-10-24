import { Component, input } from '@angular/core';
import Project from '../../models/Project';
import { ProjectService } from '../../services/project-service';
import { Router } from '@angular/router';
import { setValueToField } from '../../commons/utils';

@Component({
  selector: 'app-project-card-component',
  imports: [],
  templateUrl: './project-card-component.html',
  styleUrl: './project-card-component.css'
})
export class ProjectCardComponent {
project = input<Project>();

  currentProject: Project | undefined;

  constructor(private projectService: ProjectService, private router: Router) 
  {
    console.log('ProjectCard component initialized');
  } 

  changeProject(newProject: Project | undefined) 
  {
      if(newProject != undefined) {
      this.currentProject = newProject;

      this.projectService.setSelected(this.currentProject);

      let button = document.getElementById('button-project-name');

      if(button != null) {
        if(this.currentProject != undefined) 
          {
            button.innerHTML = this.currentProject.name;

            let projectSelector = document.getElementById('project-selector');

            if(projectSelector) 
            {
              projectSelector.style.display = 'none';
            }
        }
      }else{
        console.log('Button not found');
      }

      //window.location.reload();
      setValueToField('i_search_project', '');
      this.projectService.refillFiltered();
      this.router.navigate(['dashboard']);
    }
    
  }
}
