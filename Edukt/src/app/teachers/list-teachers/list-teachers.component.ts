import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Person } from '../../models/person';
import { Teacher } from '../../models/teacher';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.scss']
})
export class ListTeachersComponent implements OnInit {

  endPoint = 'studen';
  teachers: Person[];
  displayedColumns: string[] = [
    'nombre', 
    'apellido', 
    'identificacion', 
    'fechaNacimiento', 
    'correo', 
    'telefono', 
    'contactoEmergencia'
  ];
  dataSource;
  

  constructor(private service:DataService, private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData = () => {
    this.service.getData(this.endPoint)
    .subscribe(resp => {
      this.teachers = resp.data
      this.dataSource = this.teachers
    })
  }

}
