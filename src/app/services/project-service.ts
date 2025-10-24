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
  selectedProject: Project | undefined;

  constructor(private http: HttpClient, public storageService: StorageService) {
    this.projects = [];
    this.selectedProject = undefined;
  }

  download(user: User)
  {
      console.log('downloadProjects method called');
      return this.http.post<any>(API_URL+'getProjects', user, httpOptions)
  }

  ngOnInit(): void 
  {
    // This method is not needed in services, remove it.
    // If you need to perform initialization logic, do it in the constructor or create a separate init method.
  }

  fill(projects: Project[]): void 
  {
    this.projects = projects;
    this.storageService.setItem('projects', JSON.stringify(this.projects));
    this.storageService.removeItem('selectedProject');

    console.log('Projects filled:', this.projects);
  }

  getProjects(): Project[] {
    let storedProjects = this.storageService.getItem('projects');
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects) as Project[];
    }
    return this.projects;
  }

  setSelected(project: Project): void 
  {
    this.storageService.setItem('selectedProject', JSON.stringify(project));
    this.selectedProject = project;
  }

  getSelected(): Project | undefined 
  {
    const storedProject = this.storageService.getItem('selectedProject');
    if (storedProject) {
      this.selectedProject = JSON.parse(storedProject) as Project;
    }
    return this.selectedProject;
  }

/*
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
  }*/

/*
  getProjectsByUser(json: any)
  {
    console.log('getProjectsByUser method called with search:', json);
    return this.http.post<any>(API_URL+'getProjectsByUser', json, httpOptions)
  }*/
}
