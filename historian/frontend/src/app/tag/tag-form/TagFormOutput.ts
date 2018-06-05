import { IHistorianTag } from '../modele/HistorianTag';
import { TagFormInput } from './TagFormInput';
import { FormGroup, FormArray } from '@angular/forms';

export interface ITagFormOutput {
    tag: IHistorianTag;
    isCreation: boolean;
}

export class TagFormOutput implements ITagFormOutput {
    tag: IHistorianTag;
    isCreation: boolean;

    constructor(input: TagFormInput, form: FormGroup) {
        this.isCreation = input.isCreation;

        const formModel = form.value;
        const labelArray: FormArray = form.controls.labels as FormArray;
        
        const labelsDeepCopy: string[] = labelArray.getRawValue().map(
          (obj: {label: string}) => obj.label
        );
        // return new `Tag` object containing a combination of original tag value(s)
        // and deep copies of changed form model values
        const tag = Object.assign({}, input.tag);
        Object.assign(tag, formModel);
        Object.assign(tag, { labels: labelsDeepCopy });
        this.tag = tag as IHistorianTag;
    }
}
