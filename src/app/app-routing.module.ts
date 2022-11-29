import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResturantDashComponent } from './resturant-dash/resturant-dash.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'',
    redirectTo : 'login',
    pathMatch:'full'

  },
  {
    path:'login',
    component:LoginComponent

},
{
  path:'signup',
  component:SignupComponent

},
{
  path:'restaurant',
  component:ResturantDashComponent

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
