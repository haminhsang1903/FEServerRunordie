import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public API: string = 'https://serverrunordie.herokuapp.com/api/auth/';

  constructor(public http: HttpClient) { }

  login(user: User): Observable<User> {
		return this.http.post<User>(this.API+'signin', user);
  }
}
