import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSubjectComponent }  from './list-subject.component';

const routes: Routes = [
  { path: '', component: ListSubjectComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSubjectRoutingModule { }
