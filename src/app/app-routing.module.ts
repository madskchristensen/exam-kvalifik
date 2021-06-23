import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { NewpostComponent } from './components/newpost/newpost.component';
import { EditpostComponent } from './components/editpost/editpost.component';
import { NeweventComponent } from './components/newevent/newevent.component';
import { EventsComponent } from './components/events/events.component';
import { EditeventComponent } from './components/editevent/editevent.component';
import { CollectionsComponent } from './components/collections/collections.component';


const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'new-post', component: NewpostComponent },
  { path: 'edit-post', component: EditpostComponent },
  { path: 'events', component: EventsComponent },
  { path: 'new-event', component: NeweventComponent },
  { path: 'edit-event', component: EditeventComponent },
  { path: 'collections', component: CollectionsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
