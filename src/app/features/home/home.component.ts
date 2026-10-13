import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonFabButton, IonFab } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronDownOutline, searchOutline } from 'ionicons/icons';
import { IconMap } from '../../../iconmap';
import { MegaMenuComponent } from '../mega-menu/mega-menu.component';
import { MegaMenu } from '@features/mega-menu/domain/mega-menu';
import { WorkType } from '@core/domain/work-type';



enum HighlightedTopics {
    ROOF_CLEANING = 'Roof Cleaning',
    GUTTER_CLEANING = 'Gutter Cleaning',
    LANDSCAPING = 'Landscaping',
    POWER_WASHING = 'Power Washing',
    HOME_REPAIRS = 'Home Repairs'
};

@Component({
    selector: 'gg-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    imports: [IonContent, IonButton, FormsModule, IonIcon, IonFabButton, IonFab, MegaMenuComponent],
})
export class HomeComponent {

    @ViewChild('megaMenu', { read: ElementRef }) megaMenuEl: ElementRef;
    @ViewChild('heroInputContainer', { static: true, read: ElementRef }) heroInputContainer: ElementRef<HTMLDivElement>;

    defaultSearchPlaceholder = 'I am looking for help with...';
    headerSearchText: string = '';
    icons = IconMap;
    inputHasFocus = false;
    showMegaMenu = signal(false);
    suggestedSearch = signal<WorkType | undefined>(undefined);
    highlightedTopics = this.getHighlightedTopics();

    constructor() {
        addIcons({ searchOutline, chevronDownOutline });
    }

    showMenu() {
        this.showMegaMenu.set(true);
        const tabBarEls = document.getElementsByTagName('ion-tab-bar');
        const bottomBar = tabBarEls[tabBarEls.length - 1];
        const formEl = document.querySelector('.gg-hero__form') as Element;
        const heroInputEl = document.querySelector('.gg-hero__form-input') as Element;
        const heroInputElHeight = +getComputedStyle(heroInputEl).height.split('px')[0];
        const marginFromBottomBar = 24;
        const newHeight = bottomBar.getBoundingClientRect().top - (formEl.getBoundingClientRect().top + heroInputElHeight + marginFromBottomBar);
        (this.megaMenuEl.nativeElement as any)['style'].setProperty('max-height', `${newHeight}px`);
    }

    getHighlightedTopics() {
        return Object.entries(HighlightedTopics).map(([key, value]) => ({ enum: key, value }));
    }

    setSearchValues(menu: MegaMenu[]) {
        this.suggestedSearch.set(undefined);

        if (menu[0]) {
            const firstOption = menu[0].links[0];
            const workTypesOption = firstOption.workTypes?.length ? firstOption.workTypes[0] : undefined;
            const remainingFirstOption = firstOption.displayText.slice(this.headerSearchText.length);
            const firstOptionHasSearchText = firstOption.displayText.toLowerCase().indexOf(this.headerSearchText.toLowerCase()) === 0;
            const workTypesOptionHasSearchText = workTypesOption?.displayText.toLowerCase().indexOf(this.headerSearchText.toLowerCase()) === 0;
            let suggestedSearch = workTypesOption
                ? `${remainingFirstOption} ${workTypesOption.displayText}`
                : remainingFirstOption;

            if (remainingFirstOption === "" && ` ${workTypesOption?.displayText}` === suggestedSearch) {
                this.suggestedSearch.set(undefined);
                return;
            }

            if (firstOption.displayText.toLowerCase().indexOf(this.headerSearchText.toLowerCase()) !== 0 && workTypesOption) {
                suggestedSearch = workTypesOption.displayText.slice(this.headerSearchText.length);
            }

            if (!firstOptionHasSearchText && !workTypesOptionHasSearchText) {
                this.suggestedSearch.set(undefined);
                return;
            };

            const constructedOption = new WorkType();
            Object.assign(constructedOption, workTypesOption ?? firstOption);
            constructedOption.displayText = suggestedSearch.toLowerCase();


            this.suggestedSearch.set(constructedOption);
        }

    }

    setInputFocus(event: FocusEvent) {
        event.preventDefault();
        const el = this.heroInputContainer.nativeElement;
        el.focus();
    }

    setDefaultPlaceholder() {
        if (this.headerSearchText?.length < 4) {
            this.suggestedSearch.set(undefined);
        }
    }

    @HostListener('click', ['$event.target'])
    clickListener(target: EventTarget | null) {
        const element = target as Element;
        const isInputEl = element.closest('.gg-hero__form-input-container');
        const isMenuEl = element.closest('.gg-hero__mega-menu');

        if (!isInputEl) this.inputHasFocus = false;

        if (!isInputEl && !isMenuEl) this.showMegaMenu.set(false);
    }
}
