import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../viewmodels/students';

@Injectable({
  providedIn: 'root'
})
export class StudentsinfoService {

  constructor(private https: HttpClient) { }

  getStudentsInfo() {
    return this.https.get<any>('assets/studentslist.json')
        .toPromise()
        .then(res => <Student[]>res.data)
        .then(data => { return data; });
}
}
