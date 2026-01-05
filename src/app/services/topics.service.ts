import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Topic {
    id: number;
    name: string;
    description: string;
    updatedAt: string;
    users?: TopicUser[];
    notifications?: TopicNotification[];
    loadingUsers?: boolean;
    loadingNotifications?: boolean;
    expanded?: boolean;
}

export interface TopicUser {
    // name: string;
    users: {
      nip: string;
      name: string;
      platform: string;
    }[];
}

export interface TopicNotification {
    // name: string;
    notifications: {
      title: string;
      body: string;
      platform: string;
      sendBy: string;
      link: string;
      status: string;
      createdAt: string;
    }[];
}
  

@Injectable({ providedIn: 'root' })
export class TopicService {
    private api = environment.apiUrl; 

    constructor(private http: HttpClient) {}

    getTopics(): Observable<{ topics: Topic[] }> {
        return this.http.get<{ topics: Topic[] }>(`${this.api}/admin/topics`);
    }

    getUsersByTopic(id: number):  Observable<{ users: TopicUser[] }>{
        return this.http.get<{ users: TopicUser[] }>(`${this.api}/admin/topics/${id}/users`);
    }

    getNotificationsByTopic(id: number): Observable<{ notifications: TopicNotification[] }>{
        return this.http.get<{ notifications: TopicNotification[] }>(`${this.api}/admin/topics/${id}/notifications`);
    }

    subscribeUser(id: number, nip: string): Observable<any> {
        return this.http.post(`${this.api}/admin/topics/${id}/assign`, { nips: [nip] });
    }

    unsubscribeUser(id: number, nip: string): Observable<any> {
    return this.http.post(`${this.api}/admin/topics/${id}/unassign`, { nips: [nip] });
    }
}
