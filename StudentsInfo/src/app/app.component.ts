import { Component, OnInit } from '@angular/core';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'StudentsInfo';
  showActionIcon = false;
  constructor(public navbar: NavbarService) {
  }
  ngOnInit(): void {
    this.navbar.visible.subscribe(
      data => {this.showActionIcon = data}
    );
  }
}
