import { Injectable } from '@angular/core';
import { GraphQLClient } from 'graphql-request'
import { createClient } from 'graphql-ws';
import { from, Observable } from 'rxjs';

const client = createClient({
    url: 'ws://localhost:4000/subscriptions',
});


@Injectable({ providedIn: 'root' })
export class GraphQLService {

    private graphQLHttpEndpoint = 'http://localhost:4000/graphql'

    private graphQLClient = new GraphQLClient(this.graphQLHttpEndpoint, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    constructor() { }

    fetch(document: string, variables?): Observable<any> {
        return from(this.graphQLClient.request(document, variables))
    }

    subscription(operation) {
        return new Observable((observer) =>
            client.subscribe(operation, {
                next: (data) => observer.next(data),
                error: (err) => observer.error(err),
                complete: () => observer.complete(),
            }),
        );
    }

}