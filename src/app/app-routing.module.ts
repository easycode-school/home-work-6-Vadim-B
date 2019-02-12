import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { PostComponent } from './components/posts/post/post.component';

const routes: Routes = [
  { path: 'posts', component: FirstPageComponent },
  { path: 'posts/:id', component: PostComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full'},
  { path: '**', component: FirstPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
