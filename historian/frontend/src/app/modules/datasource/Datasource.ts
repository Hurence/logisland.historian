export enum TagBrowsingMode {
    AUTOMATIC = 'automatic',
    MANUAL = 'manual',
}
export class IDatasource {
    public id: string;
    public datasource_type: string;
    public description?: string;
    public host?: string;
    public domain?: string;
    public user?: string;
    public password?: string;
    public clsid?: string;
    public progId?: string;
    public tagBrowsing?: TagBrowsingMode;
}
export class Datasource implements IDatasource {

    public id: string;
    public datasource_type: string;
    public tagBrowsing: TagBrowsingMode = TagBrowsingMode.AUTOMATIC;
    public description?: string;
    public host?: string;
    public domain?: string;
    public user?: string;
    public password?: string;
    public clsid?: string;
    public progId?: string;

    public record_type = 'datasource';

    constructor(options: IDatasource) {
        Object.assign(this, options);
    }

}
