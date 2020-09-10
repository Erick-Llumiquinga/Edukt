import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { DataRx } from '../../models/data-rx';
import { Class } from '../../models/class';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {

  endPoint = 'curso';
  courseForm: FormGroup;
  dataTeacher;
  file: any;
  colorControl = new FormControl('primary');

  constructor(
    private formBuilder: FormBuilder,
    private services: DataService,
    private router: Router
  ) { this._form() }

  ngOnInit(): void {
  }

  _form = () => {
    this.courseForm = this.formBuilder.group({
      colorControl: this.colorControl,
      nombre: ['',[Validators.required]],
      detalles: ['',[Validators.required]],
      paralelo: ['',[Validators.required]],
      img: ['../../../assets/img/cursos.png',[Validators.required]],
    })
  }

  create = () => {
    if(!this.courseForm.invalid)
    {
      let data = new Class();
      data.nombre = this.courseForm.get('nombre').value;
      data.detalles = this.courseForm.get('detalles').value;
      data.paralelo = this.courseForm.get('paralelo').value;

      this.services.postData(this.endPoint,data)
      .subscribe((resp: DataRx) => {
        if(resp.ok)
        {
          Swal.fire({
            icon: 'success',
            title: 'Creado con exito',
            showConfirmButton: false,
            timer: 1500,
          })
          .then(() => {
            return this.router.navigate(['/cursos/lista'])
          })
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: error.error.msg,
          showConfirmButton: false,
          timer: 1500,
        })
        return console.log(error)
      });
    }
    else {
      console.log('no valida')
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.code === 'Enter') {
      event.preventDefault();
      this.create();
    }
  }

}
