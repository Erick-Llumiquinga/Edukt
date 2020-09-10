import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListHomeworkComponent } from './list-homework.component';

const routes: Routes = [
  { path: '', component: ListHomeworkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListHomeworkRoutingModule { }
