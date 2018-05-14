import { Datasource } from '../datasource/Datasource';

export class Dataset {

    constructor(
        public id: number,
        public name: string,
        public datasourceIds: string[],
    ) {
    }

    containDatasource(datasource: Datasource): boolean {
        return this.datasourceIds.includes(datasource.id);
    }

    addDatasource(datasource: Datasource) {
        this.datasourceIds.push(datasource.id);
    }

    removeDatasource(datasource: Datasource) {
        const index = this.datasourceIds.indexOf(datasource.id);
        console.log('index of element to remove is ' + index);
        if (index === -1) { return; }
        this.datasourceIds.splice(index, 1);
    }

    isEmpty(): boolean {
        return this.datasourceIds.length === 0;
    }
}
