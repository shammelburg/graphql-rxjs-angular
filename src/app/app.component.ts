import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UserService } from './services/user.service';
import { map, tap } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'graphql-rxjs-angular';

  createUserEvent$ = this.userService.newUserEvent()
    .pipe(
      map(data => data.newUser),
      tap(newUser => {
        console.log(newUser)
        this.windowTitle.setTitle(newUser.id.toString())
      })
    )

  constructor(
    private userService: UserService,
    private windowTitle: Title
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
