import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  public imageUrl: string = '';
  public accountForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth : AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: [''],
      profileImage: [''],
      image: [''],
      bio:['']
    });
  }


  onSubmit(): void {
    if (this.accountForm.valid) {
      this.accountForm.value['profileImage'] = this.imageUrl; // Check the field name ('image' or 'profileImage')
      try {
        console.log(this.accountForm.value);
        console.log("amir");
        
        this.auth.register(this.accountForm.value).subscribe(
          (res) => {
            console.log(res);
            // You can handle the registration success here
          },
          (error) => {
            console.error(error);
            // You can handle the registration error here
          }
        );
  
      } catch (error) {
        console.error(error);
      }
    }
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
