export enum TagBrowsingMode {
    AUTOMATIC = 'automatic',
    MANUAL = 'manual',
}
export enum DatasourceType {
    OPC_DA = 'OPC-DA',
    OPC_UA = 'OPC-UA',
    UNKNOWN = '',
}
export class IDatasource {
    public id: string;
    public datasource_type: DatasourceType;
    public description?: string;
    public host?: string;
    public domain?: string;
    public user?: string;
    public password?: string;
    public clsid?: string;
    public prog_id?: string;
    public tag_browsing?: TagBrowsingMode;
}
export class Datasource implements IDatasource {

    public id: string;
    public datasource_type: DatasourceType = DatasourceType.OPC_UA;
    public tag_browsing: TagBrowsingMode = TagBrowsingMode.AUTOMATIC;
    public description?: string;
    public host?: string;
    public domain?: string;
    public user?: string;
    public password?: string;
    public clsid?: string;
    public prog_id?: string;

    public record_type = 'datasource';

    constructor(options: IDatasource) {
        Object.assign(this, options);
    }

    isManual(): boolean {
        return this.tag_browsing === TagBrowsingMode.MANUAL;
    }
}
