import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentsListComponent } from './components/students-list/students-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'students-info', component: StudentsListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'students-info'},
  {path: '**', redirectTo: 'students-info'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
