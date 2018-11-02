import { environment } from '../../../../environments/environment';


export interface ITag {
    record_type: TagRecordType;
    id: string;
    node_id: string;
    datasource_id: string;
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
    polling_mode?: PollingMode;
}

export const enum TagType {
    tagHist = 'tagHist',
    tagOpc = 'tagOpc'
}

export const enum TagRecordType {
    TAG = 'tag',
    FOLDER = 'folder'
}

export enum PollingMode {
    POLLING = 'polling',
    SUBSCRIBE = 'subscribe'
}
export namespace PollingModeUtil {
    export const keys: (keyof typeof PollingMode)[] = <(keyof typeof PollingMode)[]>Object.keys(PollingMode);
    export const values: string[] = keys.map(k => PollingMode[k]);
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
    static TAG_UPDATE_RATE_DEFAUT: number = environment.TAG_UPDATE_RATE_DEFAUT;

    record_type: TagRecordType;
    id: string;
    node_id: string;
    datasource_id: string;
    group: string;
    tag_name: string;
    data_type: TagDataType;
    update_rate: number;
    enabled: boolean;
    polling_mode: PollingMode;
    creation_date?: number;
    last_modification_date?: number;
    last_polling_date?: number;
    min_numeric_value?: number;
    max_numeric_value?: number;
    last_numeric_value?: number;
    last_quality?: number;

    constructor(options?: ITag) {
        Object.assign(this, options);
        if (this.update_rate === null || this.update_rate === undefined) this.update_rate = Tag.TAG_UPDATE_RATE_DEFAUT;
        if (this.enabled === null || this.enabled === undefined) this.enabled = false;
        if (this.record_type === null || this.record_type === undefined) this.record_type = TagRecordType.TAG;
        if (this.id === null || this.id === undefined || this.id === '') this.id = 'idToBeGenerated';
        if (this.data_type === null || this.data_type === undefined) this.data_type = TagDataType.DOUBLE;
        if (this.polling_mode === null || this.polling_mode === undefined) this.polling_mode = PollingMode.POLLING;
    }

    getId(): string {
        return this.id;
    }
}
