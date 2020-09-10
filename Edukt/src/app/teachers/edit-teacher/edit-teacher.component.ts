import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataRx } from '../../models/data-rx';
import { Person } from '../../models/person';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {

  id: any;
  endPoint = 'profesor';
  teacherForm: FormGroup;
  dataTeacher;
  file: any;
  colorControl = new FormControl('primary');

  constructor(
    private formBuilder: FormBuilder,
    private services: DataService,
    private activeRouter : ActivatedRoute,
    private router: Router
  ) { this._form() }

  ngOnInit(): void {
    this.get();
  }

  _form = () => {
    this.teacherForm = this.formBuilder.group({
      colorControl: this.colorControl,
      id: ['',[Validators.required]],
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
      idProfesor: [0,[Validators.required]]
    })
  }

  get = () => 
  {
    this.activeRouter.params.subscribe(params => {
      this.id = params['id'];
      this.services.getSelc(this.endPoint,this.id)
      .subscribe(resp => {
        this.teacherForm.get('id').setValue(resp.data['personas'].id);
        this.teacherForm.get('correoInst').setValue(resp.data['correo']);
        this.teacherForm.get('nombre').setValue(resp.data['personas'].nombre);
        this.teacherForm.get('apellido').setValue(resp.data['personas'].apellido);
        this.teacherForm.get('identificacion').setValue(resp.data['personas'].identificacion);
        this.teacherForm.get('fechaNacimiento').setValue(resp.data['personas'].fechaNacimiento);
        this.teacherForm.get('direccion').setValue(resp.data['personas'].direccion);
        this.teacherForm.get('correo').setValue(resp.data['personas'].correo);
        this.teacherForm.get('telefono').setValue(resp.data['personas'].telefono);
        this.teacherForm.get('contactoEmergencia').setValue(resp.data['personas'].contactoEmergencia);
        this.teacherForm.get('idProfesor').setValue(resp.data['id']);
      },
        error => console.log(error)
      )
    })
  }

  update = () => {
    if(!this.teacherForm.invalid)
    {
      let data = new Person();
      data.id = this.teacherForm.get('id').value;
      data.nombre = this.teacherForm.get('nombre').value;
      data.apellido = this.teacherForm.get('apellido').value;
      data.identificacion = this.teacherForm.get('identificacion').value;
      data.fechaNacimiento = this.teacherForm.get('fechaNacimiento').value;
      data.direccion = this.teacherForm.get('direccion').value;
      data.correo = this.teacherForm.get('correo').value;
      data.correoInst = this.teacherForm.get('correoInst').value;
      data.telefono = this.teacherForm.get('telefono').value;
      data.contactoEmergencia = this.teacherForm.get('contactoEmergencia').value;
      data.img = this.teacherForm.get('img').value;
      data.idProfesor = this.teacherForm.get('idProfesor').value;


      this.services.putData(this.endPoint,data)
      .subscribe((resp: DataRx) => {
        if(resp.ok)
        {
          Swal.fire({
            icon: 'success',
            title: 'Actualizado con exito',
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
      this.update();
    }
  }

}
