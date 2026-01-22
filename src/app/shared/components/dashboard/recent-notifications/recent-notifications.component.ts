import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BadgeComponent } from '../../ui/badge/badge.component';

@Component({
  selector: 'app-recent-notifications',
  imports: [
    BadgeComponent
],
  templateUrl: './recent-notifications.component.html'
})
export class RecentNotificationsComponent {

  @Input() loading = false;
  @Input() error = '';
  @Input() notifications: any[] = [];
  @Input() showAll = false;

  @Output() toggleShowAllEvent = new EventEmitter<void>();

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  getBadgeColor(status: string): 'success' | 'warning' | 'error' {
    if (status === 'sent') return 'success';
    if (status === 'failed') return 'warning';
    return 'error';
  }
}