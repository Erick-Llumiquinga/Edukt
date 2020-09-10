import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Homework } from '../models/homework';


@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  private url = 'http://localhost:3500/api'

  constructor( private http : HttpClient ) { }

  crearTarea(detalle: string, nota: string, horaEntrega: string, horaEntregada: string, file: File): Observable<Object> {
    const form = new FormData()
    form.append('detalle', detalle);
    form.append('nota', nota);
    form.append('horaEntrega', horaEntrega);
    form.append('horaEntregada', horaEntregada);
    form.append('file', file, 'form-data');

    return this.http.post<Object>(`${this.url}/tarea`, form)
  }

  getTareas(): Observable<Object> {
    return this.http.get<Homework[]>(this.url + '/tarea')
  }

  deleteTarea(id: string){
    return this.http.delete(`${this.url}/tarea/${id}`)
  }

}
