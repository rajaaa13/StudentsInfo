import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//primeng
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
//components & routing modules
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [AppComponent, LoginComponent, StudentsListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
