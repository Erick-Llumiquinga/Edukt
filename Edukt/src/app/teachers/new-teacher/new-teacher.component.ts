import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { DataRx } from '../../models/data-rx';
import { Person } from '../../models/person';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-teacher',
  templateUrl: './new-teacher.component.html',
  styleUrls: ['./new-teacher.component.scss']
})
export class NewTeacherComponent implements OnInit {

  endPoint = 'profesor';
  teacherForm: FormGroup;
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
    this.teacherForm = this.formBuilder.group({
      colorControl: this.colorControl,
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      identificacion: ['',[Validators.required]],
      fechaNacimiento: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      correo: ['',[Validators.required]],
      correoInst: ['', [Validators.required]],
      telefono: ['',[Validators.required]],
      contactoEmergencia: ['',[Validators.required]],
      img: ['../../../assets/img/userIcon.png',[Validators.required]],
    })
  }

  create = () => {
    if(!this.teacherForm.invalid)
    {
      let data = new Person();
      data.nombre = this.teacherForm.get('nombre').value;
      data.apellido = this.teacherForm.get('apellido').value;
      data.identificacion = this.teacherForm.get('identificacion').value;
      data.fechaNacimiento = this.teacherForm.get('fechaNacimiento').value;
      data.direccion = this.teacherForm.get('direccion').value;
      data.correo = this.teacherForm.get('correo').value;
      data.correoInst = this.teacherForm.get('correoInst').value;
      data.clave = this.teacherForm.get('identificacion').value;
      data.telefono = this.teacherForm.get('telefono').value;
      data.contactoEmergencia = this.teacherForm.get('contactoEmergencia').value;
      data.img = this.teacherForm.get('img').value;
      data.idRole = 2;

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
            return this.router.navigate(['/profesores/lista'])
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

  onFileChange = (event) => {
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if(file.type.includes("image")) {
        const reader = new FileReader()
        reader.readAsDataURL(file);

        reader.onload = function load() {
          this.teacherForm.get('img').value = reader.result;
        }.bind(this);
        this.file = file;
      }else {
        console.log("error");
      }
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
