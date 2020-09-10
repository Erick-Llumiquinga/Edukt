import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListClassComponent }  from './list-class.component';

const routes: Routes = [
  { path: '', component: ListClassComponent}
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListClassRoutingModule { }
