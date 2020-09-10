import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { DataRx } from '../../models/data-rx';
import { Subject } from '../../models/subject';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.scss']
})
export class NewSubjectComponent implements OnInit {

  subjectForm: FormGroup;
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
    this.subjectForm = this.formBuilder.group({
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
    if(!this.subjectForm.invalid)
    {
      let data = new Subject();
      data.nombre = this.subjectForm.get('name').value;
      data.idCurso = this.subjectForm.get('lastname').value;
      data.idProfersor = this.subjectForm.get('identification').value;
      
  
      this.services.postData('/person',data)
      .subscribe((resp: DataRx) => {
        if(resp.ok)
        {
          Swal.fire({
            icon: 'success',
            title: 'Creada con exito',
            showConfirmButton: false,
            timer: 1500,
          })
          .then(() => {
            this.subjectForm.reset();
            return this.router.navigate(['/materias/lista'])
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
