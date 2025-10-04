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

  getLinks() {
    // Logic to retrieve links
  }

  createLink(link: Link) {
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

  savePaymentLink(sale: Sale, wompiObject: any, callback: (success: boolean, data: any) => void)
  {
    let json = 
    {
      saleObject: sale,
      wompiObject: wompiObject
    };
    
    console.log('savePaymentLink method called');
    this.http.post<any>(API_URL+'savePaymentLink', json, httpOptions).subscribe(
      response => {
        console.log('Payment link saved successfully:', response);
        callback(true, response);
      },
      error => {
        console.error('Error saving payment link:', error);
        callback(false, error);
      }
    );
  }

  download(data: any)
  {
    console.log('downloadLinks method called');
    return this.http.post<any>(API_URL+'getLinks', data, httpOptions);
  }
}
