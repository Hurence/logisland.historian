import { INumberQuestion, NumberQuestion } from './question-number';

/*Copied from angular doc*/

export interface IQuestion {}

export class IQuestionBase<T> implements IQuestion {
  key: string;
  controlType?: string;
  value?: T;
  order?: number;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
}

export class QuestionBase<T> implements IQuestionBase<T> {
  value?: T;
  key: string;
  label: string;
  required: boolean;
  disabled: boolean;
  order: number;
  controlType: string;
  placeholder: string;
  readonly: boolean;

  constructor(options: IQuestionBase<T>) {
    this.value = options.value;
    this.key = options.key || '';
    this.controlType = options.controlType || '';
    this.label = options.label || (this.key && this.key.toUpperCase()) ||  '';
    this.required = !!options.required;
    this.disabled = !!options.disabled;
    this.order = options.order === undefined ? 1 : options.order;
    this.placeholder = options.placeholder || '';
    this.readonly = options.readonly || false;
  }

  public static isNumberQuestion(arg: IQuestion): arg is NumberQuestion {
    return (arg as INumberQuestion).controlType === 'number';
  }
}
