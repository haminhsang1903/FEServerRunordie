import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { RoomsService } from './../../../services/rooms.service';
import { Rooms } from './../../../models/rooms.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.css']
})
export class ManageRoomComponent implements OnInit, OnDestroy {

  public rooms: Rooms;
  public roomses: Rooms[] = [];
  public subscription: Subscription;
  totalRecords: number;
  public subscriptionParams: Subscription;
  
  constructor(
    public routerService: Router,
    public roomsService: RoomsService,
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
    this.rooms = new Rooms();
    this.subscription = this.roomsService.getAllRooms().subscribe(data => {
      this.roomses = data;
      this.totalRecords = data.length;
    })
    this.rooms = new Rooms();
  }
  
  ngOnDestroy() {
    if (Subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

  onAddRooms(): void {
    this.subscription = this.roomsService.addRooms(this.rooms).subscribe((data: Rooms) => {
      this.routerService.navigate(['admin/manage-room']);
      window.location.reload();
    })
  }

  onDeleteRooms(id_rooms: number) {
    this.subscription = this.roomsService.deleteRooms(id_rooms).subscribe(data => {
        this.upDataAfterDelete(id_rooms);
    });
  }

  upDataAfterDelete(id_rooms: number) {
    let result = 0;
    for (var i = 0; i < this.roomses.length; i++) {
        if (this.roomses[i].id_rooms == id_rooms) {
            this.roomses.splice(i, 1);
            break;
        }
    }
  }

  onEditRooms(rooms: Rooms){
    this.rooms = rooms;
  } 
}

