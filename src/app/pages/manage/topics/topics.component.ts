import { Component, OnInit } from '@angular/core';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { TopicsTableComponent } from '../../../shared/components/tables/topics-table/topics-table.component';
import { Topic, TopicService, TopicUser } from '../../../services/topics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topics',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    TopicsTableComponent
  ],
  templateUrl: './topics.component.html',
  styles: ``
})

export class TopicsComponent implements OnInit { 
  
  topics: Topic[] = [];
  users: TopicUser[] = [];

  loading = true;
  error = '';

  breadcrumbs = [
    { label: 'Dashboard', url: '/' },
    { label: 'Topic' }
  ];

  constructor(private topicService: TopicService, private router: Router) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics() {
    this.loading = true;
    this.topicService.getTopics().subscribe({
      next: (res) => {
        this.topics = res.topics.map(topic => {
          const uniqueNips = new Set(
            topic.DeviceTopics
              ?.map(dt => dt?.Device?.User?.nip)
              .filter(Boolean)
          );
  
          return {
            ...topic,
            userCount: uniqueNips.size
          };
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load topics';
        this.loading = false;
      }
    });
  }  
  
  openTopicDetails(topic: Topic) {
    this.router.navigate(['/topic', topic.id, 'details']);
  }  

  openEdit(topic: Topic) {
    this.router.navigate(['/topic', topic.id, 'edit']);
  }

  openTopicForm() {
    this.router.navigate(['/topic/create']);
  }
  
}
