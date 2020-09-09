import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TokenGuard } from './guards/token.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatGridListModule } from '@angular/material/grid-list';

import { LoginComponent } from './login/login.component';
import { NewStudentComponent } from './students/new-student/new-student.component';
import { EditStudentComponent } from './students/edit-student/edit-student.component';
import { ListStudentsComponent } from './students/list-students/list-students.component';
import { NewTeacherComponent } from './teachers/new-teacher/new-teacher.component';
import { EditTeacherComponent } from './teachers/edit-teacher/edit-teacher.component';
import { ListTeachersComponent } from './teachers/list-teachers/list-teachers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ListCourseComponent } from './course/list-course/list-course.component';
import { NewCourseComponent } from './course/new-course/new-course.component';
import { EditCourseComponent } from './course/edit-course/edit-course.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewStudentComponent,
    EditStudentComponent,
    ListStudentsComponent,
    NewTeacherComponent,
    EditTeacherComponent,
    ListTeachersComponent,
    DashboardComponent,
    SideNavComponent,
    ListCourseComponent,
    NewCourseComponent,
    EditCourseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSelectModule,
    NgxMatFileInputModule,
    MatCarouselModule.forRoot(),
    MatGridListModule,


    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
  ],
  providers: [TokenGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

