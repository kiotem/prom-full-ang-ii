import { Injectable } from '@angular/core';
import Link from '../models/Link';
import { API_URL, httpOptions } from '../commons/enviroments';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage-service';
import Sale from '../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class LinkService 
{
  links: Link[];
  
  constructor(private http: HttpClient, public storageService: StorageService) 
  {
    this.links = [];
  }

  save(saleObject: Sale, wompiObject: any, callback: (data: any, success: boolean) => void)
  {    
    console.log('saveLink method called');
    this.http.post<any>(API_URL+'saveLink', { saleObject: saleObject, wompiObject: wompiObject }, httpOptions).subscribe(
      response => {
        console.log('Payment link saved successfully:', response);
        callback(response, true);
      },
      error => {
        console.error('Error saving payment link:', error);
        callback(error, false);
      }
    );
  }

  getLinks()
  {
    // Logic to retrieve links
  }

  createLink(link: Link) 
  {
    // Logic to create a new link
  }

  updateLink(link: Link) {
    // Logic to update an existing link
  }

  deleteLink(linkID: string) 
  {
    // Logic to delete a link
  }

  fill(links: Link[]): void 
  {
    this.links = links;
    /*
      this.links = links;
      this.storageService.setItem('links', JSON.stringify(this.links));
      console.log('Links filled:', this.links);
    */
  }

  download(data: any, callback : (sucess: boolean, linkResponse: any) => void)
  {
    console.log('downloadLinks method called');
    this.http.post<any>(API_URL+'linksList', data, httpOptions).subscribe(
      response => {
        console.log('Links downloaded successfully:', response);
        callback(true, response);
      },
      error => 
      {
        console.error('Error downloading links:', error);
        callback(false, error);
      }
    );
  }
}
