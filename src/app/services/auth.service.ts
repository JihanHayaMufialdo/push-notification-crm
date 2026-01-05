import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;
  private tokenKey = 'access_token'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>(`${this.api}/auth/signin`, credentials);
  }

  logout(){
    // return this.http.post(`${this.api}/auth/signout`, {});
    return this.http.post(`${this.api}/auth/signout`, {}).subscribe({
        next: () => {
          localStorage.removeItem(this.tokenKey); 
          this.router.navigate(['/signin']);      
        },
        error: () => {
          localStorage.removeItem('access_token');
          this.router.navigate(['/signin']);
        }
      });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
