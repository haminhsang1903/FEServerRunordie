import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { SubjectService } from './../../../services/subject.service';
import { Subjects } from './../../../models/subjects.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-manage-subject',
  templateUrl: './manage-subject.component.html',
  styleUrls: ['./manage-subject.component.css'] 
})
export class ManageSubjectComponent implements OnInit, OnDestroy {

  public subscription : Subscription;
  public subscriptionParams : Subscription;
  public subjects: Subjects[]=[];
  public subject: Subjects;

  constructor(public subjectService : SubjectService,
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

    this.subscription=this.subjectService.getAllSubject().subscribe((data : Subjects[]) =>{
         this.subjects =data;
    });

    this.subject = new Subjects();

  }


  onAddSubjects(){
    this.subscription= this.subjectService.addSubject(this.subject).subscribe((data: Subjects) =>{
         //console.log(data.clazz.id);
         if(data && data.id_subjects){
           this.routerService.navigateByUrl('admin/manage-subject');
           window.location.reload();
         }
         this.routerService.navigateByUrl('admin/manage-subject');
         window.location.reload();
    });
  }

  onEditloadSubject(subject: Subjects){
    this.subject=subject;
  }

  onDeleteSubject(id_subjects: string){
    this.subscription=this.subjectService.deleteSubject(id_subjects).subscribe((data : Subjects) =>{
         this.updataDataAfterDelete(id_subjects);
         //console.log(data);
    });
  }

  updataDataAfterDelete(id_subjects: string){
    for (var i = 0; i < this.subjects.length; i++) {
      if(this.subjects[i].id_subjects == id_subjects){
        this.subjects.splice(i, 1);
        break;

            }
        }
    }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
