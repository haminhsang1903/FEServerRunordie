import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { CourseService } from './../../../services/course.service';
import { Course } from './../../../models/course.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit, OnDestroy {

  public course: Course;
  public courses: Course[] = [];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;
  
  constructor(
    public routerService: Router,
    public courseService: CourseService,
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

    this.course = new Course();
    this.subscription = this.courseService.getAllCourse().subscribe(data => {
      this.courses = data;
      this.totalRecords = data.length;
    })
    this.course = new Course();
    // this.loadData();
  }

  // loadData(): void {
  //   this.subscriptionParams = this.activatedRoute.params.subscribe((data: Params) => {
  //     let id_course = data['id_course'];
  //     this.subscription = this.courseService.editCourse(id_course).subscribe((course: Course) => {
  //       this.course = this.course;
  //     });
  //   });
  // }
  
  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

  onAddCourse(): void {
    this.subscription = this.courseService.addCourse(this.course).subscribe((data: Course) => {
      this.routerService.navigate(['admin/manage-course']);
      window.location.reload();
    })
  }

  onDeleteCourse(id_course: string) {
    this.subscription = this.courseService.deleteCourse(id_course).subscribe(data => {
        this.upDataAfterDelete(id_course);
    });
  }

  upDataAfterDelete(id_course: string) {
    let result = 0;
    for (var i = 0; i < this.courses.length; i++) {
        if (this.courses[i].id_course == id_course) {
            this.courses.splice(i, 1);
            break;
        }
    }
  }

  onEditCourse(course: Course){
    this.course = course;
  } 

}
