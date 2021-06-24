import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { NewpostComponent } from './components/newpost/newpost.component';
import { EditpostComponent } from './components/editpost/editpost.component';
import { NeweventComponent } from './components/newevent/newevent.component';
import { EventsComponent } from './components/events/events.component';
import { EditeventComponent } from './components/editevent/editevent.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatsComponent } from './components/chats/chats.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { NewcollectionComponent } from './components/newcollection/newcollection.component';
import { EditcollectionComponent } from './components/editcollection/editcollection.component';


const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'new-post', component: NewpostComponent },
  { path: 'edit-post', component: EditpostComponent },
  { path: 'events', component: EventsComponent },
  { path: 'new-event', component: NeweventComponent },
  { path: 'edit-event', component: EditeventComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'volunteers', component: VolunteersComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'new-collection', component: NewcollectionComponent },
  { path: 'edit-collection', component: EditcollectionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
