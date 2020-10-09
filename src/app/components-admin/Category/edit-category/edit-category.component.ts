import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import {CategoryService} from './../../../services/category.service';
import {Categorys} from './../../../models/categorys.model';
import { Subscription} from 'rxjs';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  public subscription : Subscription;
  public subscriptionParams : Subscription;
  public category: Categorys[]=[];
  public categorys : Categorys;

  constructor(public categoryService : CategoryService, 
              public routerService: Router,
              public activatedRouteService : ActivatedRoute) { }

  ngOnInit(): void {
  	//script menu slider
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

    this.categorys = new Categorys();
    this.loadData();
  }

  loadData(){
    this.subscriptionParams=this.activatedRouteService.params.subscribe((data: Params )=>{
         let id_categorys = data['id_categorys'];
         this.subscription = this.categoryService.getCategory(id_categorys).subscribe((category : Categorys) =>{
         this.categorys=category;
         });
    });
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
