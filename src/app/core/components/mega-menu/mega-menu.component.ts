import { Component, computed, input, output } from '@angular/core';
import { MenuData } from '@core/menu-data';
import { MegaMenu } from './domain/mega-menu';
import { MenuItem } from './domain/menu-item';
import { WorkType } from '@core/domain/work-type';
import { IonListHeader, IonList, IonItem, IonItemGroup, IonButton, IonLabel } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { WorkDivision } from '@core/domain/work-division';
import { MenuDivision } from './domain/menu-division';
import { WorkGenre } from '@core/domain/work-genre';

@Component({
    selector: 'gg-mega-menu',
    templateUrl: './mega-menu.component.html',
    styleUrls: ['./mega-menu.component.scss'],
    imports: [IonListHeader, IonList, IonItem, IonItemGroup, IonButton, RouterLink, IonLabel],
})
export class MegaMenuComponent {
    searchString = input<string>();
    searchMatches = output<MenuDivision[]>();

    splitRegex = /[\s,\,,-]/;
    fullMenu: MenuDivision[] = this.getMenus();

    menu = computed(() => {
        const searchTerm = this.searchString() ?? '';

        if (searchTerm === '') {
            this.searchMatches.emit([]);
            return this.fullMenu;
        }

        const data = (structuredClone(MenuData) as WorkDivision[]).map(division => {
            const newMembers = division.members.map(member => {
                const newMenu = member.workTypes.filter(workType => {
                    return searchTerm.split(' ').every(term => this.getIsSearchedItem(workType, term.toLowerCase()));
                })

                if (newMenu.length) {
                    member.workTypes = newMenu;
                    return member;
                }

                return undefined
            }).filter(member => member !== undefined);

            if(newMembers && newMembers.length > 0) {
                return {
                    name: division.name,
                    members: newMembers
                } as WorkDivision
            }

            return undefined;
        }).filter(division => division !== undefined)

        const newMenu = this.getMenus(data);
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

    getMenus(source = MenuData) {
        return source.map(division => ({
            name: division.name,
            divisions: division.members.map(member => ({
                category: member.displayText,
                links: member.workTypes.map((type) => this.getMenuItem(type, member.displayText))
            }))
        })) as MenuDivision[]
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
