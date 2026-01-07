import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { SendUsersNotificationFormComponent } from '../../../../shared/components/form/form-elements/send-users-notification/send-users-notification-form.component';
import { NotificationService } from '../../../../services/notifications.service';
import { User, UserService } from '../../../../services/users.service';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-send-users-notification',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    ButtonComponent,
    SendUsersNotificationFormComponent
  ],
  templateUrl: './send-users-notification.component.html',
})

export class SendUsersNotificationComponent implements OnInit {

  users: User[] = [];          
  selectedUsers: string[] = [];  
  
  title = '';
  body = '';
  link = '';

  loading = false;
  success = '';
  error = '';

  breadcrumbs = [
    { label: 'Dashboard', url: '/' },
    { label: 'Notification', url: '/notifications' },
    { label: 'Send To Users' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, 
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';
  
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load all users';
        this.loading = false;
      }
    });
  }

  saveNotification() {
    if (!this.selectedUsers.length || !this.title || !this.body || !this.link) {
      this.error = 'All fields are required';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.notificationService.sendToUsers({
      title: this.title,
      body: this.body,
      link: this.link,
      nips: this.selectedUsers
    }).subscribe({
      next: () => {
        this.success = 'Notification sent successfully';
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to send notification';
        this.loading = false;
      }
    });
  }

  
  cancel() {
    this.router.navigate(['/notifications']);
  }
  
}
