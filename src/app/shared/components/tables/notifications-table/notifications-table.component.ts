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

  @Output() detailsClick = new EventEmitter<Notification>();
  @Output() sendToUsers = new EventEmitter<void>();
  @Output() sendToTopic = new EventEmitter<void>();

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  currentPage = 1;
  itemsPerPage = 5;

  get totalPages(): number {
    return Math.ceil(this.notifications.length / this.itemsPerPage);
  }

  get currentItems(): Notification[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.notifications.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getBadgeColor(status: string): 'success' | 'warning' | 'error' {
    if (status === 'sent') return 'success';
    if (status === 'failed') return 'warning';
    return 'error';
  }
}
