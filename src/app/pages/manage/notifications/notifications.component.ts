import { Component, OnInit } from '@angular/core';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { NotificationsTableComponent } from '../../../shared/components/tables/notifications-table/notifications-table.component';
import { NotificationService, NotificationUser, Notification } from '../../../services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-tables',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    NotificationsTableComponent
  ],
  templateUrl: './notifications.component.html',
  styles: ``
})

export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  users: NotificationUser[] = [];

  loading = true;
  error = '';

  breadcrumbs = [
    { label: 'Dashboard', url: '/' },
    { label: 'Notification' }
  ];

  constructor(private notificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;
    this.notificationService.getNotifications().subscribe({
      next: (res) => {
        this.notifications = res.notifications.map(notif => {
          const uniqueNips = new Set(
            notif.DeviceNotifications
              ?.map(dn => dn?.Device?.nip ?? dn?.Device?.nip)
              .filter(Boolean)
          );
  
          return {
            ...notif,
            topic: notif.Topic?.name,
            userCount: uniqueNips.size
          };
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load notifications';
        this.loading = false;
      }
    });
  }

  openDetails(notif: Notification) {
    this.router.navigate(['/notification', notif.id, 'details']);
  }

  sendNotificationToUsers() {
    this.router.navigate(['/notification/send-users']);
  }

  sendNotificationToTopic() {
    this.router.navigate(['/notification/send-topic']);
  }

  getUsersByNotification(notificationId: number) {
    this.notificationService.getUsersByNotification(notificationId).subscribe(users => {
      console.log('Users of notification:', users);
    });
  }
}
