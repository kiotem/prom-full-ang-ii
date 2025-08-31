import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  pathPage: string;

  constructor() {
    this.pathPage = '';
  }

  setPathPage(path: string) {
    this.pathPage = path;
  }

  getPathPage(): string {
    return this.pathPage;
  }
}
