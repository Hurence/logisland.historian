import { IHistorianTag } from './HistorianTag';

export interface ITag {
    id?: string;
    datasource_id?: string;
    domain?: string;
    server?: string;
    group?: string;
    tag_name?: string;
    data_type?: string;
    // text: string[];//catch all field
    creation_date?: number;
    last_modification_date?: number;
    last_polling_date?: number;
    // update_rate: number;
    min_numeric_value?: number;
    max_numeric_value?: number;
    last_numeric_value?: number;
    last_quality?: number;

}

export abstract class Tag implements ITag {
    id?: string;
    datasource_id?: string;
    domain?: string;
    server?: string;
    group?: string;
    tag_name?: string;
    data_type?: string;
    // text: string[];//catch all field
    creation_date?: number;
    last_modification_date?: number;
    last_polling_date?: number;
    // update_rate: number;
    min_numeric_value?: number;
    max_numeric_value?: number;
    last_numeric_value?: number;
    last_quality?: number;

    private data_types = new Set(['int', 'long', 'float', 'double', 'string', 'array', 'bytes', 'boolean']);

    constructor(options: ITag = {
        id: '',
        domain: '',
        server: '',
        group: '',
        tag_name: '',
        data_type: 'boolean',
      }) {
        if (!this.data_types.has(options.data_type)) {
            console.error(`data_type "${options.data_type}" is not known`);
        }
        Object.assign(this, options);
    }

    public static isHistorianTag(tag: ITag): tag is IHistorianTag {
        return (tag as IHistorianTag).description !== null;
    }
}
