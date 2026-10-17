import { Component } from '@angular/core';
import { MegaMenuComponent } from '../mega-menu/mega-menu.component';
import { IonFooter, IonIcon, IonItem, IonList } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { mail, navigate, phonePortrait } from 'ionicons/icons';

@Component({
    selector: 'gg-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [IonFooter, MegaMenuComponent, IonList, IonItem, IonIcon],
})
export class FooterComponent {

    constructor() {
        addIcons({ navigate, phonePortrait, mail });
    }

    call(event: Event) {
        event.preventDefault();
        window.open('tel:18435166986');
    }

    email(event: Event) {
        event.preventDefault();
        window.open('mailto:guttergatorsc@gmail.com')
    }

}
