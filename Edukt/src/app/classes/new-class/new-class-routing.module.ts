import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewClassComponent }  from './new-class.component';

const routes: Routes = [
  { path: '', component: NewClassComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewClassRoutingModule { }
