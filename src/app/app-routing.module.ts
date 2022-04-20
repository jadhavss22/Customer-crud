import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';


const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signin',
    component: SigninComponent,
  },

  {
    path: 'student-dashboard',
    component: StudentDashboardComponent, canActivate:[AuthGuard]
  },
  {
    path: 'form',
    component:FormComponent,
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
