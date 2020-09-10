
import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeworkService } from '../../services/homework.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-new-homework',
  templateUrl: './new-homework.component.html',
  styleUrls: ['./new-homework.component.scss']
})
export class NewHomeworkComponent implements OnInit {

  imageForm : FormGroup;
  image: any = "../../assets/fondo.jpg";
  file: any;

  constructor( private tarea : HomeworkService,
               private router : Router
    ) {  }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      detalle: new FormControl(null, Validators.required),
      nota: new FormControl(null, Validators.required),
      horaEntrega: new FormControl(null, Validators.required),
      horaEntregada: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required)
    })
  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if(file.type.includes("image")) {
        const reader = new FileReader()
        reader.readAsDataURL(file);

        reader.onload = function load() {
          this.image = reader.result;
        }.bind(this);
        this.file = file;
      }else {
        console.log("error");
      }
    }
  }

  onSubmit(){
    const form = this.imageForm;
    if(form.valid) {
      this.tarea.crearTarea(form.value.detalle, form.value.nota, form.value.horaEntrega, form.value.horaEntregada, this.file )
      .subscribe(data => {
        this.imageForm = new FormGroup({
          detalle: new FormControl(null),
          nota: new FormControl(null),
          horaEntrega: new FormControl(null),
          horaEntregada: new FormControl(null),
          file: new FormControl(null)

        })
        this.image = "../../assets/fondo.jpg";
        this.router.navigate(['/new-homework']);
      })
    }
  }


}
