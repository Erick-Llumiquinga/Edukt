import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditClassComponent } from './edit-class.component';

const routes: Routes = [
  { path: '', component: EditClassComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditClassRoutingModule { }
