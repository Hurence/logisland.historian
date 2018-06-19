export interface ITagsSelection {
    id:	string;
    name: string;
    tagsId: string[];
    ownerSharing?: string;
    description?: string;
}

export class TagsSelection implements ITagsSelection  {

    id:	string;
    name: string;
    tagsId: string[];
    ownerSharing?: string;
    description?: string;

    constructor(options: ITagsSelection) {
        Object.assign(this, options);
    }
}
