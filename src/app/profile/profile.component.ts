import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { OrdersService } from '../orders.service';
import { ProductService } from '../product.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  
  public imageUrl: string = '';

  public accountForm!: FormGroup;

  public result : any;

  public orders:any;

  public favs : any[] = [];

  public comments : any[] = [];

  public isLoading:boolean = false;

  public showEditForm:boolean = false;
  constructor(
    private productS:ProductService,
    private http: HttpClient,
    private router : Router,
    private orderS:OrdersService,
    private fb:FormBuilder,
    private commentS:CommentService
    ){

      this.accountForm = this.fb.group({

        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        phoneNumber: ['',Validators.required],
        profileImage: [''],
        bio:['',Validators.required]
      });
    }

  public openEditForm() {
    
    this.showEditForm = !this.showEditForm;
  
    if (this.showEditForm) {
      // Scroll down
      window.scrollTo({
        top: 900,
        behavior: 'smooth'
      });
    } else {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  ngOnInit(): void {
    this.fetchProfileInfo();

    
    
  }

    public delete(id:string){
    this.commentS.deleteCommentById(id)
      .subscribe((res:any)=>{
        console.log("deletd succesfully maniga");
        
      },(err:any)=>{
        console.log(err);      
      })
  }

 
  public fetchProfileInfo(){
    
    this.favs = this.productS.getFavorites();
    const gettoken = localStorage.getItem('token'); 
    let token = {
      token : gettoken
    }
    try {
      const gettoken = localStorage.getItem('token'); 
      let token = {
        token : gettoken
      }
      try {
        this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
          (res:any)=>{
            console.log(res);
            if(res.success){
              this.orderS.getOrderById(res.customer._id).subscribe(
                (res) => {
                  this.orders = res;
                },
                (error) => {
                  console.error('Error fetching orders:', error);
                }
              );
              this.commentS.getCommentsByCostumer(res.customer._id).subscribe(
                (res:any)=>{
                  this.comments = res;
                  console.log(res);
                  
                },(err:any)=>{
                  console.log(err);
                  
                }
              )
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
      
      this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.success){
            this.result = res.customer;
            const userData = {
              firstName: this.result.firstName,
              lastName: this.result.lastName,
              email: this.result.email,
              password: this.result.password,
              phoneNumber: this.result.phoneNumber,
              bio: this.result.firstName
            };
            
            this.imageUrl = this.result.profileImage
            
            // Set form values based on userData
            this.accountForm.patchValue(userData);
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

      const formValues = this.accountForm.value;
      formValues['profileImage'] = this.imageUrl;

      console.log(formValues);
      this.isLoading = true;

      // Example: Update the user profile using an API call
      this.http.put(`http://localhost:3000/api/v1/customers/${this.result._id}`, formValues).subscribe(
        (res) => {
          console.log('Profile updated successfully:', res);
          this.isLoading = false;
          this.fetchProfileInfo();
          this.openEditForm();
          //
        },
        (error) => {
          console.error('Error updating profile:', error);
          // Handle error as needed
        }
      );
      
    }
  }

}
