import { Component, OnInit } from '@angular/core';
import { AlertsService } from './../../services/alerts.service';
import { AlertParam } from './../../interfaces/alertParam';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  // объект с параметрами информационного сообщения
  public alertParam: AlertParam;

  constructor(
    public alertsService: AlertsService
  ) { }

  ngOnInit() {
    // тут мы подписались на событие вывода какого либо сообщения
    this.alertsService.alertObservableSubject.subscribe((alertParam: AlertParam) => {
      this.alertParam = alertParam;

      // через 3 сек убираем сообщение
      setTimeout(() => this.alertParam.active = false, 3000);
    });
  }

}
