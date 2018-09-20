import { QuestionBase, IQuestionBase } from './question-base';

export interface IBooleanQuestion extends IQuestionBase<boolean> {}

export class BooleanQuestion extends QuestionBase<boolean> implements IBooleanQuestion {
  controlType = 'boolean';

  constructor(options: IBooleanQuestion) {
    super(options);
  }
}
