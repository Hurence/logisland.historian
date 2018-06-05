import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { ArrayQuestion } from './question-array';
import { QuestionControlService } from './question-control.service';

@Injectable()
export class QuestionService {


  constructor(private qcs: QuestionControlService) {}

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getMockQuestions(): QuestionBase<any>[]  {

    let questions: QuestionBase<any>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }


  getTagFormSingleSelection(): QuestionBase<any>[]  {
    // id: string;
    // domain: string;
    // server: string;
    // group: string;
    // tag_name: string;
    // labels: string[];
    // data_type: string;
    // description: string;
    // text: string[];//catch all field
    // creation_date: number;
    // last_modification_date: number;
    // last_polling_date: number;
    // update_rate: number;
    // min_numeric_value: number;
    // max_numeric_value: number;
    // last_numeric_value: number;
    // last_quality: number;
    
    let questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'tag_name',
        label: 'TAG NAME',        
        order: 4,
        disabled: true,
      }),

      new TextboxQuestion({
        key: 'id',    
        order: 5,
        disabled: true
      }),

      new TextboxQuestion({
        key: 'domain',      
        order: 6,
        disabled: true
      }),

      new TextboxQuestion({
        key: 'server',      
        order: 7,
        disabled: true
      }),

      new TextboxQuestion({
        key: 'group',             
        order: 8,
        disabled: true
      }),

      new TextboxQuestion({
        key: 'creation_date',
        label: 'CREATION DATE',        
        order: 9,
        disabled: true
      }),

      new TextboxQuestion({
        key: 'last_modification_date',
        label: 'LAST MODIFICATION DATE',        
        order: 10,
        disabled: true
      }),

      new TextboxQuestion({
        key: 'last_polling_date',
        label: 'LAST POLLING DATE',        
        order: 11,
        disabled: true
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
  
  getTagFormMultiSelection(): QuestionBase<any>[]  {

    let questions: QuestionBase<any>[] = [

      new ArrayQuestion<string>({
        key: 'labels',
        order: 1,
        questions: [
          new TextboxQuestion({
            key: 'label',
            placeholder: 'label...',
          })
        ]
      },
      this.qcs),

      new TextboxQuestion({
        key: 'description',
        placeholder: 'description...',
        required: true,
        order: 2
      }),

      new TextboxQuestion({
        key: 'update_rate',
        label: 'UPDATE RATE',
        order: 3
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}