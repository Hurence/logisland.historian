import { Tag, ITag } from './tag';

export interface IOpcTag extends ITag { }

export class OpcTag extends Tag implements IOpcTag {
    constructor(options: IOpcTag) {        
        super(options);
    }
}
