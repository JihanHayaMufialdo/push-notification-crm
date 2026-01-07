
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BadgeComponent } from '../../ui/badge/badge.component';
import { TableDropdownComponent } from '../../common/table-dropdown/table-dropdown.component';
import { TopicUser, Topic } from '../../../../services/topics.service';
import { Notification, NotificationUser } from '../../../../services/notifications.service';

@Component({
  selector: 'app-notification-details-table',
  imports: [
    BadgeComponent,
    TableDropdownComponent
],
  templateUrl: './notification-details-table.component.html',
  styles: ``
})
export class NotificationDetailsTableComponent {

  @Input() users: NotificationUser[] = [];
  @Input() notification!: Notification; 

}
