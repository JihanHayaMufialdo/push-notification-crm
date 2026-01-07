import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { NotificationService } from '../../../../services/notifications.service';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { Topic, TopicService } from '../../../../services/topics.service';
import { SendTopicNotificationFormComponent } from '../../../../shared/components/form/form-elements/send-topic-notification/send-topic-notification-form.component';

@Component({
  selector: 'app-send-topic-notification',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    ButtonComponent,
    SendTopicNotificationFormComponent
  ],
  templateUrl: './send-topic-notification.component.html',
})

export class SendTopicNotificationComponent implements OnInit {

  topics: Topic[] = [];
  selectedTopicId!: number;
  
  title = '';
  body = '';
  link = '';

  loading = false;
  success = '';
  error = '';

  breadcrumbs = [
    { label: 'Dashboard', url: '/' },
    { label: 'Notification', url: '/notifications' },
    { label: 'Send To Topic' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, 
    private notificationService: NotificationService,
    private topicService: TopicService,
  ) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics() {
    this.loading = true;
    this.error = '';

    this.topicService.getTopics().subscribe({
      next: (res) => {
        this.topics = res.topics;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load topics';
        this.loading = false;
      }
    });
  }

  saveNotification() {
    if (!this.selectedTopicId || !this.title || !this.body || !this.link) {
      this.error = 'All fields are required';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.notificationService.sendToTopic({
      topicId: this.selectedTopicId,
      title: this.title,
      body: this.body,
      link: this.link
    }).subscribe({
      next: () => {
        this.success = 'Notification sent successfully';
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to send notification';
        this.loading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/notifications']);
  }
  
}
