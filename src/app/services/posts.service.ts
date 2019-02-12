import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Post } from './../interfaces/post';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl: string = environment.apiUrl;

  private _postsSource = new BehaviorSubject({});
  public postObservableSubject = this._postsSource.asObservable();

  private _editPostsSource = new BehaviorSubject({});
  public editPostObservableSubject = this._editPostsSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  /**
   *! метод для получения всех постов из api
   */
  public getPosts(): Observable<Object> {
    return this.http.get(`${this.apiUrl}/posts`);
  }

    /**
   *! метод для получения определенного поста из api
   */
  public getPost(id: number): Observable<Object> {
    return this.http.get(`${this.apiUrl}/posts/${id}`);
  }

      /**
   *! метод для получения коментария к определенному посту из api
   */
  public getComments(id: number): Observable<Object> {
    return this.http.get(`${this.apiUrl}/comments?postId=${id}`);
  }

  /**
   *! метод для удаления поста из api
   * @param id - id, удалямого поста
   */
  public deletePost(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`);
  }

  /**
   *! метод для добавления нового поста в api
   * после подтверждения добавления нового поста эмитим событие с новым постом
   * @param newPost - новый пост
   */
  public postPost(newPost: Post): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      }),
    };
    return this.http.post(`${this.apiUrl}/posts`, newPost, httpOptions).pipe(
      map((post: Post) => {
        this._postsSource.next(post);
      })
    );
  }

  /**
   *! метод для редактирования поста в api
   * @param post - новый пост
   */
  public editPost(editPost: Post): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
      }),
    };
    return this.http.put(`${this.apiUrl}/posts/${editPost.id}`, editPost, httpOptions).pipe(
      map((post: Post) => {
        this._editPostsSource.next(post);
      })
    );
  }

  /**
   * метод для генерации id
   */
  public generateId(): number {
    const source = '0123456789';
    let id = '';

    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * source.length);
        id += source[index];
    }

    return +id;
  }
}
