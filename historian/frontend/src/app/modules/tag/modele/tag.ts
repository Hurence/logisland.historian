import { environment } from '../../../../environments/environment';
import { CanGetId } from '../../../shared/dynamic-form/BaseDynamicFormComponent';


export interface ITag {
    record_type: TagRecordType;
    id: string;
    datasource_id: string;
    domain: string;
    server: string;
    group: string;
    tag_name: string;
    data_type: TagDataType;
    update_rate: number;
    enabled: boolean;
    creation_date?: number;
    last_modification_date?: number;
    last_polling_date?: number;
    min_numeric_value?: number;
    max_numeric_value?: number;
    last_numeric_value?: number;
    last_quality?: number;
}

export const enum TagType {
    tagHist = 'tagHist',
    tagOpc = 'tagOpc'
}

export const enum TagRecordType {
    TAG = 'tag',
    FOLDER = 'folder'
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

export abstract class Tag implements ITag, CanGetId {
    static TAG_UPDATE_RATE_DEFAUT: number = environment.TAG_UPDATE_RATE_DEFAUT;

    record_type: TagRecordType;
    id: string;
    datasource_id: string;
    domain: string;
    server: string;
    group: string;
    tag_name: string;
    data_type: TagDataType;
    update_rate: number;
    enabled: boolean;
    creation_date?: number;
    last_modification_date?: number;
    last_polling_date?: number;
    min_numeric_value?: number;
    max_numeric_value?: number;
    last_numeric_value?: number;
    last_quality?: number;

    constructor(options: ITag) {
        Object.assign(this, options);
        if (this.update_rate === null || this.update_rate === undefined) this.update_rate = Tag.TAG_UPDATE_RATE_DEFAUT;
        if (this.enabled === null || this.enabled === undefined) this.enabled = false;
        if (this.record_type === null || this.record_type === undefined) this.record_type = TagRecordType.TAG;
    }

    getId(): string {
        return this.id;
    }
}
