import { Component, OnInit } from '@angular/core';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { TopicsTableComponent } from '../../../shared/components/tables/topics-table/topics-table.component';
import { Topic, TopicService } from '../../../services/topics.service';
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
export class TopicsComponent implements OnInit{
  topics: Topic[] = [];
  loading = true;
  error = '';

  constructor(
    private topicService: TopicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTopics();
  }

  fetchTopics() {
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

  openTopicDetails(topic: Topic) {
    this.router.navigate(['/topic', topic.id, 'details']);
  }  

  // openUsers(topic: Topic) {
  //   this.router.navigate(['/topic', topic.id, 'users']);
  //   // topic.expanded = true;
  //   // this.loadUsers(topic);
  // }

  openEdit(topic: Topic) {
    this.router.navigate(['/topic', topic.id, 'edit']);
  }
  
  // openNotifications(topic: Topic) {
  //   this.router.navigate(['/topic', topic.id, 'notifications']);
  // }

  // loadUsers(topic: Topic) {
  //   topic.loadingUsers = true;
  
  //   this.topicService.getUsersByTopic(topic.id).subscribe(res => {
  //     topic.users = res.users;
  //     topic.loadingUsers = false;
  //   });
  // }
  
  // subscribe(topic: Topic, nip: string) {
  //   this.topicService.subscribeUser(topic.id, nip).subscribe(() => {
  //     this.loadUsers(topic);
  //   });
  // }
  
  // unsubscribe(topic: Topic, nip: string) {
  //   this.topicService.unsubscribeUser(topic.id, nip).subscribe(() => {
  //     this.loadUsers(topic);
  //   });
  // }
}
