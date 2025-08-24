import { Injectable } from '@angular/core';
import Project from '../models/Project';
import { HttpClient } from '@angular/common/http';
import User from '../models/User';
import { API_URL, httpOptions } from '../commons/enviroments';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [];

  constructor(private http: HttpClient, public storageService: StorageService) {
    // Initialize projects if needed
    this.projects = [];
  }
  // Angular services do not implement OnInit; remove ngOnInit.
  // Add useful methods for managing projects:

  downloadProjects(user: User) 
  {
      console.log('downloadProjects method called');
      return this.http.post<any>(API_URL+'getProjects', user, httpOptions)
  }

  resetProjects(): void {
    this.projects = [];
  }

  reloadProjects(): Project[] {
    this.projects = [];

    let storedProjects = this.storageService.getItem('projects');
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects) as Project[];
    }else 
    {
      console.warn('No projects found in session storage');
    }

    return this.projects;
  }

  setCurentProject(project: Project): void {
    console.log('Setting current project:', project);
    this.storageService.setItem('currentProject', JSON.stringify(project));
  }

  getCurrentProject(): Project | undefined {
    const storedProject = this.storageService.getItem('currentProject');
    if (storedProject) {
      return JSON.parse(storedProject) as Project;
    }
    return undefined;
  }

  getProjects(): Project[] {
    return this.projects;
  }

  addProject(project: Project): void {
    console.log('Adding project:', project);
    
    this.projects.push(project);
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.objectId === id);
  }

  updateProject(updatedProject: Project): void {
    const index = this.projects.findIndex(project => project.objectId === updatedProject.objectId);
    if (index !== -1) {
      this.projects[index] = updatedProject;
    }
  }

  deleteProject(id: string): void {
    this.projects = this.projects.filter(project => project.objectId !== id);
  }

  ngOnInit(): void {
    // This method is not needed in services, remove it.
    // If you need to perform initialization logic, do it in the constructor or create a separate init method.
    
  }

  getProjectsByUser(json: any)
  {
    console.log('getProjectsByUser method called with search:', json);
    return this.http.post<any>(API_URL+'getProjectsByUser', json, httpOptions)
  }
}
