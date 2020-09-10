import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSubjectComponent } from './edit-subject.component'; 

const routes: Routes = [
  {path: '', component: EditSubjectComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSubjectRoutingModule { }
