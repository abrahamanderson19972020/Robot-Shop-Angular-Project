import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signin } from '../models/signin.model';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  baseUrl: string = 'http://localhost:8081/api/';

  getUser(): Observable<User | null> {
    return this.user.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  signinUser(userInfo: Signin): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + 'sign-in', userInfo).pipe(
      map((user: User) => {
        this.user.next(user);
        return user;
      })
    );
  }

  registerUser(userInfo: User) {
    this.httpClient.post(this.baseUrl + 'register', userInfo);
  }

  signOut() {
    this.user.next(null);
  }
}
