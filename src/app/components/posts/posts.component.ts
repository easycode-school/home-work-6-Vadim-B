import { Component, OnInit } from '@angular/core';
import { PostsService } from './../../services/posts.service';
import { AlertsService } from './../../services/alerts.service';
import { EditPostService } from './../../services/edit-post.service';
import { Post } from './../../interfaces/post';
import { AlertParam } from './../../interfaces/alertParam';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: Post[] = [];

  constructor(
    public postsService: PostsService,
    public alertsService: AlertsService,
    public editPostService: EditPostService
  ) { }

  ngOnInit() {
    // ! при загрузке компоненты мы подписываемся на Observable из сервиса
    this.postsService.getPosts().subscribe(
      (posts: Post[]) => {
        // в случае удачной загрузик данных с сервера, запишем полученные посты в публичную переменную
        this.posts = posts.reverse();
      },
      (err) => {
        // при ошибке также выведем сообщение о ней
        const alertParam: AlertParam = {
          active: true,
          message: 'Ошибка. Посты не загружены.',
          class: 'alert-danger'
        };
        this.alertsService.addAlert(alertParam);
        console.log(err);
      },
      () => {
        // при удачном исходе выкинем сообщение об этом с помощью спец сервиса
        // сначала формируем объект с параметрами сообщения (его содержание и фон)
        const alertParam: AlertParam = {
          active: true,
          message: 'Posts loaded',
          class: 'alert-success'
        };
        this.alertsService.addAlert(alertParam);
      }
    );

    // ! подписываемся на событие добавления нового поста
    this.postsService.postObservableSubject.subscribe((post: Post) => {
      // т.к. я отобразил посты начиная с наиболее поздних, то в верстку новые буду добавлять в начало списка
      this.posts.unshift(Object.assign({}, post));
    });

    // ! подписываемся на событие редактирования нового поста
    this.postsService.editPostObservableSubject.subscribe((newPost: Post) => {
      // если событие срабатывает, ищем нужный пост по id и меняем его
      this.posts.forEach((post: Post) => {
        if (post.id === newPost.id) {
          post.title = newPost.title;
          post.body = newPost.body;
        }
      });
    });
  }

    /**
     *! метод для удаления одного поста
     * при ошибке выведем ее в консоль
     * @param id - id? удаляемого поста
     */
    public deletePost(id: number): void {
      this.postsService.deletePost(id).subscribe(
        () => {
          this.posts = this.posts.filter(post => post.id !== id);
          // при удачном исходе выкинем сообщение об этом с помощью спец сервиса
          // сначала формируем объект с параметрами сообщения (его содержание и фон)
          const alertParam: AlertParam = {
            active: true,
            message: `Post with id ${id} deleted`,
            class: 'alert-info'
          };
          this.alertsService.addAlert(alertParam);
        },
        (err) => {
          // при ошибке также выведем сообщение о ней
          const alertParam: AlertParam = {
            active: true,
            message: 'Ошибка. Пост не удален.',
            class: 'alert-danger'
          };
          this.alertsService.addAlert(alertParam);
          console.log(err);
        }
      );
    }

    /**
     *! метод для редактирования поста
     * @param post - старый пост, который нужно отредактировать
     */
    public editPost(post: Post): void {
      this.editPostService.editPost(post);
      // топорно прокрутим страницу вверх к форме
      window.scrollTo(0, 0);
    }
}
