import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotificationsComponent } from './pages/manage/notifications/notifications.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { TopicsComponent } from './pages/manage/topics/topics.component';
import { TopicDetailsComponent } from './pages/manage/topics/topic-details/topic-details.component';
import { AuthGuard } from './guards/auth.guard';
import { EditTopicComponent } from './pages/manage/topics/edit-topic/edit-topic.component';
import { TopicSubscribeComponent } from './pages/manage/topics/topic-details/topic-subscribe/topic-subscribe.component';
import { NotificationDetailsComponent } from './pages/manage/notifications/notification-details/notification-details.component';
import { SendUsersNotificationComponent } from './pages/manage/notifications/send-users-notification/send-users-notification.component';
import { SendTopicNotificationComponent } from './pages/manage/notifications/send-topic-notification/send-topic-notification.component';
import { CreateTopicComponent } from './pages/manage/topics/create-topic/create-topic.component';
 
export const routes: Routes = [
  {
    path:'',
    component:AppLayoutComponent,
    children:[
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
        title:
          'Push Notification | BPI Online',
      },
      {
        path:'notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard],
        title:'Push Notification | BPI Online'
      },
      {
        path:'notification/:id/details',
        component: NotificationDetailsComponent,
        canActivate: [AuthGuard],
        title:'Push Notification | BPI Online'
      },
      {
        path:'notification/send-users',
        component: SendUsersNotificationComponent,
        canActivate: [AuthGuard],
        title:'Push Notification | BPI Online'
      },
      {
        path:'notification/send-topic',
        component: SendTopicNotificationComponent,
        canActivate: [AuthGuard],
        title:'Push Notification | BPI Online'
      },
      {
        path:'topics',
        component:TopicsComponent,
        canActivate: [AuthGuard],
        title:'Push Notification | BPI Online'
      },
      {
        path:'topic/create',
        component:CreateTopicComponent,
        canActivate: [AuthGuard],
        title:'Push Notification | BPI Online'
      },
      {
        path:'topic/:id/details',
        component:TopicDetailsComponent,
        canActivate: [AuthGuard],
        title:'Push Notification | BPI Online'
      },
      {
        path:'topic/:id/edit',
        component:EditTopicComponent,
        canActivate: [AuthGuard],
        title:'Push Notification | BPI Online'
      },
      {
        path:'topic/:id/subscribe',
        component:TopicSubscribeComponent,
        canActivate: [AuthGuard],
        title:'Push Notification | BPI Online'
      },
    ]
  },
  // auth pages
  {
    path:'signin',
    component:SignInComponent,
    title:'Sign In | Push Notification CRM'
  },
  {
    path:'signup',
    component:SignUpComponent,
    title:'Angular Sign Up Dashboard | TailAdmin - Angular Admin Dashboard Template'
  },
  // error pages
  {
    path:'**',
    component:NotFoundComponent,
    title:'Angular NotFound Dashboard | TailAdmin - Angular Admin Dashboard Template'
  },
];
