import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './services/navbar.service';
import { UseraccountService } from './services/useraccount.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  //variables
  title = 'StudentsInfo';
  showActionIcon = false;
  isDefaultDate = true;

  constructor(public navbar: NavbarService,public useraccountService : UseraccountService,private router: Router) {
  }
  ngOnInit(): void {
    this.navbar.visible.subscribe(
      data => {this.showActionIcon = data}
    );
  }

  logout(){
    this.useraccountService.logout().subscribe(
      data => {
        if(data) {this.router.navigate(['/login']);}
      }
    )
  }

  //emitting value to toggle date
  toggleDate(){
    this.isDefaultDate = !this.isDefaultDate
    this.navbar.isDefaultDate.next(this.isDefaultDate);
  }
}
