import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// isAuthenticated = false
  constructor() { }
  
  IsLoggedIn(){
    // this.isAuthenticated = true
    return !!localStorage.getItem('user');
  }
}
