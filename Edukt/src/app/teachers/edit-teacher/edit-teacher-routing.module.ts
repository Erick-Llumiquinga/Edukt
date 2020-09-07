import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditTeacherComponent }  from './edit-teacher.component';

const routes: Routes = [
  { path: '', component: EditTeacherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditTeacherRoutingModule { }
