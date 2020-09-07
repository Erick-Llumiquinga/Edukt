import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTeachersComponent }  from './list-teachers.component';

const routes: Routes = [
  { path: '', component: ListTeachersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTeachersRoutingModule { }
