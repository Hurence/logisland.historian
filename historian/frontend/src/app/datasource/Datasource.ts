export class Datasource {

    constructor(
        public id: string,
        public type: string,
        public name: string,
        public description: string,
        public host: string,
        public domain: string,
        public user: string,
        public password: string,
    ) {  }
}
