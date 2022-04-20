import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { repeat } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    signin !: FormGroup
    submitted = false;
 // formbuilder: any;

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.signin = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password: ['', Validators.required],
      repeate: ['', Validators.required]
    })
  }

  onsubmit() {
    debugger
        console.log("asdasd")
        this.submitted = true;
    
        if (this.signin.invalid) {
          return;
        }
        // if (this.signin.get('email')?.value == "user@gmail.com" && this.signin.get('password')?.value == "123") {
        //   alert("login success")
        //   this.router.navigate(["/login"]);
        // }
        // else {
        //   alert('signin failed')
        // }
    
        this.http.post<any>("http://localhost:3000/login",this.signin.value)
      .subscribe(res => {
        debugger;
       // localStorage.setItem("user", "1")
        alert("login success !!");
        this.router.navigate(['/login'])

      }
      )
      }

  get f(){
    return this.signin.controls;

  }
}
