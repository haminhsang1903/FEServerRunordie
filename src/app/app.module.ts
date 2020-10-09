import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
//components-admin
import { ManageCategoryComponent } from './components-admin/Category/manage-category/manage-category.component';
import { ManageClassComponent } from './components-admin/Class/manage-class/manage-class.component';
import { ManageMajorComponent } from './components-admin//Major/manage-major/manage-major.component';
import { ManagePostComponent } from './components-admin//Post/manage-post/manage-post.component';
import { ManageSemesterComponent } from './components-admin/Semester/manage-semester/manage-semester.component';
import { ManageStudentComponent } from './components-admin/Student/manage-student/manage-student.component';
import { ManageSubjectComponent } from './components-admin/Subject/manage-subject/manage-subject.component';
import { ManageRoomComponent } from './components-admin/Room/manage-room/manage-room.component';
import { ManageTeacherComponent } from './components-admin/Teacher/manage-teacher/manage-teacher.component';
import { ManageNominalclassComponent } from './components-admin/Nominalclass/manage-nominalclass/manage-nominalclass.component';
import { ManageCourseComponent } from './components-admin/Course/manage-course/manage-course.component';
//components-students
import { StudentAttendsComponent } from './components-students/student-attends/student-attends.component';
import { StudentHistoryComponent } from './components-students/student-history/student-history.component';
import { StudentIndexComponent } from './components-students/student-index/student-index.component';
import { StudentNewsComponent } from './components-students/student-news/student-news.component';
import { StudentScheduleComponent } from './components-students/student-schedule/student-schedule.component';
import { StudentScoreComponent } from './components-students/student-score/student-score.component';
import { StudentSemesterScoreComponent } from './components-students/student-semester-score/student-semester-score.component';
//components-teachers
import { TeacherDashbroadComponent } from './components-teachers/teacher-dashbroad/teacher-dashbroad.component';
import { TeacherMyclassComponent } from './components-teachers/teacher-myclass/teacher-myclass.component';
import { ImportScoreComponent } from './components-teachers/import-score/import-score.component';
import { ManagePointComponent } from './components-admin/Point/manage-point/manage-point.component';
import { TeacherAttendsComponent } from './components-teachers/teacher-attends/teacher-attends.component';

import { LoginComponent } from './components-login/login/login.component';

import { CategoryService } from './services/category.service';
import { PostService } from './services/post.service';
import { SubjectService } from './services/subject.service';
import { ClassService } from './services/class.service';
import { SemesterService } from './services/semester.service';
import { TeacherService } from './services/teacher.service';
import { StudentsService } from './services/students.service';
import { RoomsService } from './services/rooms.service';
import { NominalClassService } from './services/nominal-class.service';
import { MajorService } from './services/major.service';
import { CourseService } from './services/course.service';
import { LoginService } from './services/login.service';

import {CookieService} from 'ngx-cookie-service';





const appRoutes : Routes = [
      {
        path: '',
        component: StudentIndexComponent,
      },
      {
        path: 'admin/manage-student',
        component: ManageStudentComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'admin/manage-category',
        component: ManageCategoryComponent
      },

      {
        path: 'admin/manage-class',
        component: ManageClassComponent
      },
      {
        path: 'admin/manage-post',
        component: ManagePostComponent
      },
      {
        path: 'admin/manage-room',
        component: ManageRoomComponent
      },
      {
        path: 'admin/manage-semester',
        component: ManageSemesterComponent
      },
      {
        path: 'admin/manage-subject',
        component: ManageSubjectComponent
      },
      {
        path: 'admin/manage-teacher',
        component: ManageTeacherComponent
      },
      {
        path: 'admin/manage-major',
        component: ManageMajorComponent
      },
      {
        path: 'admin/manage-nominalclass',
        component: ManageNominalclassComponent
      },
      {
        path: 'admin/manage-course',
        component: ManageCourseComponent
      },


      {
        path: 'student/attends',
        component: StudentAttendsComponent
      },
      {
        path: 'student/history',
        component: StudentHistoryComponent
      },
      {
        path: 'student/news',
        component: StudentNewsComponent
      },
      {
        path: 'student/index',
        component: StudentIndexComponent
      },
      {
        path: 'student/schedule',
        component: StudentScheduleComponent
      },
      {
        path: 'student/score',
        component: StudentScoreComponent
      },
      {
        path: 'student/semester-score',
        component: StudentSemesterScoreComponent
      },


      {
        path: 'teacher/dashboard',
        component: TeacherDashbroadComponent
      },
      {
        path: 'teacher/myclass',
        component: TeacherMyclassComponent
      },
      {
        path: 'teacher/import-score',
        component: ImportScoreComponent
      },
      {
        path: 'teacher/teacher-attends',
        component: TeacherAttendsComponent
      }

];


@NgModule({
  declarations: [
    AppComponent,
    ManageCategoryComponent,
    ManageClassComponent,
    ManageMajorComponent,
    ManagePostComponent,
    ManageSemesterComponent,
    ManageStudentComponent,
    ManageSubjectComponent,
    ManageRoomComponent,
    ManageTeacherComponent,
    StudentAttendsComponent,
    StudentHistoryComponent,
    StudentIndexComponent,
    StudentNewsComponent,
    StudentScheduleComponent,
    StudentScoreComponent,
    StudentSemesterScoreComponent,
    TeacherDashbroadComponent,
    TeacherMyclassComponent,
    ImportScoreComponent,
    ManagePointComponent,
    TeacherAttendsComponent,
    ManageNominalclassComponent,
    ManageCourseComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [CategoryService,
              PostService,
              SubjectService,
              ClassService,
              SemesterService,
              TeacherService,
              StudentsService,
              RoomsService,
              NominalClassService,
              MajorService,
              CourseService,
              LoginService,
              CookieService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
