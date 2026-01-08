import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentCardComponent } from '../../../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { TopicService } from '../../../../../services/topics.service';
import { UserService } from '../../../../../services/users.service';
import { User } from '../../../../../services/users.service';
import { forkJoin } from 'rxjs';
import { SubscribeTopicFormComponent } from '../../../../../shared/components/form/form-elements/subscribe-topic/subscribe-topic-form.component';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';


@Component({
  selector: 'app-topic-subscribe',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    SubscribeTopicFormComponent,
    ButtonComponent
  ],
  templateUrl: './topic-subscribe.component.html',
})

export class TopicSubscribeComponent implements OnInit {
  id!: number;
  users: User[] = [];          
  selectedUsers: string[] = [];   
  previousSelectedUsers: string[] = [];   

  loading = false;
  error = '';
  success = '';

  get breadcrumbs () { 
    return [
      { label: 'Dashboard', url: '/' },
      { label: 'Topic', url: '/topics' },
      { label: 'Topic Details', url: `/topic/${this.id}/details` },
      { label: 'Users' }
    ];
  }

  constructor(private route: ActivatedRoute, private router: Router,
    private topicService: TopicService, 
    private userService: UserService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';
  
    this.userService.getActiveUsers().subscribe({
      next: (res) => {
        this.users = res.devices;
  
        this.topicService.getUsersByTopic(this.id).subscribe({
          next: (subscribedUsers) => {
            this.selectedUsers = subscribedUsers.map(u => u.nip);
            this.previousSelectedUsers = [...this.selectedUsers]; 
            this.loading = false;
          },
          error: () => {
            this.error = 'Failed to load subscribed users';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = 'Failed to load all users';
        this.loading = false;
      }
    });
  }

  saveUsers() {
    if (!this.selectedUsers) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    // Users to subscribe: selected but not previously subscribed
    const usersToSubscribe = this.selectedUsers.filter(
      nip => !this.previousSelectedUsers.includes(nip)
    );

    // Users to unsubscribe: previously subscribed but now removed
    const usersToUnsubscribe = this.previousSelectedUsers.filter(
      nip => !this.selectedUsers.includes(nip)
    );

    const subscribe$ = usersToSubscribe.length
      ? this.topicService.subscribeUsers(this.id, usersToSubscribe)
      : null;

    const unsubscribe$ = usersToUnsubscribe.length
      ? this.topicService.unsubscribeUsers(this.id, usersToUnsubscribe)
      : null;

    // Execute both API calls in parallel if needed
    const requests = [];
    if (subscribe$) requests.push(subscribe$);
    if (unsubscribe$) requests.push(unsubscribe$);

    if (requests.length === 0) {
      this.success = 'No changes to save';
      this.loading = false;
      return;
    }

    forkJoin(requests).subscribe({
      next: () => {
        this.success = 'Users updated successfully';
        this.previousSelectedUsers = [...this.selectedUsers];
        this.loading = false;
        this.router.navigate([`/topic/${this.id}/details`]);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to update users';
        this.loading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/topics']);
  }
  
}
