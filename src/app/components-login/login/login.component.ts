import { Component, OnInit, OnDestroy} from '@angular/core';
import { LoginService } from './../../services/login.service';
import { User } from './../../models/user.model';
import { Token } from './../../models/token.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public user: User;
  public subscription: Subscription;
  token=Token.token_access;


  constructor(  public loginService: LoginService,
			    public routerService: Router,
			    public http: HttpClient,
          public cookieservice: CookieService  ) { }

  ngOnInit(): void {
    this.user = new User();
  }

  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
  }

  onLogin() {
    this.subscription = this.loginService.login(this.user).subscribe(data  => {

      Token.token_access = Object.values(data)[3]>Object.values(data)[4]?Object.values(data)[3]:Object.values(data)[4];
      this.cookieservice.set( 'token' ,Token.token_access);
      console.log(Token.token_access);

     //   const headers = { 'Authorization': 'Bearer '+this.token };

	    // this.http.get<any>('https://serverrunordie.herokuapp.com/categorys/findAll', { headers }).subscribe(data => {
	    //   console.log(data)
	    // })
       this.routerService.navigateByUrl('admin/manage-post');

    })


  }

}
