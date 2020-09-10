import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Person } from '../../models/person';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})

export class ListStudentsComponent implements OnInit {

  endPoint = 'estudiantes';
  students: Person[] = [];
  dataSource;
  displayedColumns: string[] = [
    'nombre', 
    'apellido', 
    'identificacion', 
    'fechaNacimiento', 
    'correo', 
    'correoInst',
    'telefono', 
    'contactoEmergencia',
    'acciones'
  ];
  
  constructor(private service:DataService, private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData = () => {
    this.service.getData(this.endPoint)
    .subscribe(resp => {
      resp.data.forEach(element => {
        element.personas.correoInst = element.correo;
        element.personas.idEstudiante = element.id;
        this.students.push(element.personas)
      });
      this.dataSource = this.students
      console.log(this.dataSource)
    })
  }

  selectEst = (id) =>{
    this.router.navigate(['/estudiantes/perfil/editar', id]);
  }

}
