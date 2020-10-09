import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { TeacherService } from './../../../services/teacher.service';
import { Lecturers } from './../../../models/lecturers.model';
import { Subscription} from 'rxjs';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-manage-teacher',
  templateUrl: './manage-teacher.component.html',
  styleUrls: ['./manage-teacher.component.css']
})
export class ManageTeacherComponent implements OnInit, OnDestroy  {

  public subscription : Subscription;
  public subscriptionParams : Subscription; 
  public lecturers: Lecturers[]=[];
  public lecturer : Lecturers;

  constructor(public teacherService : TeacherService, 
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

    // findAll Category
    this.subscription=this.teacherService.getAllLecturers().subscribe((data : Lecturers[]) =>{
         this.lecturers =data;
    });

    this.lecturer = new Lecturers();

  }

  onAddLecturers(){
    this.subscription= this.teacherService.addLecturers(this.lecturer).subscribe((data: Lecturers) =>{
         console.log(data.id_lecturers);
         if(data && data.id_lecturers){
           this.routerService.navigateByUrl('admin/manage-teacher');
           window.location.reload();
         }
         this.routerService.navigateByUrl('admin/manage-teacher');
         window.location.reload();
    });
  }

  onEditloadLecturers(lecturer: Lecturers){
    this.lecturer=lecturer;
  }

  onDeleteCategory(id_lecturers: string){
    this.subscription=this.teacherService.deleteLecturers(id_lecturers).subscribe((data : Lecturers) =>{
         this.updataDataAfterDelete(id_lecturers);
         //console.log(data);
    });
  }

  updataDataAfterDelete(id_lecturers: string){
    for (var i = 0; i < this.lecturers.length; i++) {
      if(this.lecturers[i].id_lecturers == id_lecturers){
        this.lecturers.splice(i, 1);
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
