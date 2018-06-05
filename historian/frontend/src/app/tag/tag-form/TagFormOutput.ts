import { IHistorianTag } from '../modele/HistorianTag';
import { TagFormInput } from './TagFormInput';

export interface ITagFormOutput {
    tag: IHistorianTag;
    isCreation: boolean;
}

export class TagFormOutput implements ITagFormOutput {
    tag: IHistorianTag;
    isCreation: boolean;

    constructor(input: TagFormInput,
        formModel: any,
        labelsDeepCopy: string[]) {
        this.isCreation = input.isCreation;
        const tag = Object.assign({}, input.tag);
        Object.assign(tag, formModel);
        Object.assign(tag, { labels: labelsDeepCopy });
        this.tag = tag as IHistorianTag;
    }
}
