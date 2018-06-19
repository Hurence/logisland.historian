export interface IMeasuresRequest {
    itemId: string;
    /* date de début (borne inf) peut-être exprimée sous les formats suivants :
    timestamp : 4578965 date-time : 2015-11-25T12:06:57.330Z relatif : NOW-30DAYS */
    start?: string;
    /* date de fin (borne sup) peut-être exprimée sous les formats suivants :
    timestamp : 4578965 date-time : 2015-11-25T12:06:57.330Z relatif : NOW-30DAYS */
    end?: string;
    /* Multiple analyses, aggregations, and transformations are allowed per query.
    If so, Chronix will first execute the transformations in the order they occur.
    Then it executes the analyses and aggregations on the result of the chained transformations.
    For example the query: max;min;trend;movavg:10,minutes;scale:4 is executed as follows:
    Calculate the moving average Scale the result of the moving average by 4
    Calculate the max, min, and the trend based on the prior result.*/
    functions?: string;
    no_values?: boolean; // will retrieve only function values, no data points

    buildQuery(rootUrl: string): string;
}

export class MeasuresRequest implements IMeasuresRequest {
    itemId: string;
    start?: string;
    end?: string;
    functions?: string;
    no_values?: boolean;

    constructor(options: IMeasuresRequest) {
        Object.assign(this, options);
    }
    /**
     * return the correspondant query
     *
     * @param rootUrl root url with / at end
     */
    buildQuery(rootUrl: string): string {
        const query = `${rootUrl}tags/${this.itemId}/measures`;
        const parameters: string[] = [];
        for (const key in Object.keys(this)) {
            if (key !== 'itemId') {
                console.log('key is', key);
                parameters.push(`${key}=${this[key]}`);
            }
        }
        return query + parameters.join('&');
    }
}