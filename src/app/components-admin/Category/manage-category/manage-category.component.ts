import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { CategoryService } from './../../../services/category.service';
import { Categorys } from './../../../models/categorys.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css'],
})
export class ManageCategoryComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public category: Categorys[] = [];
  public categorys: Categorys;

  constructor(
    public categoryService: CategoryService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //script menu slider
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
      });
    });

    var dropdown = document.getElementsByClassName('dropdown-btn');
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener('click', function () {
        this.classList.toggle('active');
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        } else {
          dropdownContent.style.display = 'block';
        }
      });
    }

    // findAll Category
    this.subscription = this.categoryService
      .getAllCategory()
      .subscribe((data: Categorys[]) => {
        this.category = data;
      });

    this.categorys = new Categorys();
  }

  onAddCategory() {
    this.subscription = this.categoryService
      .addCategory(this.categorys)
      .subscribe((data: Categorys) => {
        //console.log(data.clazz.id);
        if (data && data.id_categorys) {
          this.routerService.navigateByUrl('admin/manage-category');
          window.location.reload();
        }
        this.routerService.navigateByUrl('admin/manage-category');
        window.location.reload();
      });
  }

  // loadData(){
  //   this.subscriptionParams=this.activatedRouteService.params.subscribe((data: Params )=>{
  //        let id_categorys = data['id_categorys'];
  //        this.subscription = this.categoryService.getCategory(id_categorys).subscribe((category : Categorys) =>{
  //        //this.categorys=category;
  //        console.log(category);
  //        });
  //   });
  // }

  onEditload(category: Categorys) {
    this.categorys = category;
  }

  // onEditStudent(){
  //   this.subscription = this.studentService.updateStudent(this.student).subscribe((data: Student) =>{
  //   this.routerService.navigateByUrl('student');
  //   //console.log(data);
  //   });

  // }

  onDeleteCategory(id_categorys: string) {
    this.subscription = this.categoryService
      .deleteCategory(id_categorys)
      .subscribe((data: Categorys) => {
        this.updataDataAfterDelete(id_categorys);
        //console.log(data);
      });
  }

  updataDataAfterDelete(id_categorys: string) {
    for (var i = 0; i < this.category.length; i++) {
      if (this.category[i].id_categorys == id_categorys) {
        this.category.splice(i, 1);
        break;
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
