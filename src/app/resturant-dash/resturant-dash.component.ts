import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-resturant-dash',
  templateUrl: './resturant-dash.component.html',
  styleUrls: ['./resturant-dash.component.css'],
})
export class ResturantDashComponent {
  formValue!: FormGroup;
  restaurantModelObj : RestaurantData = new RestaurantData;
  allRestrodata:any;
  showAdd!:boolean;
  showButton!:boolean;
  constructor(private formBuilder: FormBuilder,private api:ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getAllData();
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd = true;
    this.showButton = false;
  }

  //Now Subscribing our data  which is mapped via services.
  addRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurant records added successfully");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    }
    ,
    err=>{
      alert("Something went wrong");
    })
    
  }

  //getAll DAta
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestrodata  = res;
    })
  }

  //Delete Record
  deleteRestro(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Restro deleted Successfully");
      this.getAllData();
    })
  }

  onEditRestro(data:any){
    this.showAdd = false;
    this.showButton = true;
    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateRestaurant(){
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;
    this.api.updateRestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe(res => {
      alert("Restaurant Update Successfully");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    })

  }

}
