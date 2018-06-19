import { Datasource } from '../modules/datasource/Datasource';

export class Dataset {

    constructor(
        public id: number,
        public name: string,
        private datasourceIds: Set<string>,
        private tagIds: Set<string>,
    ) {}

    getTagIds(): Set<string> {
        return this.tagIds;
    }

    getDatasourceIds(): Set<string> {
        return this.datasourceIds;
    }

    containDatasource(datasource: Datasource): boolean {
        return this.datasourceIds.has(datasource.id);
    }

    addDatasource(datasource: Datasource): void {
        this.datasourceIds.add(datasource.id);
    }

    removeDatasource(datasource: Datasource): boolean {
        return this.datasourceIds.delete(datasource.id);
    }

    isEmpty(): boolean {
        return this.datasourceIds.size === 0;
    }

    replaceTags(ids: string[]): void {
        this.tagIds = new Set(ids);
    }

    containTag(id: string): boolean {
        return this.tagIds.has(id);
    }

    addTag(id: string) {
        this.tagIds.add(id);
    }

    removeTag(id: string): boolean {
        return this.tagIds.delete(id);
    }

    hasNoTag(): boolean {
        return this.tagIds.size === 0;
    }
}
