import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  [x: string]: any;
  public imageUrl: string = '';
  public accountForm!: FormGroup;
  public result : any;

  constructor(private http: HttpClient,private router : Router){}

  ngOnInit(): void {
    const gettoken = localStorage.getItem('token'); 
    let token = {
      token : gettoken
    }
    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.success){
            this.result = res.customer;
          }else{
            this.router.navigate(['/login']);
          }
          
        },err=>{
          console.log(err);
          this.router.navigate(['/login']);
        }
      )
    } catch (error) {
      
    }
  }

  initForm(): void {
    this.accountForm = this['fb'].group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['',Validators.required],
      profileImage: ['',Validators.required],
      bio:['',Validators.required]
    });
  }

  //formDate
  public  formatReadableDate(dateString:any) {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }


  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result as string; 
      };
      reader.readAsDataURL(file);
    }
  }
  

  openImage() {
    const inputElement = document.getElementById('image');
    if (inputElement) {
      inputElement.click();
    }
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.accountForm.value['profileImage'] = this.imageUrl;
      
    }
  }

}
