import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Test1Service {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('../assets/test.json');
  }
  getResponse() {
    return ("hello");
  }
}
