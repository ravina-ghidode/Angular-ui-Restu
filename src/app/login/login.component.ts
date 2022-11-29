import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform!:FormGroup;
  constructor(private formbuilder : FormBuilder,private _http : HttpClient,private router : Router){}
  ngOnInit() : void{
    this.loginform = this.formbuilder.group({
      email:[''],
      password:['']
    })
  }
//login
login(){
  this._http.get<any>("http://localhost:3000/signup").subscribe(res =>{
    const user = res.find((a:any)=>{
      return a.email === this.loginform.value.email && a.password === this.loginform.value.password
    })
    if(user){
      alert('Login Successful');
      this.loginform.reset();
      this.router.navigate(['restaurant'])

    }
    else{
      alert('User Not Found');
    }
    
  }
  , err=>{
    alert('Something went wrong from server side')
  })

}
}
