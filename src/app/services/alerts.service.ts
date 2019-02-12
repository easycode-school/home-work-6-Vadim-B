import { Injectable } from '@angular/core';
import { AlertParam } from './../interfaces/alertParam';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private _alertSource = new BehaviorSubject({});
  public alertObservableSubject = this._alertSource.asObservable();

  constructor() { }

  public addAlert(alertParam: AlertParam) {
    this._alertSource.next(alertParam);
  }
}
