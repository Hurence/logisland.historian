import { QuestionBase, IQuestionBase } from './question-base';

export interface IDropdownQuestion<T> extends IQuestionBase<T> {
  possibleValues: T[];
}

export class DropdownQuestion<T> extends QuestionBase<T> implements IDropdownQuestion<T> {
  controlType = 'dropdown';
  possibleValues: T[];

  constructor(options: IDropdownQuestion<T>) {
    super(options);
    this.possibleValues = options.possibleValues || [];
  }
}
