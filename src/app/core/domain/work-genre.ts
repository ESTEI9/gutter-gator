import { WorkCategories } from "./enum/work-categories";
import { WorkType } from "./work-type";

export class WorkGenre extends WorkType {
    category: WorkCategories;
    override workTypes: WorkType[];

    constructor() {
        super()
    }
}