import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCourseComponent } from './edit-course.component';

const router: Routes = [
  { path: '', component: EditCourseComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class EditCourseRoutingModule { }
