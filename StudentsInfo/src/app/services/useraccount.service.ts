import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../viewmodels/User';

@Injectable({
  providedIn: 'root',
})
export class UseraccountService {
  public user: Observable<User>;

  constructor() {}

  public get userValue(): Observable<User> {
    let stringifieduser = localStorage.getItem('user');
    let parsedUser: User = stringifieduser ? JSON.parse(stringifieduser) : null;
    let userObj = new User();
    userObj.username = parsedUser?parsedUser.username:'';
    userObj.password = parsedUser?parsedUser.password:'';
    return of(userObj);
  }

  login(username: string, password: string): Observable<User> {
    let user = new User();
    user.username = username;
    user.password = password;
    localStorage.setItem('user', JSON.stringify(user));
    return of(user);
  }

  logout() {
    localStorage.removeItem('user');
    let user = new User();
    user.username = '';
    user.password = '';
    return of(true);
  }
}
