import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class DataService {
    static itemQueries = require('graphql-tag/loader!./queries.graphql');

    constructor(private apollo: Apollo) {}

    getData(path: string): Observable<any> {
        return this.apollo
            .query<{ item }>({
                query: DataService.itemQueries['GetData'],
                fetchPolicy: 'no-cache',
                variables: {
                    path,
                },
            })
            .pipe(
                map((result) => {
                    return result;
                })
            );
    }
}
