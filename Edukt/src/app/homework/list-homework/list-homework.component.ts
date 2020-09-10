
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeworkService } from '../../services/homework.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { error } from '@angular/compiler/src/util';
import { Homework } from '../../models/homework';

@Component({
  selector: 'app-list-homework',
  templateUrl: './list-homework.component.html',
  styleUrls: ['./list-homework.component.scss']
})
export class ListHomeworkComponent implements OnInit {

  tareas = [];
  id: string;

  constructor(  private homework : HomeworkService,
                private router : Router
   ) { }

  ngOnInit(): void {

    this.homework.getTareas()
    .subscribe(
      (res: any) =>{
        console.log(res);
        this.tareas = res;

      },

      err => console.log(err)
    )

  }


  delete(id: string){
    this.homework.deleteTarea(id)
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

}
