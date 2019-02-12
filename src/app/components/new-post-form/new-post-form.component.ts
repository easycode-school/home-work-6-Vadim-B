import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from './../../services/posts.service';
import { AlertsService } from './../../services/alerts.service';
import { EditPostService } from './../../services/edit-post.service';
import { Post } from './../../interfaces/post';
import { AlertParam } from './../../interfaces/alertParam';

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.css']
})
export class NewPostFormComponent implements OnInit {
  // назначим переменную, в которой будет объект с новым постом
  public newPost: Post = {
    userId: 0,
    id: 0,
    title: '',
    body: ''
  };

  // назначим переменную, в которой будет объект с новым постом
  public editPost: Post;

  constructor(
    public postsService: PostsService,
    public alertsService: AlertsService,
    public editPostService: EditPostService
  ) { }

  ngOnInit() {
    // при загрузке компоненты, подписываемся на событие редактирования поста в соответствующей компоненте
    this.editPostService.editPostObservableSubject.subscribe((post: Post) => {
      // если событие совершено, занесем в форму редактируемый пост
      this.editPost = post;
      // на тот случай, если юзер подтвердит изменения, не отредактирова ничего
      this.newPost = Object.assign({}, this.editPost);
    });
  }

  /**
   *! При сабмите формы сработает метод для добавления нового поста
   * @param form - объект с состоянием формы
   */
  public addPost(form: NgForm): void {
    if (this._checkValidation()) { // если прошли валидацию
      // в данном примере генерируем id автора, хотя в реальном примере он был бы где-то сохранен
      this.newPost.userId = this.postsService.generateId();
      // генерируем id задачи
      this.newPost.id = this.postsService.generateId();

      // обращаемся к соответствующему методу в сервисах
      this.postsService.postPost(this.newPost).subscribe(
        () => {
          // при удачном исходе выкинем сообщение об этом с помощью спец сервиса
          // сначала формируем объект с параметрами сообщения (его содержание и фон)
          const alertParam: AlertParam = {
            active: true,
            message: 'Пост успешно добавлен',
            class: 'alert-success'
          };
          this.alertsService.addAlert(alertParam);
        },
        (err) => {
          // при ошибке также выведем сообщение о ней
          const alertParam: AlertParam = {
            active: true,
            message: 'Ошибка. Пост не добавлен.',
            class: 'alert-danger'
          };
          this.alertsService.addAlert(alertParam);
          console.log(err);
        }
      );
      // чистим форму
      form.resetForm();
    }
  }

  /**
   *! метод для редактирования поста
   * @param newPost - отредактированный пост
   */
  public editPostSubmit() {
    if (this._checkValidation()) { // если прошли валидацию
      this.postsService.editPost(this.newPost).subscribe(
        () => {
          // при удачном исходе выкинем сообщение об этом с помощью спец сервиса
          // сначала формируем объект с параметрами сообщения (его содержание и фон)
          const alertParam: AlertParam = {
            active: true,
            message: 'Пост успешно изменен',
            class: 'alert-success'
          };
          this.alertsService.addAlert(alertParam);
          this.cancelEditPost();
        },
        (err) => {
          // при ошибке также выведем сообщение о ней
          const alertParam: AlertParam = {
            active: true,
            message: 'Ошибка. Пост не изменен.',
            class: 'alert-danger'
          };
          this.alertsService.addAlert(alertParam);
          console.log(err);
        }
      );
    }
  }

  /**
   * в случае отмены редактирования чистим объект с редактируемым постом
   */
  public cancelEditPost() {
    this.editPost = {
      userId: 0,
      id: 0,
      title: '',
      body: ''
    };
    this.newPost = {
      userId: 0,
      id: 0,
      title: '',
      body: ''
    };
  }

  /**
   * метод для проверки валидации полей формы
   */
  private _checkValidation() {
// делаем проверку и, если какое-то поле не заполнено или в нем меньше трех символов, выводим об этом сообщение
    if (!this.newPost.title || !this.newPost.body) {
      const alertParam: AlertParam = {
        active: true,
        message: `Заполните, пожалуйста ${(!this.newPost.title ? 'название' : 'содержание')} Вашего поста`,
        class: 'alert-danger'
      };
      this.alertsService.addAlert(alertParam);
      return false;
    } else if (this.newPost.title.length < 3 || this.newPost.body.length < 3) {
    const alertParam: AlertParam = {
      active: true,
      message: `${(this.newPost.title.length < 3 ? 'Название' : 'Содержание')} Вашего поста слишком короткое`,
      class: 'alert-danger'
    };
    this.alertsService.addAlert(alertParam);
    return false;
    } else {
      return true;
    }
  }
}
