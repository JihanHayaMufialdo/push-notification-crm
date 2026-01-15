import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;
  private tokenKey = 'access_token'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>(`${this.api}/auth/signin`, credentials);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/signin']);
  }  

  // logout(){
  //   // return this.http.post(`${this.api}/auth/signout`, {});
  //   return this.http.post(`${this.api}/auth/signout`, {}).subscribe({
  //       next: () => {
  //         localStorage.removeItem(this.tokenKey); 
  //         this.router.navigate(['/signin']);      
  //       },
  //       error: () => {
  //         localStorage.removeItem(this.tokenKey);
  //         this.router.navigate(['/signin']);
  //       }
  //     });
  // }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
