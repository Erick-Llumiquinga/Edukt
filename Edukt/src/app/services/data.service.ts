import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpHeaders } from '@angular/common/http'; 
import { environment } from '../../environments/environment';
import { DataRx } from '../models/data-rx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = environment.url;

  constructor(private http:HttpClient) { }

  headers_object = new HttpHeaders().set("Authorization", sessionStorage.getItem('token'));

  httpOptions = {
    headers: this.headers_object
  };


  getData = (endPoint):Observable<DataRx> => {
    return this.http.get<DataRx>(`${this.url}/${endPoint}`, this.httpOptions);
  }

  getSelc = (endPoint, id):Observable<DataRx> =>{
    return this.http.get<DataRx>(`${this.url}/${endPoint}/${id}`);
  }

  postData = (endPoint, data):Observable<DataRx> => {
    return this.http.post<DataRx>(`${this.url}/${endPoint}`, data,this.httpOptions)
  }

  putData = (endPoint, data):Observable<DataRx> => {
    return this.http.patch<DataRx>(`${this.url}/${endPoint}`, data,this.httpOptions);
  }

  deleteData = (endPoint, id):Observable<DataRx> => {
    return this.http.delete<DataRx>(`${this.url}/${endPoint}/${id}`,this.httpOptions)
  }
}
