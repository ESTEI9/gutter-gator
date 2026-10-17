import { Component, computed, input, output } from '@angular/core';
import { MenuData } from '@core/menu-data';
import { MegaMenu } from './domain/mega-menu';
import { MenuItem } from './domain/menu-item';
import { WorkType } from '@core/domain/work-type';
import { IonListHeader, IonList, IonItem, IonItemGroup, IonButton, IonLabel } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'gg-mega-menu',
    templateUrl: './mega-menu.component.html',
    styleUrls: ['./mega-menu.component.scss'],
    imports: [IonListHeader, IonList, IonItem, IonItemGroup, IonButton, RouterLink, IonLabel],
})
export class MegaMenuComponent {
    searchString = input<string>();
    searchMatches = output<MegaMenu[]>();

    splitRegex = /[\s,\,,-]/;
    fullMenu: MegaMenu[] = this.getMenu();

    menu = computed(() => {
        const searchTerm = this.searchString() ?? '';

        if (searchTerm === '') {
            this.searchMatches.emit([]);
            return this.fullMenu;
        }

        const data = structuredClone(MenuData).filter(item => {
            const newMenu = item.workTypes.filter(workType => {
                return searchTerm.split(' ').every(term => this.getIsSearchedItem(workType, term.toLowerCase()));
            })

            if (newMenu.length) {
                item.workTypes = newMenu;
                return item;
            }

            return undefined;
        })

        const newMenu = this.getMenu(data);
        this.searchMatches.emit(newMenu);

        return newMenu;
    });

    getIsSearchedItem(item: WorkType, searchTerm: string): WorkType | undefined {
        if (item.searchTerms?.some(term => term.indexOf(searchTerm) === 0)) {
            return item;
        }

        if (item.workTypes) {
            item.workTypes = item.workTypes.filter(subType => this.getIsSearchedItem(subType, searchTerm));
            return item.workTypes.length ? item : undefined;
        }

        return undefined;
    }

    getMenu(source = MenuData) {
        return source.map(item => ({
            category: item.displayText,
            links: item.workTypes.map((type) => this.getMenuItem(type, item.displayText))
        })) as MegaMenu[];
    }

    getMenuItem(item: WorkType, category: string, parent?: WorkType): MenuItem {
        if (item.hasInternalLink) {
            const parentLink = parent ? `${(parent as MenuItem).routerLink}` : undefined;
            const itemName = item.name.toLowerCase();
            (item as MenuItem).routerLink = parentLink ? `${parentLink}#${itemName}` : `/article/${category.toLowerCase()}/${itemName}`;
        }

        if (item.workTypes) {
            item.workTypes = item.workTypes.map(workType => this.getMenuItem(workType, category, item))
        }

        return item as MenuItem;
    }

    getSubLink(item: unknown) {
        return item as MenuItem
    }

}
