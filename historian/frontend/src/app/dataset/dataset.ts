import { Datasource } from '../datasource/Datasource';
import { Tag } from '../tag/modele/tag';

export class Dataset {

    constructor(
        public id: number,
        public name: string,
        public datasourceIds: Set<string>,
        public tagIds: Set<string>,
    ) {
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

    containTag(tag: Tag): boolean {
        return this.tagIds.has(tag.id);
    }

    addTag(tag: Tag) {
        this.tagIds.add(tag.id);
    }

    removeTag(tag: Tag): boolean {
        return this.tagIds.delete(tag.id);
    }

    isEmpty(): boolean {
        return this.datasourceIds.size === 0;
    }

    hasNoTag(): boolean {
        return this.tagIds.size === 0;
    }
}
