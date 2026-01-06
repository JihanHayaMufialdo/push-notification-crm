
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BadgeComponent } from '../../../ui/badge/badge.component';
import { TableDropdownComponent } from '../../../common/table-dropdown/table-dropdown.component';
import { TopicUser, Topic } from '../../../../../services/topics.service';

@Component({
  selector: 'app-topic-users-table',
  imports: [
    BadgeComponent,
    TableDropdownComponent
],
  templateUrl: './topic-users-table.component.html',
  styles: ``
})
export class TopicUsersTableComponent {

  @Input() users: TopicUser[] = [];
  @Input() topic!: Topic; 

  @Output() manageClick = new EventEmitter<Topic>();

  openManage() {
    this.manageClick.emit(this.topic);
  }

}
