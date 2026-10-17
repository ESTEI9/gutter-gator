import { WorkCategories } from "./domain/enum/work-categories";
import { WorkGenre } from "./domain/work-genre";
import { WorkType } from "./domain/work-type";

const data: WorkGenre[] = [
    {
        category: WorkCategories.GUTTERS,
        name: 'gutters',
        displayText: 'Gutters',
        workTypes: [
            {
                name: 'cleaning',
                displayText: 'Cleaning',
                hasInternalLink: true
            }, {
                name: 'installation',
                displayText: 'Install',
                hasInternalLink: true,
                workTypes: [
                    {
                        name: 'gutters',
                        displayText: 'Gutters',
                        hasInternalLink: true,
                    },
                    {
                        name: 'gutter-guards',
                        displayText: 'Guards',
                        hasInternalLink: true,
                    }, {
                        name: 'french-drains',
                        displayText: 'French Drains',
                        hasInternalLink: true,
                    }
                ]
            }
        ]
    }, {
        category: WorkCategories.ROOFING,
        name: 'roofing',
        displayText: 'Roofing',
        workTypes: [
            {
                name: 'cleaning',
                displayText: 'Soft Washing'
            }, {
                name: 'repair',
                displayText: 'Repair',
                workTypes: [
                    {
                        name: 'facia',
                        displayText: 'Facia'
                    }, {
                        name: 'tiling',
                        displayText: 'Tiles'
                    }, {
                        name: 'trusses',
                        displayText: 'Trusses'
                    }
                ]
            }
        ]
    }, {
        category: WorkCategories.CONCRETE,
        name: 'concrete',
        displayText: 'Concrete',
        workTypes: [
            {
                name: 'power-washing',
                displayText: 'Power Washing'
            }, {
                name: 'Install',
                displayText: 'Dry/Wet Cement',
            }, {
                name: 'repair',
                displayText: 'Repair',
                workTypes: [
                    {
                        name: 'patches',
                        displayText: 'Patches'
                    }, {
                        name: 'leveling',
                        displayText: 'Leveling'
                    }
                ]
            }
        ]
    }, {
        category: WorkCategories.CONSTRUCTION,
        name: 'construction',
        displayText: 'Construction',
        workTypes: [
            {
                name: 'doors',
                displayText: 'Doors',
            }, {
                name: 'windows',
                displayText: 'Windows',
            }, {
                name: 'siding',
                displayText: 'Siding'
            }, {
                name: 'wood-working',
                displayText: 'Wood Working'
            }, {
                name: 'drywall',
                displayText: 'Drywall'
            }, {
                name: 'insulation',
                displayText: 'Insulation'
            }
        ]
    }, {
        category: WorkCategories.LANDSCAPING,
        name: 'landscaping',
        displayText: 'Landscaping',
        workTypes: [
            {
                name: 'decorations',
                displayText: 'Decorations'
            }, {
                name: 'power-washing',
                displayText: 'Power Washing'
            }, {
                name: 'lawn-care',
                displayText: 'Lawn',
                workTypes: [
                    {
                        name: 'grass',
                        displayText: 'Trimming/Mowing',
                    }, {
                        name: 'maintenance',
                        displayText: 'Maintenance'
                    }, {
                        name: 'seeding',
                        displayText: 'Seeding'
                    }
                ]
            }
        ]
    }
]

export const MenuData = (() => {
    return data.map(item => {
        item.searchTerms = getSearchTermPool(item);
        item.workTypes = item.workTypes.map(workType => getSearchTerms(workType, [item.name]));

        return item;
    });
})()

function getSearchTerms(item: WorkType, carryOver?: string[]) {
    item.searchTerms = [...(item.searchTerms ?? []), ...getSearchTermPool(item), ...(carryOver ?? [])].filter((term, index, terms) => term && terms.indexOf(term) === index);

    if (item.workTypes) {
        item.workTypes.map(subType => getSearchTerms(subType, carryOver));
    }

    return item;
}

function getSearchTermPool(item: WorkType) {
    const splitRegex = /[\s,\,,-]/;
    const name = item.name.toLowerCase().split(splitRegex);
    const displayText = item.displayText.toLowerCase().split(splitRegex);
    let termsToSearch = [...name, ...displayText];
    if (item.searchTerms) {
        const searchTerms = item.searchTerms.flatMap(term => term.toLowerCase().split(splitRegex));
        termsToSearch = termsToSearch.concat(searchTerms);
    }

    return termsToSearch;
}