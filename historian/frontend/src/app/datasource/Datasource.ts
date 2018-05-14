export class Datasource {

    private record_type = 'datasource';
    private type = 'OPC-DA';

    constructor(
        public id?: string,
        // public type?: string,
        public name?: string,
        public description?: string,
        public host?: string,
        public domain?: string,
        public user?: string,
        public password?: string,
        public clsid?: string,
    ) {
        this.type = 'OPC-DA';
     }

}
