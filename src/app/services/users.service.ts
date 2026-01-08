import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface User {
    nip: string;
}
  

@Injectable({ providedIn: 'root' })
export class UserService {
    private api = environment.apiUrl; 

    constructor(private http: HttpClient) {}

    getUsers(): Observable<{ devices: User[] }> {
        return this.http
          .get<{ devices: User[] }>(`${this.api}/admin/devices`)
          .pipe(
            map(res => ({
              devices: Array.from(
                new Map(res.devices.map(u => [u.nip, u])).values()
              )
            }))
          );
    }

    getActiveUsers(): Observable<{ devices: User[] }> {
        return this.http
          .get<{ devices: User[] }>(`${this.api}/admin/active-devices`)
          .pipe(
            map(res => ({
              devices: Array.from(
                new Map(res.devices.map(u => [u.nip, u])).values()
              )
            }))
          );
    }
      
}
