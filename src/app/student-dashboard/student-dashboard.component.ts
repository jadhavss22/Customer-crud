import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';
import { Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  studentValue!: FormGroup;
  studentObj: StudentModel = new StudentModel;
  studentList: any = [];
  btnSaveShow: boolean = true;
  btnUpdateShow: boolean = false;
  submitted = false;
  display =true;
  constructor(private formbuilder: FormBuilder, private api: ApiService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {

    this.studentValue = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
      address: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
      amount: ['', [Validators.required,Validators.pattern("^[1-9]+[0-9]*$")]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      gender: ['', Validators.required],
        city: ['', Validators.required],
      // hobbies: new FormArray([new FormControl(null,Validators.required),
      //   new FormControl(null,Validators.required),new FormControl(null,Validators.required)
      // ]),
      // female: ['', Validators.required],
      // city: ['', Validators.required ]
        
    })
    this.getStudent();
  }
  AddStudent() {

    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.address = this.studentValue.value.address;
    this.studentObj.amount = this.studentValue.value.amount;
    this.studentObj.mobile = this.studentValue.value.mobile;
    this.studentObj.gender = this.studentValue.value.gender;
    this.studentObj.city = this.studentValue.value.city;
    // this.studentObj.hobbies = this.studentValue.value.hobbies;
    this.api.postStudent(this.studentObj).subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (e) => {
        console.log(e)
        alert("Error")
      },

      complete: () => {
        console.log('Student record added!')
        alert("Student record added!")
        this.getStudent();
        this.studentValue.reset();
        
        
      }
    })

  }
  getStudent() {
    this.api.getStudent().subscribe(res => {
      this.studentList = res;
    })

  }

  deleteStudent(data: any) {
    this.api.deleteStudent(data.id).subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (e) => {
        console.log(e)
        alert("Error")
      },

      complete: () => {
        console.log('Student record deleted!')
        alert("Student record deleted!")
        this.getStudent();


      }
    })
  }

  editStudent(data: any) {
    this.studentValue.controls["name"].setValue(data.name);
    this.studentValue.controls["address"].setValue(data.address);
    this.studentValue.controls["amount"].setValue(data.amount);
    this.studentValue.controls["mobile"].setValue(data.mobile);
    this.studentValue.controls["gender"].setValue(data.gender);
    this.studentValue.controls["city"].setValue(data.city);
    // this.studentValue.controls["hobbies"].setValue(data.hobbies);
  
    this.studentObj.id = data.id;
    this.showUpdate();
  }

  updateStudent() {


    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.address = this.studentValue.value.address;
    this.studentObj.amount = this.studentValue.value.amount;
    this.studentObj.mobile = this.studentValue.value.mobile;
    this.studentObj.gender = this.studentValue.value.gender;
    this.studentObj.city = this.studentValue.value.city;
    // this.studentObj.hobbies = this.studentValue.value.hobbies;


    this.api.putStudent(this.studentObj, this.studentObj.id).subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (e) => {
        console.log(e)
        alert("Error")
      },

      complete: () => {
        console.log('Student record Updated!')
        alert("Student record Updated!")
        this.getStudent();
        this.studentValue.reset();
        this.showSave();
        this.studentObj.id = 0;

      }
    })
  }

  showSave() {
    this.btnSaveShow = true;
    this.btnUpdateShow = false;
    this.studentValue.reset();
  }


  onSubmit() {
  
    this.submitted = true;
    if (this.studentValue.invalid) {
      return;
    }
    this.AddStudent();
   
    this.studentValue.get('name')?.clearValidators();
    this.studentValue.get('name')?.updateValueAndValidity();
    this.studentValue.get('address')?.clearValidators();
    this.studentValue.get('address')?.updateValueAndValidity();
    this.studentValue.get('amount')?.clearValidators();
    this.studentValue.get('amount')?.updateValueAndValidity();
    this.studentValue.get('gender')?.clearValidators();
    this.studentValue.get('gender')?.updateValueAndValidity();
    this.studentValue.get('mobile')?.clearValidators();
    this.studentValue.get('mobile')?.updateValueAndValidity();
    this.studentValue.get('city')?.clearValidators();
    this.studentValue.get('city')?.updateValueAndValidity();
    this.studentValue.get('hobbies')?.clearValidators();
    this.studentValue.get('hobbies')?.updateValueAndValidity();
  }

  showUpdate() {
    this.btnSaveShow = false;
    this.btnUpdateShow = true;
  }
  closeModalDialog(){
    this.display=false; //set none css after close dialog
   }

  get f() {
    this.submitted= true;
    return this.studentValue.controls;

  }

  Logout(){
    localStorage.removeItem("user")
    this.router.navigate(['login'])
 }
}

