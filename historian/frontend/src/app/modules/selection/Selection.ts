import { IRestModelObject } from '../../shared/base-model-service';

export interface ITagsSelection extends IRestModelObject {
    id: string;
    tagsId: string[];
    ownerSharing?: string;
    description?: string;
}

export class TagsSelection implements ITagsSelection  {
    id: string;
    tagsId: string[];
    ownerSharing?: string;
    description?: string;

    constructor(options: ITagsSelection) {
        Object.assign(this, options);
    }

}
