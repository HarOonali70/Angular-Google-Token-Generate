import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExternalAuthDto } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class TestService {
 
  constructor(private http: HttpClient) { }

  getdata(): Observable<string>{
    return this.http.get<string>("https://localhost:7121/api/Auth/Test");
  }
  // putData(data:test): Observable<test>{
  //   debugger;
  //   return this.http.post<test>("https://localhost:7018/api/User/Test2",  data);
  // }
  postGoolgle(data:ExternalAuthDto) : Observable<ExternalAuthDto>{
    debugger;
    return this.http.post<ExternalAuthDto>("https://localhost:7121/api/Auth/ExternalLogin", data);
  }
}
