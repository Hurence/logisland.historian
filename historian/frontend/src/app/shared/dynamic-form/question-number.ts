import { QuestionBase, IQuestionBase } from './question-base';

export interface INumberQuestion extends IQuestionBase<number> {
  min?: number;
  max?: number;
}

export class NumberQuestion extends QuestionBase<number> implements INumberQuestion {
  controlType = 'number';
  min: number;
  max: number;

  constructor(options: INumberQuestion) {
    super(options);
    this.min = options.min || (options.min === 0 ? 0 : null);
    this.max = options.max || (options.max === 0 ? 0 : null);
  }
}
