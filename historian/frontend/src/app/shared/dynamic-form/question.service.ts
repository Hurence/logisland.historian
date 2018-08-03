import { Injectable } from '@angular/core';

import { ArrayQuestion } from './question-array';
import { QuestionBase } from './question-base';
import { DropdownQuestion } from './question-dropdown';
import { TextboxQuestion } from './question-textbox';
import { NumberQuestion } from './question-number';
import { BooleanQuestion } from './question-boolean';

@Injectable()
export class QuestionService {


  constructor() {}

  getTagForm(): QuestionBase<any>[]  {

    const questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'node_id',
        label: 'Node Id',
        order: 1,
        disabled: true,
      }),

      new NumberQuestion({
        key: 'update_rate',
        label: 'Sampling rate',
        order: 5,
        required: true,
        min: 0,
      }),

      new TextboxQuestion({
        key: 'id',
        label: 'Id',
        order: 1,
        type: 'hidden',
        hidden: true,
      }),
      new TextboxQuestion({
        key: 'tag_name',
        label: 'tag name',
        order: 2,
        disabled: true,
      }),

      new TextboxQuestion({
        key: 'datasource_id',
        label: 'Datasourqce Name',
        order: 3,
        disabled: true,
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        placeholder: 'description...',
        required: true,
        order: 4
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

      // new NumberQuestion({
      //   key: 'polling subscribe',
      //   label: 'polling subscribe',
      //   order: 6,
      //   required: false,
      //   readonly: true,
      //   min: 0,
      // }),

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
