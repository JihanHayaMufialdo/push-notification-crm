import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface User {
    nip: string;
    name: string;
    department: string;
}
  

@Injectable({ providedIn: 'root' })
export class UserService {
    private api = environment.apiUrl; 

    constructor(private http: HttpClient) {}

    getUsers(): Observable<{ users: User[] }> {
        return this.http.get<{ users: User[] }>(`${this.api}/admin/users`);
    }
}
