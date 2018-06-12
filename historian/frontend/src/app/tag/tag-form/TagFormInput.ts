import { ITag, Tag } from '../modele/tag';

export interface ITagFormInput {
    tag: ITag;
    isCreation: boolean;
}

export class TagFormInput implements ITagFormInput {
    tag: ITag;
    isCreation: boolean;

    constructor(tag: ITag) {
        this.tag = tag;
        if (Tag.isHistorianTag(tag)) {
            this.isCreation = false;
        } else {
            this.isCreation = true;
        }
    }
}
