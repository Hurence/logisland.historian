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

        const formModel = {};
        /*Replace value only if field has been modified
        (we do not want to update all field when multiple tag are selected)*/
        Object.entries(form.controls).forEach(([key, control]) => {
            if (!control.pristine) {
                if (key === 'labels') {
                    const labelArray: FormArray = control as FormArray;
                    const labelsDeepCopy: string[] = labelArray.getRawValue().map(
                      (obj: {label: string}) => obj.label
                    );
                    formModel[key] = labelsDeepCopy;
                } else {
                    formModel[key] = control.value;
                }
            }
        });
        const tag = Object.assign({}, input.tag);
        Object.assign(tag, formModel);
        this.tag = tag as IHistorianTag;
    }
}
