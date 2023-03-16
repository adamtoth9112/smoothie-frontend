import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  username: string;
  userId: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User | null>(null);

  login(username: string, password: string) {
    return this.http
      .get<AuthResponseData>(`http://localhost:8080/api/v1/auth`, {
        headers: {
          authorization: this.createBasicAuthToken(username, password),
        },
      })
      .pipe(
        map((res) => {
          this.handleAuthentication(res.username, res.userId, res.token);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/smoothies']);
    localStorage.removeItem('userData');
  }

  handleAuthentication(username: string, userId: string, token: string) {
    const expirationDate = new Date(new Date().getTime() + 10 * 1000);
    const user = new User(username, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }
}
