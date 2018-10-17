import { QuestionBase, IQuestionBase } from './question-base';
import { HistorianTag } from '../../modules/tag/modele/HistorianTag';

export interface HistorianTagIDropdownQuestion extends IQuestionBase<HistorianTag> {

}

export class HistorianTagDropdownQuestion extends QuestionBase<HistorianTag> implements HistorianTagIDropdownQuestion {
  controlType = 'historian-tag-dropdown';

  constructor(options: HistorianTagIDropdownQuestion) {
    super(options);
  }
}
