import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface Topic {
    id: number;
    name: string;
    description: string;
    updatedAt: string;
    userCount?: number;

    loadingUsers?: boolean;
    loadingNotifications?: boolean;
    expanded?: boolean;

    DeviceTopics?: {
      id: number;
      Device?: {
        id: number;
        platform?: string;
        User?: {
          nip: string;
          name?: string;
        };
      };
    }[];
}

export interface TopicUser {
    nip: string;
    name: string;
    department: string;
    platform: string;
}

export interface TopicNotification {
    title: string;
    body: string;
    sendBy: string;
    status: string;
    createdAt: string;
}

interface TopicPayload {
  name: string;
  description: string;
}
  

@Injectable({ providedIn: 'root' })
export class TopicService {
    private api = environment.apiUrl; 

    constructor(private http: HttpClient) {}

    getTopics(): Observable<{ topics: Topic[] }> {
        return this.http.get<{ topics: Topic[] }>(`${this.api}/admin/topics`);
    }

    createTopic(payload: TopicPayload): Observable<any> {
      return this.http.post(`${this.api}/admin/create-topic`, payload);
    }

    getUsersByTopic(id: number): Observable<TopicUser[]> {
        return this.http
          .get<{ users: any[] }>(
            `${this.api}/admin/topic/${id}/users`
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

    getNotificationsByTopic(id: number): Observable<TopicNotification[]>{
        return this.http
          .get<{ notifications: any[] }>(
            `${this.api}/admin/topic/${id}/notifications`
          )
          .pipe(
            map(response =>
              response.notifications.map(notif => {
      
                return {
                  title: notif?.title ?? '—',
                  body: notif?.body ?? '-',
                  sendBy: notif?.sendBy ?? '-',
                  createdAt: notif?.createdAt ?? '-',
                  status: notif?.status ?? '-'
                };
              })
            )
        );
    }

    getTopicById(id: number) {
      return this.http.get<{ topic: Topic }>(`${this.api}/admin/topic/${id}`);
    }

    updateTopic(
      id: number,
      payload: { name: string; description: string }
    ) {
      return this.http.put<{
        message: string;
        topics: Topic[];
      }>(
        `${this.api}/admin/topic/${id}/edit`,
        payload
      );
    }

    subscribeUsers(id: number, nips: string[]): Observable<any> {
        return this.http.post(`${this.api}/admin/topic/${id}/assign`, { nips });
    }

    unsubscribeUsers(id: number, nips: string[]): Observable<any> {
    return this.http.delete(`${this.api}/admin/topic/${id}/unassign`, { body: { nips }});
    }
}
