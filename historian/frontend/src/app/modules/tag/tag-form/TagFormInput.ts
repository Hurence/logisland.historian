import { ITag, Tag } from '../modele/tag';
import { TagUtils } from '../modele/TagUtils';

export interface ITagFormInput {
    tag: ITag;
    isCreation: boolean;
}

export class TagFormInput implements ITagFormInput {
    tag: ITag;
    isCreation: boolean;

    constructor(tag: ITag) {
        this.tag = tag;
        if (TagUtils.isHistorianTag(tag)) {
            this.isCreation = false;
        } else {
            this.isCreation = true;
        }
    }
}
