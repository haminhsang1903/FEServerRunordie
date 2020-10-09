import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { SemesterService } from './../../../services/semester.service';
import { Semester } from './../../../models/semester.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage-semester',
  templateUrl: './manage-semester.component.html',
  styleUrls: ['./manage-semester.component.css']
})
export class ManageSemesterComponent implements OnInit, OnDestroy {

  public semester: Semester;
  public semesters: Semester[] = [];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;
  
  constructor(
    public routerService: Router,
    public semesterService: SemesterService,
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

    this.semester = new Semester();
    this.subscription = this.semesterService.getAllSemester().subscribe(data => {
      this.semesters = data;
      this.totalRecords = data.length;
    })
    this.semester = new Semester();
    // this.loadData();
  }

  // loadData(): void {
  //   this.subscriptionParams = this.activatedRoute.params.subscribe((data: Params) => {
  //     let id_semester = data['id_semester'];
  //     this.subscription = this.semesterService.editSemester(id_semester).subscribe((semester: Semester) => {
  //       this.semester = this.semester;
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

  onAddSemester(): void {
    this.subscription = this.semesterService.addSemester(this.semester).subscribe((data: Semester) => {
      this.routerService.navigate(['admin/manage-semester']);
      window.location.reload();
    })
  }

  onDeleteSemester(id_semester: string) {
    this.subscription = this.semesterService.deleteSemester(id_semester).subscribe(data => {
        this.upDataAfterDelete(id_semester);
    });
  }

  upDataAfterDelete(id_semester: string) {
    let result = 0;
    for (var i = 0; i < this.semesters.length; i++) {
        if (this.semesters[i].id_semester == id_semester) {
            this.semesters.splice(i, 1);
            break;
        }
    }
  }

  onEditSemester(semester: Semester){
    this.semester = semester;
  } 
  }

