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
  userTemp: User | undefined;

    constructor(private http: HttpClient, public storageService: StorageService) 
    {
        this.user = undefined;
        this.userTemp = undefined;
    }

    login(data: any) {
        console.log('Login method called');
        return this.http.post<any>(API_URL+'loginWithProjects', data, httpOptions)
    }

    logout()
    {
        this.userTemp = undefined;
        this.user = undefined;
        this.storageService.clear();
    }

    setUser(user: User) {
        this.user = user;

        this.storageService.setItem('user', JSON.stringify(user));
        this.storageService.setItem('sessionToken', user.sessionToken);
    }

    setTempUser(user: User) {
        this.userTemp = user;
        this.storageService.setItem('tempUser', JSON.stringify(user));
    }

    clearUser() {
        this.user = undefined;
        this.userTemp = undefined;
        this.storageService.removeItem('user');
        this.storageService.removeItem('tempUser');
        this.storageService.removeItem('sessionToken');
    }

    loadUser() 
    {    
        const userData = this.storageService.getItem('user');
        if(userData) 
        {
            this.user = JSON.parse(userData);
        }else 
        {
            this.user = undefined;
        }
    }

    getUser(): User | undefined 
    {
        if (!this.user) {
            this.loadUser();
        }
        
        return this.user;
    }

    getTempUser(): User | undefined 
    {
        const tempUserData = this.storageService.getItem('tempUser');
        if (tempUserData) {
            this.userTemp = JSON.parse(tempUserData);
        } else {
            this.userTemp = undefined;
        }
        return this.userTemp;
    }

    confirmLogin(): Boolean
    {
        if(this.userTemp)
        {
            this.storageService.setItem('user', JSON.stringify(this.userTemp));
            this.user = this.userTemp;
            this.userTemp = undefined;

            console.log('User confirmed: ', this.user);
            return true;
        }

        return false;
    }

    isLoggedIn(): boolean 
    {
        this.loadUser();

        if(!this.user)
        {
            return false;
        }

        return true;
    }
}
