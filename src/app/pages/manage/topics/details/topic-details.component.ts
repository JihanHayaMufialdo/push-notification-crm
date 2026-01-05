import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { TopicNotificationsTableComponent } from '../../../../shared/components/tables/topic-details-table/topic-notifications-table/topic-notifications-table.component';
import { TopicUsersTableComponent } from '../../../../shared/components/tables/topic-details-table/topic-users-table/topic-users-table.component';
import { TopicService, TopicUser, TopicNotification } from '../../../../services/topics.service';

@Component({
  selector: 'app-topic-details',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    TopicUsersTableComponent,
    TopicNotificationsTableComponent
  ],
  templateUrl: './topic-details.component.html',
})

export class TopicDetailsComponent implements OnInit {
  id!: number;
  users: TopicUser[] = [];
  notifications: TopicNotification[] = [];

  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private topicService: TopicService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUsers();
    this.loadNotifications();
  }

  loadUsers() {
    this.topicService.getUsersByTopic(this.id).subscribe((response) => {
      this.users = response.users;
    });
  }

  loadNotifications() {
    this.topicService.getNotificationsByTopic(this.id).subscribe((response) => {
      this.notifications = response.notifications;
    });
  }

//   subscribe(topic: Topic, nip: string) {
//     this.topicService.subscribeUser(topic.id, nip).subscribe(() => {
//       this.loadUsers(topic);
//     });
//   }
  
//   unsubscribe(topic: Topic, nip: string) {
//     this.topicService.unsubscribeUser(topic.id, nip).subscribe(() => {
//       this.loadUsers(topic);
//     });
//   }
}
