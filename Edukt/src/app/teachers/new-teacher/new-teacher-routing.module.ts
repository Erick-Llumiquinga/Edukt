import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTeacherComponent }  from './new-teacher.component';

const routes: Routes = [
  { path: '', component: NewTeacherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewTeacherRoutingModule { }
