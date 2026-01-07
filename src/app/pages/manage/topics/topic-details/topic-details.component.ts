import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { TopicNotificationsTableComponent } from '../../../../shared/components/tables/topic-details-table/topic-notifications-table/topic-notifications-table.component';
import { TopicUsersTableComponent } from '../../../../shared/components/tables/topic-details-table/topic-users-table/topic-users-table.component';
import { TopicService, TopicUser, TopicNotification, Topic } from '../../../../services/topics.service';

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
  topic!: Topic; 
  notifications: TopicNotification[] = [];

  loadingUsers = true;
  errorUsers = '';
  
  loadingNotifications = true;
  errorNotifications = '';

  breadcrumbs = [
    { label: 'Dashboard', url: '/' },
    { label: 'Topic', url: '/topics' },
    { label: 'Topic Details' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private topicService: TopicService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  

    this.topicService.getTopicById(this.id).subscribe({
      next: (res) => {
        this.topic = res.topic; 
        this.loadUsers();        
        this.loadNotifications();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadUsers() {
    this.loadingUsers = true;
    this.errorUsers = '';

    this.topicService.getUsersByTopic(this.id).subscribe({
      next: (users) => {
        this.users = users;          
        this.loadingUsers = false;
      },
      error: (err) => {
        console.error(err);
        this.errorUsers = 'Failed to load users';
        this.loadingUsers = false;
      }
    });
  }

  loadNotifications() {
    this.loadingNotifications = true;
    this.errorNotifications = '';

    this.topicService.getNotificationsByTopic(this.id).subscribe({
      next: (notifications) => {
        this.notifications = notifications;          
        this.loadingNotifications = false;
      },
      error: (err) => {
        console.error(err);
        this.errorNotifications = 'Failed to load notifications';
        this.loadingNotifications = false;
      }
    });
  }

  openUsersTopicForm(topic: Topic) {
    this.router.navigate(['/topic', topic.id, 'subscribe']);
  }
}
