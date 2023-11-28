import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  public imageUrl: string = '';
  public accountForm!: FormGroup;
  private apiUrl = 'http://localhost:3000/api/v1/customers/register';
  public isShow: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private auth : AuthService,private http: HttpClient) {}

  ngOnInit(): void {
    
    this.initForm();
    const gettoken = localStorage.getItem('token'); 
    let token = {
      token : gettoken
    }
    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
        res=>{
          console.log(res);
          this.router.navigate(['/']);
        },err=>{
          console.log(err);
        }
      )
    } catch (error) {
      
    }
  }

  initForm(): void {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['',Validators.required],
      profileImage: ['',Validators.required],
      bio:['',Validators.required]
    });
  }


  onSubmit(): void {
    if (this.accountForm.valid) {
      this.accountForm.value['profileImage'] = this.imageUrl;
  
      try {
        console.log(this.accountForm.value);
  
        this.http.post(this.apiUrl, this.accountForm.value).subscribe(
          (res: any) => {
            console.log(res);
  
            if (res.success === false && res.error === 'Email already in use') {
              this.isShow = true;
              setTimeout(() => {
                this.isShow = false;
              }, 3000);
            }

            if(res.success === true) {
              // Navigate to the login page
              this.navigateToLoin();
            }

          },
          (err) => {
            console.log(err);
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  public navigateToLoin(){
    this.router.navigate(['/login']);
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

}
