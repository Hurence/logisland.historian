import { ITag, Tag } from '../modele/tag';
import { TagUtils } from '../modele/TagUtils';

export interface ITagFormInput {
    tag: Tag;
    isCreation: boolean;
}

export class TagFormInput implements ITagFormInput {
    tag: Tag;
    isCreation: boolean;

    constructor(tag: Tag) {
        this.tag = tag;
        if (TagUtils.isHistorianTag(tag)) {
            this.isCreation = false;
        } else {
            this.isCreation = true;
        }
    }
}
