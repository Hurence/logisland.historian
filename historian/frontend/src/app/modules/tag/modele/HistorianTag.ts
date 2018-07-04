import { Tag, ITag } from './tag';


export interface IHistorianTag extends ITag {
    labels: string[];
    description: string;
    update_rate: number;
    isHistorianTag?: boolean;
}

export class HistorianTag extends Tag implements IHistorianTag  {

    labels: string[];
    description: string;
    update_rate: number;
    isHistorianTag = true;

    constructor(options: IHistorianTag = {
        description: '',
        labels: [],
        update_rate: 0,
      }) {
          super(options);
    }
}
