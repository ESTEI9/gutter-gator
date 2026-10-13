import { WorkType } from "@core/domain/work-type";

export class MenuItem extends WorkType {
    routerLink?: string;

    constructor() {
        super()
    }
}