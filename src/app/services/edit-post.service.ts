import { Injectable } from '@angular/core';
import { Post } from './../interfaces/post';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {

  private _editPostsSource = new BehaviorSubject({});
  public editPostObservableSubject = this._editPostsSource.asObservable();

  constructor() { }

  /**
   * метод, в котором эмитим событие редактирования поста и прокидываем этот пост в компоненту, которая за этим следит
   * @param post - редактируемый пост
   */
  editPost(post: Post) {
    this._editPostsSource.next(post);
  }
}
