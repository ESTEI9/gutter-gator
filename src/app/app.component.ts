import { Component } from '@angular/core';
import { IonApp, IonHeader, IonRouterOutlet, IonTitle, IonToolbar, IonIcon } from '@ionic/angular';
import { IconMap } from '../iconmap';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonIcon],
})
export class AppComponent {
  icons = IconMap;
}
