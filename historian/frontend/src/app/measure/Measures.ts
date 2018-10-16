// holds a double array of values for a Tag between start & stop
export interface IMeasures {
    end: number; // integer($int64)
    functions: IAgregation[]; // [...]
    name: string; // correspond to tag id which this measure correpond to
    num_chunks: number;	// integer($int64)
    num_points: number;	// integer($int32)
    quality: number;	// number($double)
    query_duration: number;	// integer($int64)
    start: number;	// integer($int64)
    timestamps: number[]; // [integer($int64)]
    values: number[];	// [number($double)]
    datasource_id: string;
    tag_id: string;
}

export interface IAgregation {
    name: string;
    value: number;
}

export interface IMeasuresOptions {
  end?: number; // integer($int64)
  functions?: IAgregation[]; // [...]
  name?: string; // correspond to tag id which this measure correpond to
  num_chunks?: number;	// integer($int64)
  num_points?: number;	// integer($int32)
  quality?: number;	// number($double)
  query_duration?: number;	// integer($int64)
  start?: number;	// integer($int64)
  timestamps?: number[]; // [integer($int64)]
  values?: number[];	// [number($double)]
  datasource_id?: string;
  tag_id?: string;
}

export class Measures implements IMeasures {
    end: number = null;
    functions: IAgregation[] = [];
    name: string = null;
    num_chunks: number = null;
    num_points: number = null;
    quality: number = null;
    query_duration: number = null;
    start: number = null;
    timestamps: number[] = [];
    values: number[] = [];
    datasource_id: string;
    tag_id: string;

    constructor(options: IMeasuresOptions = {
        end: null,
        functions: [],
        name: '',
        num_chunks: null,
        num_points: null,
        quality: null,
        query_duration: null,
        start: null,
        timestamps: [],
        values: [],
      }) {
        Object.assign(this, options);
    }

    public static getAgregations(m: Measures): Map<string, number> {
        const map: Map<string, number> = new Map();
        m.functions.forEach(f => map.set(f.name, f.value));
        return map;
    }
}
