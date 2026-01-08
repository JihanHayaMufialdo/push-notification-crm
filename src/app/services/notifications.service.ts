import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface Notification {
  id: number;
  createdAt: string;
  title: string;
  body: string;
  link: string;
  sendBy: string;
  status: string;

  topic?: string;
  userCount?: number;

  Topic?: {
    name: string;
  } | null;

  DeviceNotifications?: {
    status: string;
    Device?: {
      platform: string;
      nip: string;
    };
  }[];
}

export interface NotificationUser {
    nip: string;
    status: string;
    platforms: string[];
}

export interface SendToUsersPayload {
  title: string;
  body: string;
  link: string;
  nips: string[];
}

export interface SendToTopicPayload {
  topicId: number;
  title: string;
  body: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    private api = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getNotifications(): Observable<{ notifications: Notification[] }> {
        return this.http.get<{ notifications: Notification[] }>(`${this.api}/admin/notifications`);
    }

    getNotificationById(id: number) {
        return this.http.get<{ notification: Notification }>(`${this.api}/admin/notification/${id}`);
    }

    getUsersByNotification(id: number): Observable<NotificationUser[]> {
      return this.http
        .get<{ users: any[] }>(`${this.api}/admin/notification/${id}/users`)
        .pipe(
          map(response => {
            const userMap = new Map<string, NotificationUser>();
    
            response.users.forEach(user => {
              const nip = user.Device?.nip;
              const platform = user.Device?.platform;
              const status = user.status;
    
              if (!nip) return;
    
              if (!userMap.has(nip)) {
                userMap.set(nip, {
                  nip,
                  status,
                  platforms: platform ? [platform] : []
                });
              } else if (platform) {
                const item = userMap.get(nip)!;
    
                if (!item.platforms.includes(platform)) {
                  item.platforms.push(platform);
                }
              }
            });
    
            return Array.from(userMap.values());
          })
        );
    }
    

    sendToUsers(payload: SendToUsersPayload): Observable<any> {
      return this.http.post(
        `${this.api}/admin/notification/send-users`,
        payload
      );
    }

    sendToTopic(payload: SendToTopicPayload): Observable<any> {
      return this.http.post(
        `${this.api}/admin/notification/send-topic`,
        payload
      );
    }
}
