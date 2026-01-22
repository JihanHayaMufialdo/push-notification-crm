import { Component, OnInit } from '@angular/core';
import { NotificationMetricsComponent } from '../../shared/components/dashboard/notification-metrics/notification-metrics.component';
import { MonthlyNotificationsChartComponent } from '../../shared/components/dashboard/monthly-notifications-chart/monthly-notifications-chart.component';
import { RecentNotificationsComponent } from '../../shared/components/dashboard/recent-notifications/recent-notifications.component';
import { NotificationService, MonthlyCount, Notification } from '../../services/notifications.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    NotificationMetricsComponent,
    MonthlyNotificationsChartComponent,
    RecentNotificationsComponent,
  ],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  monthCount!: MonthlyCount;
  usersCount = 0;
  topicCount = 0;
  notifications: Notification[] = [];
  displayedNotifications: any[] = [];

  loading = true;
  error: string | null = null;
  showAll =  false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadCounts();
    this.loadMonthlyCount();
    this.loadNotifications();
  }

  loadCounts(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      users: this.notificationService.countSendToUsers(),
      topics: this.notificationService.countSendToTopic()
    }).subscribe({
      next: res => {
        this.usersCount = res.users.count;
        this.topicCount = res.topics.count;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load notification metrics';
        console.error(err);
        this.loading = false;
      }
    });
  }

  loadMonthlyCount(): void {
    this.notificationService.countPerMonth().subscribe({
      next: (response) => {
        this.monthCount = response;
      },
      error: (err) => {
        console.error('Failed to load monthly count', err);
      }
    });
  }

  loadNotifications(limit = 5) {
    this.loading = true;
    this.notificationService.getNotifications(1, limit).subscribe({
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

        this.updateDisplayedNotifications();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load notifications';
        this.loading = false;
      }
    });
  }

  updateDisplayedNotifications() {
    if (this.showAll) {
      this.displayedNotifications = [...this.notifications];
    } else {
      this.displayedNotifications = this.notifications.slice(0, 5);
    }
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  
    if (this.showAll) {
      this.loadNotifications(9999);
    } else {
      this.loadNotifications(5);
    }
  }
  
}

