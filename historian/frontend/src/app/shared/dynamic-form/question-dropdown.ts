import { QuestionBase, IQuestionBase } from './question-base';

export interface IDropdownQuestion extends IQuestionBase<string> {
  options: {key: string, value: string}[];
}

export class DropdownQuestion extends QuestionBase<string> implements IDropdownQuestion {
  controlType = 'dropdown';
  options: {key: string, value: string}[];

  constructor(options: IDropdownQuestion) {
    super(options);
    this.options = options['options'] || [];
  }
}