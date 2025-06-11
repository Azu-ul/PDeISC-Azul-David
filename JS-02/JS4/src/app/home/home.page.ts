import { Component, AfterViewInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
/* export class HomePage {
  constructor() {}
} */
export class HomePage implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const cursor = document.querySelector('.cursor');

    if (cursor) {
      document.addEventListener('mousemove', e => {
        cursor.setAttribute(
          'style',
          `top: ${e.pageY + 55}px; left: ${e.pageX + 55}px;`
        );
      });
    }
  }
}
