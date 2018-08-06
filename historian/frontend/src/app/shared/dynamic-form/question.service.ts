import { Injectable } from '@angular/core';

import { ArrayQuestion } from './question-array';
import { QuestionBase } from './question-base';
import { DropdownQuestion } from './question-dropdown';
import { TextboxQuestion } from './question-textbox';
import { NumberQuestion } from './question-number';
import { BooleanQuestion } from './question-boolean';
import { RadioQuestion } from './question-radio';
import { PollingMode, PollingModeUtil } from '../../modules/tag/modele/tag';

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
        label: 'Sampling rate',
        order: 7,
        required: true,
        readonly: false,
        min: 0,
      }),

      new RadioQuestion({
        key: 'polling_mode',
        label: 'Method to retrieve data',
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
        label: 'Server scan rate',
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
        label: 'tag name',
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
        required: true
      }),

      new NumberQuestion({
        key: 'update_rate',
        label: 'Sampling rate',
        order: 7,
        required: true,
        readonly: false,
        min: 0,
      }),

      new RadioQuestion({
        key: 'polling_mode',
        label: 'Method to retrieve data',
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
        label: 'Server scan rate',
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
        label: 'tag name',
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
}
