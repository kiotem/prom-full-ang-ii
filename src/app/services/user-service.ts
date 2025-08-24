import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/User';
import { API_URL, httpOptions } from '../commons/enviroments';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | undefined;

    constructor(private http: HttpClient, public storageService: StorageService) 
    {
        // Initialize user if needed
        this.user = undefined;
    }

    login(data: any) {
        console.log('Login method called');
        //return this.http.post<any>(API_URL+'login', data, httpOptions)
        return this.http.post<any>(API_URL+'loginWithProjects', data, httpOptions)
    }

    logout()
    {
        this.storageService.clear();
    }

    setUser(user: User) {
        this.user = user;

        this.storageService.setItem('user', JSON.stringify(user));
        this.storageService.setItem('sessionToken', user.sessionToken);
    }

    clearUser() {
        this.user = undefined;
        this.storageService.setItem('user', '');
    }

    loadUser() {    
        const userData = this.storageService.getItem('user');
        if (userData) {
            this.user = JSON.parse(userData);
        } else {
            this.user = undefined;
        }
    }

    getUser(): User | undefined {
        if (!this.user) {
            this.loadUser();
        }
        return this.user;
    }
}
