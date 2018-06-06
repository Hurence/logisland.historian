export interface INodeTree {
    children?: INodeTree[];
    cache?: boolean;
    text?: string;
    state?: IState;
    icon?: string;
    [key: string]: any;
  }

export interface IState {
    opened?: boolean;
    checked?: boolean;
    selected?: boolean;
}

export class NodeTree implements INodeTree {

    constructor(options: INodeTree = {}) {
        Object.assign(this, options);
    }
}
