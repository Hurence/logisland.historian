import { QuestionBase, IQuestionBase } from './question-base';

export interface ITextboxQuestion extends IQuestionBase<string> {
  type?: string;
}

export class TextboxQuestion extends QuestionBase<string> implements ITextboxQuestion {
  controlType = 'textbox';
  type: string;

  constructor(options: ITextboxQuestion) {
    super(options);
    this.type = options['type'] || '';
    if (this.hidden) {
      this.type = 'hidden';
    }
  }
}
