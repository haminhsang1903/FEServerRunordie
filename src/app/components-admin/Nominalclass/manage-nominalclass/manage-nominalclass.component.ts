import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { CourseService } from './../../../services/course.service';
import { Course } from './../../../models/course.model';
import { NominalClassService } from './../../../services/nominal-class.service';
import { NominalClass } from './../../../models/nomialclass.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage-nominalclass',
  templateUrl: './manage-nominalclass.component.html',
  styleUrls: ['./manage-nominalclass.component.css']
})
export class ManageNominalclassComponent implements OnInit, OnDestroy {

  public nominalClass: NominalClass;
  public course: Course;
  public nominalClasses: NominalClass[] = [];
  public courses: Course[];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;

  constructor(
    public routerService: Router,
    public courseService: CourseService,
    public nominalService: NominalClassService,
    public activatedRoute: ActivatedRoute
  ) { }

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
    this.nominalClass = new NominalClass();
    this.subscription = this.courseService.getAllCourse().subscribe(data => {
      this.courses = data;
    })
    this.subscription = this.nominalService.getAllNominalClass().subscribe(data => {
      this.nominalClasses = data;
      this.totalRecords = data.length;
    })
    this.nominalClass = new NominalClass();
    this.course = new Course();
  }

  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

  onAddNominalClass(): void {
    this.nominalClass.id_course = this.courses;
    this.subscription = this.nominalService.addNominalClass(this.nominalClass).subscribe((data: NominalClass) => {
      this.routerService.navigate(['admin/manage-nominalclass']);
      window.location.reload();
    }) 
  }

  onDeleteNominalClass(id_nominalclass: string) {
    this.subscription = this.nominalService.deleteNominalClass(id_nominalclass).subscribe(data => {
        this.upDataAfterDelete(id_nominalclass);
    });
  }

  upDataAfterDelete(id_nominalclass: string) {
    let result = 0;
    for (var i = 0; i < this.nominalClasses.length; i++) {
        if (this.nominalClasses[i].id_nominalclass == id_nominalclass) {
            this.nominalClasses.splice(i, 1);
            break;
        }
    }
  }

  onEditNominalClass(nominalClass: NominalClass){
    this.nominalClass = nominalClass;
  } 

}
