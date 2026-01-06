import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { TableDropdownComponent } from '../../common/table-dropdown/table-dropdown.component';
import { Topic } from '../../../../services/topics.service';

@Component({
  selector: 'app-topics-table',
  imports: [
    CommonModule,
    ButtonComponent,
    TableDropdownComponent,
  ],
  templateUrl: './topics-table.component.html',
  styles: ``
})
export class TopicsTableComponent {

  @Input() topics: Topic[] = [];

  @Output() editClick = new EventEmitter<Topic>();
  @Output() detailsClick = new EventEmitter<Topic>(); 

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  currentPage = 1;
  itemsPerPage = 5;

  get totalPages(): number {
    return Math.ceil(this.topics.length / this.itemsPerPage);
  }

  get currentItems(): Topic[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.topics.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getBadgeColor(status: string): 'success' | 'warning' | 'error' {
    if (status === 'Success') return 'success';
    if (status === 'Pending') return 'warning';
    return 'error';
  }
}
