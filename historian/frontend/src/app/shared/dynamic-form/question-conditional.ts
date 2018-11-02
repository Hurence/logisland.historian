import { QuestionBase, IQuestionBase } from './question-base';
import { RadioQuestion } from './question-radio';

export interface IConditionalQuestion<T> extends IQuestionBase<T> {
  conditionsQuestion: RadioQuestion<string>;
  conditionsResult: { ifKey: string, thenQuestion: QuestionBase<T> }[];
}

export class ConditionalQuestion<T> extends QuestionBase<T> implements IConditionalQuestion<T> {
  controlType = 'conditional';
  conditionsQuestion: RadioQuestion<string>;
  conditionsResult: { ifKey: string, thenQuestion: QuestionBase<T> }[];

  constructor(options: IConditionalQuestion<T>) {
    super(options);
    this.conditionsQuestion = options.conditionsQuestion;
    this.conditionsResult = options.conditionsResult;
  }
}
