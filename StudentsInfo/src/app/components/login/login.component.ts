import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { UseraccountService } from 'src/app/services/useraccount.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //form
  loginForm: FormGroup;

  //varibales
  loading = false;
  submitted = false;
  passwordPattern = '^[a-z0-9_-]{8,}$';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public navbar: NavbarService,
    public useraccountService: UseraccountService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
    });
  }

  ngOnInit() {
    this.navbar.visible.next(false);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    //returns on invalid entries
    if (this.loginForm.invalid) {
      return;
    }
    this.useraccountService
      .login(this.f.username.value, this.f.password.value)
      .subscribe(
        (data) => {
          if (data && data.username != null && data.username != '') {
            this.loading = false;
            this.navbar.visible.next(true);
            this.router.navigate(['/students-info']);
          } else {
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
