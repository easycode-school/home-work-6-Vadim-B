import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { NewPostFormComponent } from './components/new-post-form/new-post-form.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { PostComponent } from './components/posts/post/post.component';
import { FirstPageComponent } from './components/first-page/first-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NewPostFormComponent,
    AlertsComponent,
    PostComponent,
    FirstPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
