import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NominalClass } from './../models/nomialclass.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class NominalClassService {

  public API: string = 'https://serverrunordie.herokuapp.com/nominalClass';
	
  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  	getAllNominalClass(): Observable<NominalClass[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<NominalClass[]>(this.API+'/findAll', {headers});
	}

	addNominalClass(nominalClass: NominalClass): Observable<NominalClass> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<NominalClass>(this.API+'/save', nominalClass, {headers});
	}

	deleteNominalClass(id_nominalclass: string): Observable<NominalClass> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.delete<NominalClass>(`${this.API}/delete/${id_nominalclass}`, {headers});
	}
}
