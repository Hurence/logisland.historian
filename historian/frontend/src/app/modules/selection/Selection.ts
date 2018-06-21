import { CanGetId } from '../../shared/dynamic-form/BaseDynamicFormComponent';

export interface ITagsSelection {
    name: string;
    tagIds: string[];
    owner?: string;
    ownerSharing?: string; // TODO use permissions object
    description?: string;
}

export class TagsSelection implements ITagsSelection, CanGetId  {
    name: string;
    tagIds: string[];
    owner?: string;
    ownerSharing?: string;
    description?: string;

    constructor(options?: ITagsSelection) {
        Object.assign(this, options);
    }

    getId(): string {
        return this.name;
    }
}
