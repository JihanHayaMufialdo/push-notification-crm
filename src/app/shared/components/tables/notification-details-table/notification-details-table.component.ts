
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BadgeComponent } from '../../ui/badge/badge.component';
import { Notification, NotificationUser } from '../../../../services/notifications.service';

@Component({
  selector: 'app-notification-details-table',
  imports: [
    BadgeComponent
],
  templateUrl: './notification-details-table.component.html',
  styles: ``
})
export class NotificationDetailsTableComponent {

  @Input() users: NotificationUser[] = [];
  @Input() notification!: Notification; 

}
