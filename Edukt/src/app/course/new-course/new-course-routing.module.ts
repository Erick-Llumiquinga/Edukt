import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCourseComponent } from './new-course.component';

const router:Routes = [
  {path: '', component: NewCourseComponent}
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class NewCourseRoutingModule { }
