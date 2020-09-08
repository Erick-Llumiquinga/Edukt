import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSubjectComponent } from './new-subject.component'; 

const routes: Routes = [
  {path: '', component: NewSubjectComponent}
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewSubjectRoutingModule { }
