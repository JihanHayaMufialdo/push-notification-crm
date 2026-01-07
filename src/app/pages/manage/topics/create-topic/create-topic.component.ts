import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { TopicService } from '../../../../services/topics.service';
import { CreateTopicFormComponent } from '../../../../shared/components/form/form-elements/create-topic/create-topic-form.component';

@Component({
  selector: 'app-create-topic',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    CreateTopicFormComponent
  ],
  templateUrl: './create-topic.component.html',
})

export class CreateTopicComponent {
  name: string = '';
  description: string = '';

  loading = false;
  success = '';
  error = '';

  breadcrumbs = [
    { label: 'Dashboard', url: '/' },
    { label: 'Topic', url: '/topics' },
    { label: 'Create Topic' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private topicService: TopicService) {}

  saveTopic() {
    if (!this.name.trim() || !this.description.trim()) {
      this.error = 'Name and Description are required';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.topicService.createTopic({ name: this.name, description: this.description }).subscribe({
      next: (res) => {
        this.success = 'Topic created successfully';
        this.loading = false;
        this.router.navigate(['/topics']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to create topic';
        this.loading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/topics']);
  }
  
}
