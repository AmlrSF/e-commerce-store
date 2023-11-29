import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public accountForm!: FormGroup;
  private apiUrl = 'http://localhost:3000/api/v1/customers/login';
  public isShow: boolean = false;
  public isShow1: boolean = false;
  public hide:boolean = true;;
  ngOnInit(): void {
    this.initForm();
  }

  
  constructor(private fb: FormBuilder, private router: Router, private auth : AuthService,private http: HttpClient) {}


  initForm(): void {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    const gettoken = localStorage.getItem('token'); 
    let token = {
      token : gettoken
    }
    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
        (res : any)=>{
          console.log(res);
          if(res.success){
            this.router.navigate(['/']);
          }
          
        },err=>{
          console.log(err);
        }
      )
    } catch (error) {
      
    }
  }

  onSubmit(): void {
    if (this.accountForm.valid) {

      try {
        console.log(this.accountForm.value);
  
        this.http.post(this.apiUrl, this.accountForm.value).subscribe(
          (res: any) => {
            console.log(res);
            
  
            if (res.success === false && res.error === 'Customer not found') {
              this.isShow = true;
              setTimeout(() => {
                this.isShow = false;
              }, 3000);
            }

            if (res.success === false && res.error === 'Invalid password') {
              this.isShow1 = true;
              setTimeout(() => {
                this.isShow1 = false;
              }, 3000);
            }

            if (res.message === 'Login successful') {
              // Set the JWT token as a localstorage
              this.setJwtTokenLocalStorage('token', res.token);

            
              // Navigate to the home page
              this.router.navigate(['/']);
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

  // Add this method to your component
setJwtTokenCookie(name: string, token: string) {
  document.cookie = `${name}=${token};path=/`;
}

setJwtTokenLocalStorage(name: string, token: string) {
  localStorage.setItem(name, token);
}


  public navigateToRegister(){
    this.router.navigate(['/register']);
  }
}
