import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {

  cursoss = [];
  id: string;


  constructor(

      private router : Router,
      private course : CourseService

   ) { }

  ngOnInit(): void {

    this.course.getCurso()
    .subscribe(
      (res: any) => {
        //  console.log(res[0].paralelos[0].nombre_paralelo);
        console.log(res);
        this.cursoss = res;
      }
    )

  }

  nombre_curso : any;
  nombre_paralelo : any;

  crear(){
    let data = {
      "nombre_curso": this.nombre_curso,
      "nombre_paralelo": this.nombre_paralelo
    }
    this.course.crearCurso(data).subscribe(
      response => {
        console.log('Curso creado con Exito');
        alert('Curso creado con exito');
        location.reload();
      }
    ), error => {
      console.log(error);
      alert('No se pudo crear el curso');
    }
  }



  delete(id: string){
    this.course.delete(id)
    .subscribe(
      res => {
        console.log(res),
        alert('Eliminado con exito');
        location.reload();
      },
      error => {
        console.log(error);
      alert('No se pudo eliminar el curso');
      }
    )
  }


  // put(nombre_curso: HTMLInputElement, nombre_paralelo: HTMLInputElement ) {
  //   console.log(nombre_curso, nombre_paralelo);
  //   this.course.put(this.id, nombre_curso.value, nombre_paralelo.value)
  //   .subscribe (
  //     res => {
  //       console.log(res),
  //       alert('Actualizado con exito');
  //       location.reload();
  //     },
  //     error => {
  //       console.log(error);
  //     alert('No se pudo actualizar el curso');
  //     }
  //   )

  // }


}
