import { Component } from '@angular/core';
import { UserService } from './services/user.service';

import { tap } from "rxjs/operators";
import { GraphQLService } from './services/graphql.service';
import { gql } from 'graphql-request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'graphql-rxjs-angular';

  query = gql`
    subscription newUserEvent {
      newUser {
        id
      }
    }
  `
  createUserEvent$ = this.graphQLService.subscription({ query: this.query })

  constructor(
    private userService: UserService,
    private graphQLService: GraphQLService
  ) { }

  getToken() {
    this.userService.getToken()
      .pipe(
        tap(data => {
          console.log(data)
          localStorage.setItem('token', data.login)
        })
      )
      .subscribe()
  }

  createUser() {
    this.userService.createUser()
      .pipe(
        tap(data => {
          console.log(data.createUser)
        })
      )
      .subscribe()
  }
}
