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
      name: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      identification: ['',[Validators.required]],
      address: ['',[Validators.required]],
      email: ['',[Validators.required]],
      img: ['../../../assets/img/userIcon.png',[Validators.required]],
      idRole: [3, []],
    })
  }

  create = () => {
    if(!this.studentForm.invalid)
    {
      let data = new Person();
      data.nombre = this.studentForm.get('name').value;
      data.apellido = this.studentForm.get('lastname').value;
      data.identificacion = this.studentForm.get('identification').value;
      data.correo = this.studentForm.get('email').value;
      data.clave = this.studentForm.get('identification').value;
      data.img = this.studentForm.get('img').value;
      data.idRole = this.studentForm.get('idRole').value;

      
      this.studentForm.reset();
      this.services.postData('/person',data)
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
            return this.router.navigate(['/estudiates/lista'])
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
