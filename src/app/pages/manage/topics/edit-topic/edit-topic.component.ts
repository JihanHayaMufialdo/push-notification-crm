import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { TopicService, Topic } from '../../../../services/topics.service';
import { EditTopicFormComponent } from '../../../../shared/components/form/form-elements/edit-topic/edit-topic-form.component';

@Component({
  selector: 'app-edit-topic',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    EditTopicFormComponent
  ],
  templateUrl: './edit-topic.component.html',
})

export class EditTopicComponent implements OnInit {
  id!: number;
  topic: Topic | null = null;

  form = {
    name: '',
    description: ''
  };

  loading = true;
  saving = false;
  error = '';

  breadcrumbs = [
    { label: 'Dashboard', url: '/' },
    { label: 'Topic', url: '/topics' },
    { label: 'Edit Topic' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private topicService: TopicService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTopic();
  }

  loadTopic() {
    this.loading = true;
    this.error = '';

    this.topicService.getTopicById(this.id).subscribe({
      next: (res) => {
        this.topic = res.topic;

        this.form.name = this.topic.name;
        this.form.description = this.topic.description;

        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load topic';
        this.loading = false;
      }
    });
  }

  saveTopic(data: { name: string; description: string }) {
    if (!this.topic) return;
  
    this.loading = true;
    this.error = '';
  
    this.topicService
      .updateTopic(this.topic.id, data)
      .subscribe({
        next: () => {
          this.router.navigate(['/topics']);
        },
        error: () => {
          this.error = 'Failed to update topic';
          this.loading = false;
        }
      });
  }
  

  cancel() {
    this.router.navigate(['/topics']);
  }
  
}
