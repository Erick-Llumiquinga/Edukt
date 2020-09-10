import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewHomeworkComponent } from './new-homework.component';

const routes: Routes = [
  { path: '', component: NewHomeworkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewHomeworkRoutingModule { }
