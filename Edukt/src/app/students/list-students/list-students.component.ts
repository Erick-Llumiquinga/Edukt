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

  endPoint = 'persons';
  students: Person[];
  displayedColumns: string[] = ['name', 'lastname', 'identification', 'email'];
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
