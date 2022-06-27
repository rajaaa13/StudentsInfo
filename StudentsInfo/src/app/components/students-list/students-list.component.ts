import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import {Table} from 'primeng/table';
import { Student } from 'src/app/viewmodels/students';
import { StudentsinfoService } from 'src/app/services/studentsinfo.service';
import { UseraccountService } from 'src/app/services/useraccount.service';
import { User } from 'src/app/viewmodels/User';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: Student[] = [];
  loggedinUser : User;
  @ViewChild('dt') table: Table;
  loading: boolean = true;
  cols:any[];
  isDefaultDate = true;
  showTable = true;

  constructor(private datePipe:DatePipe,
    public navbar: NavbarService,
    private studentsInfoService: StudentsinfoService,
    private useraccountService:UseraccountService) { }

  ngOnInit(): void {
    this.navbar.visible.next(true);
    this.navbar.isDefaultDate.subscribe(
      data => {this.isDefaultDate = data}
    );
    this.useraccountService.userValue.subscribe(
      data => {
        if(data && data.username != null && data.username != ''){
          this.loggedinUser = data;
          this.loading = false;
        }else{
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
      }
    )
    this.cols = [
      { field: 'name', header: 'Students Name', index: 1 },
      { field: 'id', header: 'Student ID', index: 2 },
      { field: 'standard', header: 'Standard', index: 3 },
      { field: 'section', header: 'Section', index: 4 },
      { field: 'dob', header: 'DoB', index: 5 }
    ];
    this.studentsInfoService.getStudentsInfo().then(studentsList => {
      this.students = studentsList;
      this.students.forEach(
        student => {
          student.dob = this.formatDate(student.dob.toString())
        }
      )
      this.loading = false;
  });
  }

  clear() {
    this.table.clear();
  }

  applyFilterGlobal($event :any, stringVal:any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  toggleDate(){
    this.showTable = false;
    this.isDefaultDate = !this.isDefaultDate
    setTimeout(() => this.showTable = true, 0);
  }

  formatDate(value:string){
    let datesplitted : any = value.split('-');
    let date : string = datesplitted[0];
    let month : string = datesplitted[1];
    let year : string = datesplitted[2];
    let dateunformatted = month + '/' + date +'/'+year
    let specificdate =  new Date(dateunformatted);
    return specificdate;
  }

}
