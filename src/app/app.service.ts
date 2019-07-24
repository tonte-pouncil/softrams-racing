import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // If false, the application will run on 4200 and call json-server directly
  // If true, the application will utilize node API
  DEBUG: Boolean = true;
  api: string;
  username: string;

  constructor(private http: HttpClient) {
    if (this.DEBUG) {
      this.api = 'http://localhost:3000';
    } else {
      this.api = 'http://localhost:8000/api';
    }
  }

  // Returns all members
  getMembers() {
    return this.http.get(`${this.api}/members`).pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  getUsername(): string {
      return this.username;
  }

  addMember(member) {
      return this.http.post(`${this.api}/members`, member).pipe(catchError(this.handleError));
  }

  updateMember(member) {
    return this.http.put(`${this.api}/members/` + member.id, member).pipe(catchError(this.handleError));
  }

  getTeams() {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return [];
  }

  public getMember(memberId: string) {
    return this.http.get(`${this.api}/members/` + memberId).pipe(catchError(this.handleError));
  }

  public deleteMember(memberId: number) {
      return this.http.delete(`${this.api}/members/` + memberId).pipe(catchError(this.handleError));
  }
}
