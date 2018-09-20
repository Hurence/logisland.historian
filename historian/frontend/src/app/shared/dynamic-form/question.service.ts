import { Injectable } from '@angular/core';

import { PollingModeUtil } from '../../modules/tag/modele/tag';
import { QuestionBase } from './question-base';
import { BooleanQuestion } from './question-boolean';
import { NumberQuestion } from './question-number';
import { RadioQuestion } from './question-radio';
import { TextboxQuestion } from './question-textbox';

@Injectable()
export class QuestionService {


  constructor() {}

  getTagForm(): QuestionBase<any>[]  {

    const questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'node_id',
        label: 'Node Id',
        order: 1,
        required: true
      }),

      new NumberQuestion({
        key: 'update_rate',
        label: 'Sampling rate in milliseconds',
        order: 7,
        required: true,
        readonly: false,
        min: 0,
      }),

      new RadioQuestion({
        key: 'polling_mode',
        label: 'Read mode',
        order: 6,
        required: false,
        readonly: true,
        possibleValues: PollingModeUtil.values,
      }),

      new BooleanQuestion({
        key: 'enabled',
        label: 'Tag Monitored ?',
        order: 6,
        required: true,
        value: true,
      }),

      new NumberQuestion({
        key: 'server_scan_rate',
        label: 'Server scan rate in milliseconds',
        order: 6,
        required: false,
        readonly: true,
        min: 0,
      }),

      new TextboxQuestion({
        key: 'id',
        label: 'Id',
        order: 2,
        hidden: true,
      }),
      new TextboxQuestion({
        key: 'tag_name',
        label: 'Tag name',
        order: 3,
        readonly: true,
      }),

      new TextboxQuestion({
        key: 'datasource_id',
        label: 'Datasource Name',
        order: 4,
        readonly: true,
        hidden: true,
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        readonly: true,
        order: 5,
      }),
    ];
    return questions;
  }

  getAddTagForm(): QuestionBase<any>[]  {

    const questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'node_id',
        label: 'Node Id',
        order: 1,
        required: true,
      }),

      new NumberQuestion({
        key: 'update_rate',
        label: 'Sampling rate in milliseconds',
        order: 7,
        required: true,
        readonly: false,
        min: 0,
      }),

      new RadioQuestion({
        key: 'polling_mode',
        label: 'Read mode',
        order: 6,
        required: false,
        readonly: true,
        possibleValues: PollingModeUtil.values,
      }),

      new BooleanQuestion({
        key: 'enabled',
        label: 'Start monitoring tag ?',
        order: 6,
        required: true,
        value: true,
      }),

      new NumberQuestion({
        key: 'server_scan_rate',
        label: 'Server scan rate in milliseconds',
        order: 6,
        required: false,
        readonly: true,
        min: 0,
      }),

      new TextboxQuestion({
        key: 'id',
        label: 'Id',
        order: 2,
        hidden: true,
      }),
      new TextboxQuestion({
        key: 'tag_name',
        label: 'Tag name',
        order: 3,
        readonly: true,
      }),

      new TextboxQuestion({
        key: 'datasource_id',
        label: 'Datasource Name',
        order: 4,
        readonly: true,
        hidden: true,
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        readonly: true,
        order: 5,
      }),

    ];
    questions.forEach(question => question.elementId = 'add-' + question.elementId);
    return questions;
  }
}
