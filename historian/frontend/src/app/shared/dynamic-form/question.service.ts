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
        key: 'id',
        label: 'Id',
        order: 1,
        disabled: true
      }),
      new TextboxQuestion({
        key: 'tag_name',
        label: 'tag name',
        order: 2,
        disabled: true,
      }),

      new TextboxQuestion({
        key: 'datasource_id',
        label: 'Datasource Name',
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
        key: 'domain',
        label: 'Domain',
        order: 6,
        disabled: true
      }),

      new TextboxQuestion({
        key: 'server',
        label: 'Server',
        order: 7,
        disabled: true
      }),

      new TextboxQuestion({
        key: 'group',
        label: 'Group',
        order: 8,
        disabled: true
      }),
      // new ArrayQuestion<string>({
      //   key: 'labels',
      //   label: 'Labels',
      //   order: 1,
      //   questions: [
      //     new TextboxQuestion({
      //       key: 'label',
      //       label: 'Label',
      //       placeholder: 'label...',
      //     })
      //   ]
      // }),
      // new TextboxQuestion({
      //   key: 'creation_date',
      //   label: 'creation date',
      //   order: 9,
      //   disabled: true
      // }),
      // new TextboxQuestion({
      //   key: 'last_modification_date',
      //   label: 'last modification date',
      //   order: 10,
      //   disabled: true
      // }),
      // new TextboxQuestion({
      //   key: 'last_polling_date',
      //   label: 'last polling date',
      //   order: 11,
      //   disabled: true
      // })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
