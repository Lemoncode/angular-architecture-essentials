import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthContext } from '../model/auth-context';
import { formatError } from './utils';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  private authContext: AuthContext;

  login(): Promise<any> {
    return null;
  }

  logout(): Promise<any> {
    return null;
  }

  isLoggedIn(): boolean {
    return null;
  }

  getAccessToken(): string {
    return null;
  }

  signoutRedirectCallback(): Promise<any> {
    return null;
  }

  loadSecurityContext() {
    this.httpClient.get<AuthContext>(`url`).subscribe(context => {
      this.authContext = context;
    }, error => console.error(formatError(error)));
  }
}
