import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Major } from './../models/major.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  public API: string = 'https://serverrunordie.herokuapp.com/major';
	
  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  	getAllMajor(): Observable<Major[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<Major[]>(this.API+'/findAll', {headers});
	}

	addMajor(major: Major): Observable<Major> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<Major>(this.API+'/save', major, {headers});
	}

	deleteMajor(id_major: string): Observable<Major> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.delete<Major>(`${this.API}/delete/${id_major}`, {headers});
	}
}
