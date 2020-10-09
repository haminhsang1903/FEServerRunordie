import { Component, OnInit, OnDestroy  } from '@angular/core';
import * as $ from 'jquery';
import { ClassService } from './../../../services/class.service';
import { SemesterService } from './../../../services/semester.service';
import { SubjectService } from './../../../services/subject.service';
import { Subjects } from './../../../models/subjects.model';
import { Semester } from './../../../models/semester.model';
import { Class } from './../../../models/class.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit, OnDestroy {

  public subscription : Subscription;
  public subscriptionParams : Subscription;
  public subjects: Subjects[];
  public subject: Subjects;
  public semesters: Semester[];
  public semester: Semester;
  public clazzs: Class[]=[];
  public clazz: Class;

  constructor(public subjectService : SubjectService,
              public semesterservice : SemesterService,
              public clazzservice : ClassService, 
              public routerService: Router,
              public activatedRouteService : ActivatedRoute) { }

  ngOnInit(): void {
  	$(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $(this).toggleClass('active');
            });
        });

    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      } else {
      dropdownContent.style.display = "block";
      }
      });
    }

    this.clazz = new Class();
    
    //load combobox subjects form
    this.subscription=this.subjectService.getAllSubject().subscribe((data : Subjects[]) =>{
         this.subjects =data;
    });
    //load combobox semester form
    this.subscription=this.semesterservice.getAllSemester().subscribe((data : Semester[]) =>{
         this.semesters =data;
    });
    //load data form table class
    this.subscription=this.clazzservice.getAllClazz().subscribe((data : Class[]) =>{
         this.clazzs =data;
    });


  }

  // onAddClazz(){
    
  //   this.clazz.id_subjects=this.subjects
  //   this.clazz.id_semester=this.semesters

  //   this.subscription= this.clazzservice.addClazz(this.clazz).subscribe((data: Class) =>{
  //        //console.log(data.clazz.id);
  //        if(data && data.id_class){
  //          this.routerService.navigateByUrl('admin/manage-class');
  //          window.location.reload();
  //        }
  //        this.routerService.navigateByUrl('admin/manage-class');
  //        window.location.reload();
  //   });
  // }

  onAddClazzs(){

    this.clazz.id_semester=this.semesters
    this.clazz.id_subjects=this.subjects
    this.subscription= this.clazzservice.addClazz(this.clazz).subscribe((data: Class) =>{
         //console.log(data.clazz.id);
         if(data && data.id_class){
           this.routerService.navigateByUrl('admin/manage-class');
           window.location.reload();
         }
         this.routerService.navigateByUrl('admin/manage-class');
         window.location.reload();
    });
  }

  onDeleteClazzs(id_class: string){
    this.subscription=this.clazzservice.deleteClazz(id_class).subscribe((data : Class) =>{
         this.updataDataAfterDelete(id_class);
         //console.log(data);
    });
  }

  updataDataAfterDelete(id_class: string){
    for (var i = 0; i < this.clazzs.length; i++) {
      if(this.clazzs[i].id_class == id_class){
        this.clazzs.splice(i, 1);
        break;
            }
        }
    }

  onEditloadClass(clazz: Class, subject: Subjects, semester: Semester){
    this.clazz=clazz;
    this.subject=subject;
    this.semester=semester;
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }


}
