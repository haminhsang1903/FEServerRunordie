import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import * as jquery from 'jquery';
import { CategoryService } from './../../../services/category.service';
import { PostService } from './../../../services/post.service';
import { Categorys } from './../../../models/categorys.model';
import { Posts } from './../../../models/posts.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.css'],
})
export class ManagePostComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public subscriptionParams: Subscription;
  public categorys: Categorys[];
  public category: string;
  public post: Posts[] = [];
  public posts: Posts;
  public Selectcategorys: string;
  constructor(
    public categoryService: CategoryService,
    public postservice: PostService,
    public routerService: Router,
    public activatedRouteService: ActivatedRoute,
    private api: PostService
  ) {}

  ngOnInit(): void {
    /*$('#renderbutton').on('click', function (){
      $('#myTab a[href="#home"]').tab('show');

    });*/

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
    /////

    this.posts = new Posts();
    // this.category = new Categorys();

    //load combobox category form
    this.subscription = this.categoryService
      .getAllCategory()
      .subscribe((data: Categorys[]) => {
        this.categorys = data;
      });
    //load data post to table
    this.subscription = this.postservice
      .getAllPost()
      .subscribe((data: Posts[]) => {
        this.post = data;
      });
  }

  //  loadData(id_post: string){
  //   this.subscriptionParams=this.activatedRouteService.params.subscribe((data: Params )=>{
  //        let id_post = data['id_post'];
  //        this.subscription = this.postservice.getPost(id_post).subscribe((post : Posts) =>{
  //        //this.categorys=category;
  //        console.log(post);
  //        });
  //   });
  // }
  // Catch ngChangeModel
  onChange(valueCate){
    this.category = valueCate;
  }

  onAddPosts() {
    // Call API in POST Service and get data
    this.api.getOne(this.category).subscribe(res => {
      // handle response});
      this.posts.id_categorys = res;
    });
    // console.log("API");
    // console.log(this.posts.id_categorys);
    this.subscription = this.postservice
      .addPost(this.posts)
      .subscribe((data: Posts) => {
        //console.log(data.clazz.id);
        if (data && data.id_post) {
          this.routerService.navigateByUrl('admin/manage-post');
          // window.location.reload();
        }
        this.routerService.navigateByUrl('admin/manage-post');
        // window.location.reload();
      });
  }

  onDeletePost(id_post: string) {
    this.subscription = this.postservice
      .deletePost(id_post)
      .subscribe((data: Posts) => {
        this.updataDataAfterDelete(id_post);
        //console.log(data);
      });
  }

  updataDataAfterDelete(id_post: string) {
    for (var i = 0; i < this.post.length; i++) {
      if (this.post[i].id_post === id_post) {
        this.post.splice(i, 1);
        break;
      }
    }
  }

  onEditloadPost(posts: Posts) {
    this.posts = posts;
    if( Array.isArray(posts.id_categorys))
      this.category = posts.id_categorys[0].id_categorys;
    else
      this.category = posts.id_categorys.id_categorys;
    // console.log(posts);
    // console.log(this.postservice.cateBySang);
    // this.api.getOne(this.category).subscribe(res => {
    //   // handle response});
    //   console.log(res);
    // });

  }


  /*  updateID(event) {
  this.posts.id_post = event.something;
  }*/

  // compareByOptoinId(idFirts, idSecond) {
  //   return idFirts && idSecond && idFirts.id == idSecond.id;
  // }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
