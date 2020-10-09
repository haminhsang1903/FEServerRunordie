import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Lecturers } from './../models/lecturers.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

public API : string ='https://serverrunordie.herokuapp.com/lecturers';

  constructor(public http: HttpClient, public cookieservice :CookieService) { } 

  getAllLecturers(): Observable<Lecturers[]>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.get<Lecturers[]>(this.API +'/findAll', {headers});
  }

  addLecturers(lecturers: Lecturers) : Observable<Lecturers>{
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
  	return this.http.post<Lecturers>(this.API +'/save', lecturers, {headers});
  }

   deleteLecturers(id_lecturers: string): Observable<Lecturers>{
     const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
    return this.http.delete<Lecturers>(this.API +'/delete' +"/"+ id_lecturers, {headers});
  }
}
