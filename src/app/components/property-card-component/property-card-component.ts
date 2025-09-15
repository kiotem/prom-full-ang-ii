import { Component, input, OnInit } from '@angular/core';
import Property from '../../models/Property';
import Project from '../../models/Project';
import { ProjectService } from '../../services/project-service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-property-card-component',
  imports: [DecimalPipe],
  templateUrl: './property-card-component.html',
  styleUrl: './property-card-component.css'
})
export class PropertyCardComponent implements OnInit
{
  property = input<Property>();
  project: Project | undefined;
  meterValue: number = 0;

  constructor(public projectService: ProjectService) 
  {
    // Initialize any necessary values here
  }
  ngOnInit(): void 
  {
    this.project = this.projectService.getSelected();
    this.meterValue = this.project?.meterValue || 0;
  }
}
