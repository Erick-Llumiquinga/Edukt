import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subject } from '../../models/subject';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-subject',
  templateUrl: './list-subject.component.html',
  styleUrls: ['./list-subject.component.scss']
})
export class ListSubjectComponent implements OnInit {

  endPoint = 'subjects';
  students: Subject[];
  displayedColumns: string[] = ['nombre', 'idProfesor', 'idCurso'];
  dataSource;

  constructor(private service:DataService, private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData = () => {
    this.service.getData(this.endPoint)
    .subscribe(resp => {
      this.students = resp.data
      this.dataSource = this.students
    })
  }

}
