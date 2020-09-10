import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataRx } from '../../models/data-rx';
import { Person } from '../../models/person';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  id: any;
  endPoint = 'estudiante';
  studentForm: FormGroup;
  dataS;
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
      img: ['../../../assets/img/userIcon.png',[Validators.required]],
      idEstudiante: [0,[Validators.required]]
    })
  }

  get = () => 
  {
    this.activeRouter.params.subscribe(params => {
      this.id = params['id'];
      this.services.getSelc(this.endPoint,this.id)
      .subscribe(resp => {
        this.studentForm.get('correoInst').setValue(resp.data['correo']);
        this.studentForm.get('nombre').setValue(resp.data['personas'].nombre);
        this.studentForm.get('apellido').setValue(resp.data['personas'].apellido);
        this.studentForm.get('identificacion').setValue(resp.data['personas'].identificacion);
        this.studentForm.get('fechaNacimiento').setValue(resp.data['personas'].fechaNacimiento);
        this.studentForm.get('direccion').setValue(resp.data['personas'].direccion);
        this.studentForm.get('correo').setValue(resp.data['personas'].correo);
        this.studentForm.get('telefono').setValue(resp.data['personas'].telefono);
        this.studentForm.get('contactoEmergencia').setValue(resp.data['personas'].contactoEmergencia);
        this.studentForm.get('idEstudiante').setValue(resp.data['id']);
      },
        error => console.log(error)
      )
    })
  }

  update = () => {
    if(!this.studentForm.invalid)
    {
      let data = new Person();
      data.id = this.id;
      data.nombre = this.studentForm.get('nombre').value;
      data.apellido = this.studentForm.get('apellido').value;
      data.identificacion = this.studentForm.get('identificacion').value;
      data.fechaNacimiento = this.studentForm.get('fechaNacimiento').value;
      data.direccion = this.studentForm.get('direccion').value;
      data.correo = this.studentForm.get('correo').value;
      data.correoInst = this.studentForm.get('correoInst').value;
      data.telefono = this.studentForm.get('telefono').value;
      data.contactoEmergencia = this.studentForm.get('contactoEmergencia').value;
      data.img = this.studentForm.get('img').value;
      data.idEstudiante = this.studentForm.get('idEstudiante').value;


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
