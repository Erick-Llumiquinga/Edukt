import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Paralelo } from '../models/paralelo';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url = 'http://localhost:3500/api/'

  constructor( private http : HttpClient ) { }

  crearCurso(data){
    return this.http.post(this.url + 'curso', data)
  }

  getCurso(): Observable<Object> {
    return this.http.get<Course[]>(this.url + 'cursos')
  }

  // getPar(): Observable<Object> {
  //   return this.http.get<Paralelo[]>(this.url + 'paralelos')
  // }

  delete(id: string){
    return this.http.delete(`${this.url}curso/${id}`)
  }

  // put(id: string, nombre_curso: string, nombre_paralelo: string){
  //   return this.http.patch(`${this.url}curso/${id}`, { nombre_curso,nombre_paralelo })
  // }

}
