import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Class } from '../../models/class';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {

  endPoint = 'cursos';
  course: Class[] = [];
  displayedColumns: string[] = [
    'nombre', 
    'detalles', 
    'acciones'
  ];
  dataSource;

  constructor(private service:DataService, private router:Router) { }

  ngOnInit(): void {
   this.getData();
  }

  getData = () => {
    this.service.getData(this.endPoint)
    .subscribe(resp => {
      this.course = resp.data,
      this.dataSource = this.course
    })
  }

  selectEst = (id) =>{
    this.router.navigate(['/estudiantes/perfil/editar', id]);
  }

}
