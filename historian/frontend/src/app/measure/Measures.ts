// holds a double array of values for a Tag between start & stop
export interface IMeasures {
    end: number; // integer($int64)
    functions: IAgregation[];	//[...]
    name: string; // correspond to tag id which this measure correpond to
    num_chunks: number;	// integer($int64)
    num_points: number;	// integer($int32)
    quality: number;	// number($double)
    query_duration: number;	// integer($int64)
    start: number;	// integer($int64)
    timestamps: number[]; // [integer($int64)]
    values: number[];	// [number($double)]    
}

export interface IAgregation {
    name: string;
    value: number;
}

export class Measures implements IMeasures {
    end: number;
    functions: IAgregation[];
    name: string;
    num_chunks: number;
    num_points: number;
    quality: number;
    query_duration: number;
    start: number;
    timestamps: number[];
    values: number[];

    constructor(options: IMeasures = {
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
