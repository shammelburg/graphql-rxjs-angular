import { Injectable } from '@angular/core';
import { gql } from 'graphql-request';
import { Observable } from 'rxjs';
import { GraphQLService } from './graphql.service';

export interface Login {
    login: string
}

export interface CreateUser {
    createUser: User
}

export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
}



@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(
        private gqlService: GraphQLService
    ) { }

    getToken(): Observable<Login> {
        const query = gql`
            query getToken {
                login(input: {email: "cmounce0@sfgate.com", password: "807-82-4757"})
            }
        `
        return this.gqlService.fetch(query)
    }

    createUser(): Observable<CreateUser> {
        const query = gql`
            mutation createUser {
                createUser(input: {firstName: "Sander", email: "my@email.com"}) {
                    firstName
                    email
                }
            }
        `
        return this.gqlService.fetch(query)
    }
}