import { Routes } from '@angular/router';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormElementsComponent } from './pages/forms/form-elements/form-elements.component';
import { NotificationsComponent } from './pages/manage/notifications/notifications.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { LineChartComponent } from './pages/charts/line-chart/line-chart.component';
import { BarChartComponent } from './pages/charts/bar-chart/bar-chart.component';
import { AlertsComponent } from './pages/ui-elements/alerts/alerts.component';
import { AvatarElementComponent } from './pages/ui-elements/avatar-element/avatar-element.component';
import { BadgesComponent } from './pages/ui-elements/badges/badges.component';
import { ButtonsComponent } from './pages/ui-elements/buttons/buttons.component';
import { ImagesComponent } from './pages/ui-elements/images/images.component';
import { VideosComponent } from './pages/ui-elements/videos/videos.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { TopicsComponent } from './pages/manage/topics/topics.component';
import { TopicDetailsComponent } from './pages/manage/topics/topic-details/topic-details.component';
import { UsersComponent } from './pages/manage/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { BasicTableComponent } from './pages/tables/basic-tables/basic-tables.component';
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
        component: EcommerceComponent,
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
        path:'users',
        component:UsersComponent,
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
      {
        path:'calendar',
        component:CalenderComponent,
        title:'Angular Calender | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'profile',
        component:ProfileComponent,
        canActivate: [AuthGuard],
        title:'Angular Profile Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'form-elements',
        component:FormElementsComponent,
        title:'Angular Form Elements Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'basic-tables',
        component:BasicTableComponent,
        title:'Angular Basic Tables Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'blank',
        component:BlankComponent,
        title:'Angular Blank Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      // support tickets
      {
        path:'invoice',
        component:InvoicesComponent,
        title:'Angular Invoice Details Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'line-chart',
        component:LineChartComponent,
        title:'Angular Line Chart Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'bar-chart',
        component:BarChartComponent,
        title:'Angular Bar Chart Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'alerts',
        component:AlertsComponent,
        title:'Angular Alerts Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'avatars',
        component:AvatarElementComponent,
        title:'Angular Avatars Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'badge',
        component:BadgesComponent,
        title:'Angular Badges Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'buttons',
        component:ButtonsComponent,
        title:'Angular Buttons Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'images',
        component:ImagesComponent,
        title:'Angular Images Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'videos',
        component:VideosComponent,
        title:'Angular Videos Dashboard | TailAdmin - Angular Admin Dashboard Template'
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
