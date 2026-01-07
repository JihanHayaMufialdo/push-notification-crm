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

  Devices?: {
    id: number;
    platform?: string;
    User?: {
      nip: string;
      name?: string;
    };
  }[];
}

export interface NotificationUser {
    nip: string;
    name: string;
    department: string;
    platform: string;
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
        .get<{ users: any[] }>(
            `${this.api}/admin/notification/${id}/users`
        )
        .pipe(
            map(response =>
              response.users.map(user => {
                const device = user.Device;
                const deviceUser = device?.User;
      
                return {
                  nip: deviceUser?.nip ?? '—',
                  name: deviceUser?.name ?? '-',
                  department: deviceUser?.department ?? '-',
                  platform: device?.platform ?? '-'
                };
              })
            )
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
