import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../../services/posts.service';
import { AlertsService } from './../../../services/alerts.service';
import { Post } from './../../../interfaces/post';
import { Comment } from './../../../interfaces/comment';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  // отсюда в верстку будет браться информация о посте
  public post: Post;
  // отсюда в верстку будут браться комментарии к посту
  public comments: Comment;
  // вкл/выкл комментариев
  public commentsActive: boolean;

  constructor(
    private route: ActivatedRoute,
    public postsService: PostsService,
    public alertsService: AlertsService
  ) { }

  ngOnInit() {
    // ! при загрузке компоненты запрашиваем из сервиса метод для получения нужного поста
    const id = this.route.snapshot.params['id'];
    this.postsService.getPost(id).subscribe(
      (post: Post) => {
        // полученный объект запишем в this.post
        this.post = post;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * ! метод для получения комментариев к посту
   * @param id - id поста, к которому нужны комментарии
   */
  getComments(id: number): boolean {
    // если комментарии с сервера уже загруженны, то просто вкл/выкл их отображение
    if (this.comments) {
      return this.commentsActive = !this.commentsActive;
    // если комментарии с сервера не загруженны, то вызываем соответствующий метод в сервисе и отображаем полученные данные
    } else {
      this.postsService.getComments(id).subscribe(
        (comments: Comment) => {
          // полученный объект запишем в this.comments
          this.comments = comments;
          // отображаем полученные данные
          return this.commentsActive = !this.commentsActive;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
