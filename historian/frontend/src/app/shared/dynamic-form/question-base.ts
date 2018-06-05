/*Copied from angular doc*/


export class IQuestionBase<T> {
  key: string;
  controlType?: string;
  value?: T;
  order?: number;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
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
  
    constructor(options: IQuestionBase<T>) {
      this.value = options.value;
      this.key = options.key || '';
      this.controlType = options.controlType || '';
      this.label = options.label || (this.key && this.key.toUpperCase()) || '';
      this.required = !!options.required;
      this.disabled = !!options.disabled;
      this.order = options.order === undefined ? 1 : options.order;
      this.placeholder = options.placeholder || '';
    }
  }