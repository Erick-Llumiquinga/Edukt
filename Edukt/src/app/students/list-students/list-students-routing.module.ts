import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStudentsComponent }  from './list-students.component';

const routes: Routes = [
  { path: '', component: ListStudentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListStudentsRoutingModule { }
