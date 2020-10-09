import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { MajorService } from './../../../services/major.service';
import { Major } from './../../../models/major.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage-major',
  templateUrl: './manage-major.component.html',
  styleUrls: ['./manage-major.component.css']
})
export class ManageMajorComponent implements OnInit, OnDestroy {

  public major: Major;
  public majors: Major[] = [];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;
  
  constructor(
    public routerService: Router,
    public majorService: MajorService,
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

    this.major = new Major();
    this.subscription = this.majorService.getAllMajor().subscribe(data => {
      this.majors = data;
      this.totalRecords = data.length;
    })
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

  onAddMajor(): void {
    this.subscription = this.majorService.addMajor(this.major).subscribe((data: Major) => {
      this.routerService.navigate(['admin/manage-major']);
      window.location.reload();
    })
  }

  onDeleteMajor(id_major: string) {
    this.subscription = this.majorService.deleteMajor(id_major).subscribe(data => {
        this.upDataAfterDelete(id_major);
    });
  }

  upDataAfterDelete(id_major: string) {
    let result = 0;
    for (var i = 0; i < this.majors.length; i++) {
        if (this.majors[i].id_major == id_major) {
            this.majors.splice(i, 1);
            break;
        }
    }
  }

  onEditMajor(major: Major){
    this.major = major;
  } 

}
