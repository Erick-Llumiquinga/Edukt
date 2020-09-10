import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TokenGuard } from './guards/token.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'inicio', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},

  { path: 'estudiantes/lista', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./students/list-students/list-students.module').then(m => m.ListStudentsModule)},
  { path: 'estudiantes/nuevo', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./students/new-student/new-student.module').then(m => m.NewStudentModule)},
  { path: 'estudiantes/perfil/editar/:id', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./students/edit-student/edit-student.module').then(m => m.EditStudentModule)},

  { path: 'profesores/lista', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./teachers/list-teachers/list-teachers.module').then(m => m.ListTeachersModule)},
  { path: 'profesores/nuevo', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./teachers/new-teacher/new-teacher.module').then(m => m.NewTeacherModule)},
  { path: 'profesores/perfil/editar/:id', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./teachers/edit-teacher/edit-teacher.module').then(m => m.EditTeacherModule)},
  
  
  { path: 'cursos/lista', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./course/list-course/list-course.module').then(m => m.ListCourseModule) },

  { path: 'materias/lista', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./subjects/list-subject/list-subject.module').then(m => m.ListSubjectModule)},
  { path: 'masterias/nuevo', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./subjects/new-subject/new-subject.module').then(m => m.NewSubjectModule)},
  { path: 'materias/editar/:id', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./subjects/edit-subject/edit-subject.module').then(m => m.EditSubjectModule)},

  { path: 'clases/lista', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./classes/list-class/list-class.module').then(m => m.ListClassModule)},
  { path: 'clases/nuevo', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./classes/new-class/new-class.module').then(m => m.NewClassModule)},
  { path: 'clases/editar/:id', /*canActivate: [ TokenGuard ],*/ loadChildren: () => import('./classes/edit-class/edit-class.module').then(m => m.EditClassModule)}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
