import { Injectable } from '@angular/core';

import { ArrayQuestion } from './question-array';
import { QuestionBase } from './question-base';
import { DropdownQuestion } from './question-dropdown';
import { TextboxQuestion } from './question-textbox';
import { NumberQuestion } from './question-number';

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

      new NumberQuestion({
        key: 'update_rate',
        label: 'update rate',
        order: 5,
        required: true,
        min: 0,
      }),

      new TextboxQuestion({
        key: 'group',
        label: 'Group',
        order: 8,
        disabled: true
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  getAddTagForm(): QuestionBase<any>[]  {

    const questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'node_id',
        label: 'Node Id',
        order: 1,
        disabled: false,
        required: true
      }),

      new TextboxQuestion({
        key: 'id',
        label: 'Id',
        order: 2,
        type: 'hidden',
        hidden: true,
      }),
      new TextboxQuestion({
        key: 'tag_name',
        label: 'tag name',
        order: 3,
        readonly: true
      }),

      new TextboxQuestion({
        key: 'datasource_id',
        label: 'Datasourqce Name',
        order: 4,
        readonly: true
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        placeholder: 'description...',
        required: true,
        order: 5
      }),

      new NumberQuestion({
        key: 'update_rate',
        label: 'update rate',
        order: 6,
        required: true,
        min: 0,
      }),

      new TextboxQuestion({
        key: 'group',
        label: 'Group',
        order: 7,
      }),
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
