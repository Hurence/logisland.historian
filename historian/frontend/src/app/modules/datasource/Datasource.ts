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
}
export class Datasource implements IDatasource {

    public id: string;
    public datasource_type: string;
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
