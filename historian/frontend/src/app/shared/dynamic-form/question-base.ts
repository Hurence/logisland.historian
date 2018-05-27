/*Copied from angular doc*/

export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    placeholder: string;    
  
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        placeholder?: string;
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || (this.key && this.key.toUpperCase()) || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.placeholder = options.placeholder || '';
    }
  }