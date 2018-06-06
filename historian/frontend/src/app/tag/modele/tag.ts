import { IHistorianTag } from './HistorianTag';

export interface ITag {
    id?: string;
    datasource_id?: string;
    domain?: string;
    server?: string;
    group?: string;
    tag_name?: string;
    data_type?: TagDataType;
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

export const enum TagType {
    tagHist = 'tagHist',
    tagOpc = 'tagOpc'
}

export const enum TagDataType {
    INT = 'int',
    LONG = 'long',
    FLOAT = 'float',
    DOUBLE = 'double',
    STRING = 'string',
    ARRAY = 'array',
    BYTES = 'bytes',
    BOOLEAN = 'boolean'
}

export abstract class Tag implements ITag {
    id?: string;
    datasource_id?: string;
    domain?: string;
    server?: string;
    group?: string;
    tag_name?: string;
    data_type?: TagDataType;
    // text: string[];//catch all field
    creation_date?: number;
    last_modification_date?: number;
    last_polling_date?: number;
    // update_rate: number;
    min_numeric_value?: number;
    max_numeric_value?: number;
    last_numeric_value?: number;
    last_quality?: number;

    constructor(options: ITag = {
        id: '',
        domain: '',
        server: '',
        group: '',
        tag_name: '',
        data_type: TagDataType.BOOLEAN,
      }) {
        Object.assign(this, options);
    }

    public static isHistorianTag(tag: ITag): tag is IHistorianTag {
        return (tag as IHistorianTag).description !== null;
    }
}
