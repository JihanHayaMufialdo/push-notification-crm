
import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../../../ui/badge/badge.component';
import { TopicNotification } from '../../../../../services/topics.service';

@Component({
  selector: 'app-topic-notifications-table',
  imports: [
    BadgeComponent,
],
  templateUrl: './topic-notifications-table.component.html',
  styles: ``
})
export class TopicNotificationsTableComponent {

  @Input() notifications: TopicNotification[] = [];

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
}
