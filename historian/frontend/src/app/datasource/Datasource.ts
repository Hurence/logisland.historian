export class Datasource {

    public record_type = 'datasource';

    constructor(
        public id: string,
        public datasource_type: string, 
        public description?: string,
        public host?: string,
        public domain?: string,
        public user?: string,
        public password?: string,
        public clsid?: string,
        public progId?: string,
    ) {}

}
