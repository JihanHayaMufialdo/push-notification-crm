import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { TableDropdownComponent } from '../../common/table-dropdown/table-dropdown.component';
import { BadgeComponent } from '../../ui/badge/badge.component';
import { Notification } from '../../../../services/notifications.service';

@Component({
  selector: 'app-notifications-table',
  imports: [
    CommonModule,
    ButtonComponent,
    TableDropdownComponent,
    BadgeComponent,
  ],
  templateUrl: './notifications-table.component.html',
  styles: ``
})

export class NotificationsTableComponent {

  @Input() notifications: Notification[] = [];
  @Input() currentPage = 1;
  @Input() totalPages = 1;

  @Output() detailsClick = new EventEmitter<Notification>();
  @Output() sendToUsers = new EventEmitter<void>();
  @Output() sendToTopic = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

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
