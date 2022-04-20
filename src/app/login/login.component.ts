import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
// import { get } from 'http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup

  submitted = false;
  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    this.loginform = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      pass: ['', Validators.required]
    })
  }
  login() {
    this.submitted = true;
    if (this.loginform.invalid) { 
      return
    }
    else {

      this.http.get<any>("http://localhost:3000/login")
        .subscribe(res => {
          const user = res.find((a: any) => {
            return a.email == this.loginform.value.email && a.password == this.loginform.value.pass
          });
          if (user) {
            alert("Login successfully");
            this.loginform.reset();
            this.router.navigate(['/student-dashboard']);
            localStorage.setItem("user", "1")
          } else {
            alert("User not found");
          }
        }, err => {
          alert("Something went wrong");
        })
    }
  }




  // submit()
  // {
  //   // debugger
  // console.log("asdasd")
  //   this.submitted = true;

  //   if (this.loginform.invalid) {
  //     return;
  //   }
  //   if (this.loginform.get('email')?.value == "user@gmail.com" && this.loginform.get('pass')?.value == "123") {
  //     alert("login success");

  //     localStorage.setItem('user','1')
  //     this.router.navigate(["/student-dashboard"]);
  //   }

  //   else {
  //     alert('login failed');
  //   }  
  // }

  get f() {
    return this.loginform.controls;
  }
}


