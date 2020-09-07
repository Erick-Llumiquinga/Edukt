import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../environments/environment';
import { DataRx } from '../models/data-rx';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = environment.url;

  constructor(private http:HttpClient) {}

  login = (data): Observable<DataRx> => {
    return this.http.post<DataRx>(`${this.url}/loginP`, data);
  }
}
