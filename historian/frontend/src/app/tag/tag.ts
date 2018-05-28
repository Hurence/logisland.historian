export class Tag {

    private data_types = new Set(['int', 'long', 'float', 'double', 'string', 'array', 'bytes', 'boolean']);


    id: string;
    domain: string;
    server: string;
    group: string;
    tag_name: string;
    labels: string[];
    data_type: string;
    description: string;
    text: string[];//catch all field
    creation_date: number;
    last_modification_date: number;
    last_polling_date: number;
    update_rate: number;
    min_numeric_value: number;
    max_numeric_value: number;
    last_numeric_value: number;
    last_quality: number;

    constructor(options: {
        id?: string,
        domain?: string,
        server?: string,
        group?: string,
        tag_name?: string,
        labels?: string[],
        data_type?: string,
        description?: string,
        text?: string[],
        creation_date?: number,
        last_modification_date?: number,
        last_polling_date?: number,
        update_rate?: number,
        min_numeric_value?: number,
        max_numeric_value?: number,
        last_numeric_value?: number,
        last_quality?: number
      } = {}) {
        if (!this.data_types.has(options.data_type)) {
            console.error(`data_type "${options.data_type}" is not known`);
        }
        this.id = options.id || '';
        this.domain = options.domain || '';
        this.server = options.server || '';
        this.group = options.group || '';
        this.tag_name = options.tag_name || '';
        this.labels = options.labels || [];
        this.data_type = options.data_type || '';
        this.description = options.description || '';
        this.text = options.text || [];
        this.creation_date = options.creation_date;
        this.last_modification_date = options.last_modification_date;
        this.last_polling_date = options.last_polling_date;
        this.update_rate = options.update_rate;
        this.min_numeric_value = options.min_numeric_value;
        this.max_numeric_value = options.max_numeric_value;
        this.last_numeric_value = options.last_numeric_value;
        this.last_quality = options.last_quality;
    }
}
