import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { NewpostComponent } from './components/newpost/newpost.component';
import { EditpostComponent } from './components/editpost/editpost.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'new-post', component: NewpostComponent },
  { path: 'edit-post', component: EditpostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
