import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Table } from 'primeng/table';
import { Student } from 'src/app/viewmodels/students';
import { StudentsinfoService } from 'src/app/services/studentsinfo.service';
import { UseraccountService } from 'src/app/services/useraccount.service';
import { User } from 'src/app/viewmodels/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  //objects
  loggedinUser: User;

  //viewchild
  @ViewChild('dt') table: Table;

  //variables
  loading: boolean = true;
  isDefaultDate = true;
  showTable = true;
  students: Student[] = [];
  cols: any[];

  constructor(
    public navbar: NavbarService,
    private studentsInfoService: StudentsinfoService,
    private useraccountService: UseraccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.cols = [
      { field: 'name', header: 'Students Name', index: 1 },
      { field: 'id', header: 'Student ID', index: 2 },
      { field: 'standard', header: 'Standard', index: 3 },
      { field: 'section', header: 'Section', index: 4 },
      { field: 'dob', header: 'DoB', index: 5 },
    ];
    this.getnavbarData();
    this.getLoggedinUserInfo();
    this.getStudentsDetails()
  }

  getnavbarData() {
    this.navbar.visible.next(true);
    this.navbar.isDefaultDate.subscribe((data) => {
      this.isDefaultDate = data;
    });
  }

  getLoggedinUserInfo() {
    this.useraccountService.userValue.subscribe(
      (data) => {
        if (data && data.username != null && data.username != '') {
          this.loggedinUser = data;
          this.loading = false;
        } else {
          this.loading = false;
          this.useraccountService.logout().subscribe(
            data => {
              if(data) {this.router.navigate(['/login']);}
            }
          )
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getStudentsDetails() {
    this.studentsInfoService.getStudentsInfo().then((studentsList) => {
      this.students = studentsList;
      this.students.forEach((student) => {
        student.dob = this.formatDate(student.dob.toString());
      });
      this.loading = false;
    });
  }

  formatDate(value: string) {
    let datesplitted: any = value.split('-');
    let date: string = datesplitted[0];
    let month: string = datesplitted[1];
    let year: string = datesplitted[2];
    let dateunformatted = month + '/' + date + '/' + year;
    let specificdate = new Date(dateunformatted);
    return specificdate;
  }

  clear() {
    this.table.clear();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.table.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }

  toggleDate() {
    this.showTable = false;
    this.isDefaultDate = !this.isDefaultDate;
    setTimeout(() => (this.showTable = true), 0);
  }
}
