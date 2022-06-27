import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { UseraccountService } from 'src/app/services/useraccount.service';
import { User } from 'src/app/viewmodels/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = "";
  passwordPattern = "^[a-z0-9_-]{8,15}$";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public navbar: NavbarService,
    public useraccountService : UseraccountService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required,Validators.pattern(this.passwordPattern)]]
    });
  }

  ngOnInit() {
    this.navbar.visible.next(false);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.navbar.visible.next(true);
    if (this.loginForm.invalid) {
      return;
    }
    this.useraccountService.login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        if(data && data.username != null && data.username != ''){
          this.loading = false;
          this.router.navigate(['/students-info']);
        }else{
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
      }
    )
  }

  

}
