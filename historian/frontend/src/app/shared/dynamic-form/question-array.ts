import { QuestionBase, IQuestionBase } from './question-base';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { QuestionControlService } from './question-control.service';

export interface IArrayQuestion<T> extends IQuestionBase<T[]> {
  questions: QuestionBase<any>[];
}

interface IQuestionCanAddRemoveGetControls {
  addItem(form: FormGroup): void;
  removeItem(form: FormGroup, index: number): void;
  getArrayControls(form: FormGroup): AbstractControl[];
  getFormControlName(index: number): string;
}

export class ArrayQuestion<T> extends QuestionBase<T[]> implements IArrayQuestion<T>, IQuestionCanAddRemoveGetControls {
    controlType = 'array';
    questions: QuestionBase<any>[];

    constructor(options: IArrayQuestion<T>,
                private qcs: QuestionControlService) {
      super(options);
      this.questions = options.questions || [];
    }

    addItem(form: FormGroup) {
      this.getArrayControls(form).push(this.createAnArrayFormGroup());
    }

    removeItem(form: FormGroup, index: number) {
      if (index > -1) {
        this.getArrayControls(form).splice(index, 1);
      }
    }

    getArrayControls(form: FormGroup): AbstractControl[] {
      // console.log('exectuting getArrayControls');//TODO find why it is executed when hoverring over tree tag
      return this.getFormArray(form).controls;
    }

    getFormControlName(index: number): string {
        return this.questions[0].key;
    }

    private createAnArrayFormGroup(): FormGroup {
      return this.qcs.toFormGroup(this.questions);
    }

    private getFormArray(form: FormGroup): FormArray {
      return form.get(this.key) as FormArray;
    }
  }
