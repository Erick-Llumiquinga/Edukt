import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TokenGuard } from './guards/token.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'inicio', canActivate: [ TokenGuard ], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'estudiantes/lista', canActivate: [ TokenGuard ], loadChildren: () => import('./students/list-students/list-students.module').then(m => m.ListStudentsModule)},
  { path: 'estudiantes/nuevo', canActivate: [ TokenGuard ], loadChildren: () => import('./students/new-student/new-student.module').then(m => m.NewStudentModule)},
  { path: 'estudiantes/perfil/estudiante', canActivate: [ TokenGuard ], loadChildren: () => import('./students/edit-student/edit-student.module').then(m => m.EditStudentModule)},
  { path: 'profesores/lista', canActivate: [ TokenGuard ], loadChildren: () => import('./teachers/list-teachers/list-teachers.module').then(m => m.ListTeachersModule)},
  { path: 'profesores/nuevo', canActivate: [ TokenGuard ], loadChildren: () => import('./teachers/new-teacher/new-teacher.module').then(m => m.NewTeacherModule)},
  { path: 'profesores/perfil/editar', canActivate: [ TokenGuard ], loadChildren: () => import('./teachers/edit-teacher/edit-teacher.module').then(m => m.EditTeacherModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
