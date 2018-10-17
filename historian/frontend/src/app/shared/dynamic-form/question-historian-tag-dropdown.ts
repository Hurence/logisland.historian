import { QuestionBase, IQuestionBase } from './question-base';
import { HistorianTag } from '../../modules/tag/modele/HistorianTag';

export interface HistorianTagIDropdownQuestion extends IQuestionBase<HistorianTag> {
  // options: {key: string, value: HistorianTag}[];
}

export class HistorianTagDropdownQuestion extends QuestionBase<HistorianTag> implements HistorianTagIDropdownQuestion {
  controlType = 'historian-tag-dropdown';
  // options: {key: string, value: HistorianTag}[];

  constructor(options: HistorianTagIDropdownQuestion) {
    super(options);
    // this.options = options['options'] || [];
  }
}
