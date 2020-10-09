import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rooms } from './../models/rooms.model';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  public API: string = 'https://serverrunordie.herokuapp.com/room';
	
  constructor(public http: HttpClient, public cookieservice :CookieService) { }

  	getAllRooms(): Observable<Rooms[]> {
  		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.get<Rooms[]>(this.API+'/findAll', {headers});
	}

	addRooms(rooms: Rooms): Observable<Rooms> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.post<Rooms>(this.API+'/save', rooms, {headers});
	}

	deleteRooms(id_rooms: number): Observable<Rooms> {
		const headers = { 'Authorization': 'Bearer ' +this.cookieservice.get('token')};
		return this.http.delete<Rooms>(`${this.API}/delete/${id_rooms}`, {headers});
	}
}
