import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { DataRx } from '../../models/data-rx';
import { Person } from '../../models/person';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  endPoint = 'estudiante';
  studentForm: FormGroup;
  dataStudent;
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
    this.studentForm = this.formBuilder.group({
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
      codigoMatricula: ['',[Validators.required]],
      img: ['../../../assets/img/userIcon.png',[Validators.required]],
    })
  }

  create = () => {
    if(!this.studentForm.invalid)
    {
      let data = new Person();
      data.nombre = this.studentForm.get('nombre').value;
      data.apellido = this.studentForm.get('apellido').value;
      data.identificacion = this.studentForm.get('identificacion').value;
      data.fechaNacimiento = this.studentForm.get('fechaNacimiento').value;
      data.direccion = this.studentForm.get('direccion').value;
      data.correo = this.studentForm.get('correo').value;
      data.correoInst = this.studentForm.get('correoInst').value;
      data.clave = this.studentForm.get('identificacion').value;
      data.telefono = this.studentForm.get('telefono').value;
      data.contactoEmergencia = this.studentForm.get('contactoEmergencia').value;
      data.img = this.studentForm.get('img').value;
      data.idRole = 3;
      
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
            this.studentForm.reset();
            return this.router.navigate(['/estudiantes/lista'])
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
  }

  onFileChange = (event) => {
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if(file.type.includes("image")) {
        const reader = new FileReader()
        reader.readAsDataURL(file);

        reader.onload = function load() {
          this.studentForm.get('img').value = reader.result;
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
