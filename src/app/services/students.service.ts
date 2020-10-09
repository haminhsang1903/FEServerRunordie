import { Injectable } from '@angular/core';
import { Students } from './../models/students.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public TOKEN: string = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYwMTkwMjkxOSwiZXhwIjoxNjAxOTg5MzE5fQ.bG50nqgEtvkKWPvPD0Hw7vq-G-n60EVnA-P6b9rL_Fius23fR0sE6NQkpOj0DcNkShl22NnusGOi3zSY-lJuYw';

  public API: string = 'https://serverrunordie.herokuapp.com/student';

  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  getAllStudents(): Observable<Students[]> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<Students[]>(this.API+'/findAll', {headers});
  }

  addStudents(students: Students): Observable<Students> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<Students>(this.API+'/save', students, {headers});
	}

	deleteStudents(id_students: string): Observable<Students> {
    const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.delete<Students>(`${this.API}/delete/${id_students}`, {headers});
	}
  
}
