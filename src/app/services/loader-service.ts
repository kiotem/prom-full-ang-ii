import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  visible: boolean;

  constructor() {
    this.visible = false;
  }

  getStatus(): boolean {
    return this.visible;
  }

  show() {
    this.visible = true;
    const loaderComponent = document.getElementById('loader-component');
    if (loaderComponent) {
      loaderComponent.style.visibility = 'visible';
    }
  }

  hide() {
    this.visible = false;
    const loaderComponent = document.getElementById('loader-component');
    if (loaderComponent) {
      loaderComponent.style.visibility = 'hidden';
    }
  }
}
