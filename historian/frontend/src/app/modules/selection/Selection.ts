import { CanGetId } from '../../shared/dynamic-form/BaseDynamicFormComponent';

export interface ITagsSelection {
    name: string;
    owner?: string;
    ownerSharing?: string; // TODO use permissions object
    description?: string;
}

export interface ITagsSelectionSet extends ITagsSelection {
    tagIds: Set<string>;
}

export interface ITagsSelectionArray extends ITagsSelection {
    tagIds: string[];
}

export class TagsSelectionArray implements ITagsSelectionArray, CanGetId  {

    name: string;
    tagIds: string[];
    owner?: string;
    ownerSharing?: string;
    description?: string;

    constructor(options?: ITagsSelection | ITagsSelectionArray) {
        if (!options) {
            Object.assign(this, {
                name: '',
                tagIds: [],
            });
        } else {
            Object.assign(this, options);
            if (!TagsSelection.isITagsSelectionArray(options)) {
                this.tagIds = Array.from(this.tagIds);
            }
        }
    }

    getId(): string {
        return this.name;
    }
}

export class TagsSelection implements ITagsSelectionSet, CanGetId  {

    public static isITagsSelectionArray(tagsSelection: ITagsSelection): tagsSelection is ITagsSelectionArray {
        return (tagsSelection as ITagsSelectionArray).tagIds instanceof Array;
    }

    name: string;
    tagIds: Set<string>;
    owner?: string;
    ownerSharing?: string;
    description?: string;

    constructor(options?: ITagsSelection | ITagsSelectionArray) {
        if (!options) {
            Object.assign(this, {
                name: '',
                tagIds: new Set(),
            });
        } else {
            Object.assign(this, options);
            if (TagsSelection.isITagsSelectionArray(options)) {
                this.tagIds = new Set(this.tagIds);
            }
        }
    }

    getArrayForm(): ITagsSelectionArray {
        let arrayForm: any = Object.assign({}, this)
        arrayForm.tagIds = this.tagIdsArray;
        return arrayForm;
    }

    getId(): string {
        return this.name;
    }

    get tagIdsArray() {
        return Array.from(this.tagIds);
    }

    containTag(id: string): boolean {
        return this.tagIds.has(id);
    }

    addTag(id: string): void {
        this.tagIds.add(id);
    }

    removeTag(id: string): void {
        this.tagIds.delete(id);
    }
}
