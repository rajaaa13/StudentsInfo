import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import {Table} from 'primeng/table';
import { Student } from 'src/app/viewmodels/students';
import { StudentsinfoService } from 'src/app/services/studentsinfo.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: Student[] = [];
  @ViewChild('dt') table: Table;
  loading: boolean = true;
  cols:any[];

  constructor(public navbar: NavbarService,private studentsInfoService: StudentsinfoService,) { }

  ngOnInit(): void {
    this.navbar.visible.next(true);
    this.cols = [
      { field: 'name', header: 'Students Name', index: 1 },
      { field: 'id', header: 'Student ID', index: 2 },
      { field: 'standard', header: 'Standard', index: 3 },
      { field: 'section', header: 'Section', index: 4 },
      { field: 'dob', header: 'DoB', index: 5 }
    ];
    this.studentsInfoService.getStudentsInfo().then(studentsList => {
      this.students = studentsList;
      this.loading = false;
  });
  }

  clear() {
    this.table.clear();
  }

  applyFilterGlobal($event :any, stringVal:any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
