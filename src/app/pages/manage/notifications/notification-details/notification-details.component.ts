import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { NotificationDetailsTableComponent } from '../../../../shared/components/tables/notification-details-table/notification-details-table.component';
import { NotificationService, Notification, NotificationUser } from '../../../../services/notifications.service';

@Component({
  selector: 'app-notification-details',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    NotificationDetailsTableComponent,
  ],
  templateUrl: './notification-details.component.html',
})

export class NotificationDetailsComponent implements OnInit {
  id!: number;
  users: NotificationUser[] = [];
  notification!: Notification;

  loading = true;
  error = '';
  
  loadingNotifications = true;
  errorNotifications = '';

  breadcrumbs = [
    { label: 'Dashboard', url: '/' },
    { label: 'Notification', url: '/notifications' },
    { label: 'Notification Details' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  

    this.notificationService.getNotificationById(this.id).subscribe({
      next: (res) => {
        this.notification = res.notification; 
        this.loadUsers();        
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadUsers() {
    this.loading = true;
    this.error = '';

    this.notificationService.getUsersByNotification(this.id).subscribe({
      next: (users) => {
        this.users = users;          
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }
}
