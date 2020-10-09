import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { StudentsService } from './../../../services/students.service';
import { Students } from './../../../models/students.model';
import { MajorService } from './../../../services/major.service';
import { Major } from './../../../models/major.model';
import { NominalClassService } from './../../../services/nominal-class.service';
import { NominalClass } from './../../../models/nomialclass.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent implements OnInit, OnDestroy {

  public student: Students;
  public major: Major;
  public nominalClass: NominalClass;
  public students: Students[];
  public majors: Major[] = [];
  public nominalClasses: NominalClass[] = [];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;

  constructor(
    public routerService: Router,
    public studentService: StudentsService,
    public majorService: MajorService,
    public nominalClassService: NominalClassService,
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

    this.student = new Students();
    this.subscription = this.majorService.getAllMajor().subscribe(data => {
      this.majors = data;
    })
    this.subscription = this.nominalClassService.getAllNominalClass().subscribe(data => {
      this.nominalClasses = data;
    })
    this.subscription = this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
      this.totalRecords = data.length;
    })
    this.student = new Students();
    this.nominalClass = new NominalClass();
    this.major = new Major();
  }

  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

  onAddStudent(): void {
    this.student.id_nominalclass = this.nominalClasses;
    this.student.id_major = this.majors;
    this.subscription = this.studentService.addStudents(this.student).subscribe((data: Students) => {
      this.routerService.navigate(['admin/manage-student']);
      window.location.reload();
    }) 
  }

  onDeleteStudent(id_students: string) {
    this.subscription = this.studentService.deleteStudents(id_students).subscribe(data => {
        this.upDataAfterDelete(id_students);
    });
  }

  upDataAfterDelete(id_students: string) {
    let result = 0;
    for (var i = 0; i < this.students.length; i++) {
        if (this.students[i].id_students == id_students) {
            this.students.splice(i, 1);
            break;
        }
    }
  }

  onEditStudent(student: Students){
    this.student = student;
  } 

}
