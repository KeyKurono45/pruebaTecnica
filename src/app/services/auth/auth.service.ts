import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:8000/auth';
  private keyToken;

  constructor(
    private http: HttpClient
  ) { 
    this.keyToken = '#FFFFFF';
  }


  getToken(){
    return localStorage.getItem(this.keyToken);
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.URL}/login`;
    return this.http.post<User>(url, {email, password});
  }

  loadUser(id: number): Observable<any> {
    console.log(id)
    const url = `${this.URL}/getUser`;
    return this.http.post<User>(url, {id});
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.URL}/register`;
    return this.http.post<User>(url, {email, password});
  }

  editUser(id: number, name: string, lastName: string , age: number): Observable<any> {
    const url = `${this.URL}/getUser`;
    return this.http.put<User>(url, {id, name, lastName, age});
  }
}
