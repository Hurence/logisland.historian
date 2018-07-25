import { Tag, ITag } from './tag';
import { CanGetId } from '../../../shared/dynamic-form/BaseDynamicFormComponent';

export interface IHistorianTag extends ITag {
    description?: string;
    labels?: string[];
}

export class HistorianTag extends Tag implements IHistorianTag {

    labels?: string[];
    description?: string;

    constructor(options: IHistorianTag) {
          super(options);
          if (this.description === undefined || this.description === null) this.description = 'default description';
    }
}
