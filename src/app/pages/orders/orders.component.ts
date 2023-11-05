import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public addedItems:any;
  productForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder,private productS:ProductService) {
    this.productForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      FullName: ['', Validators.required],
      ZipCode: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  onSubmit() {
    
    
    if (this.productForm.valid) {
      console.log('Form submitted with values:', this.productForm.value);
      // You can implement further logic here, such as sending the data to a server.
    } else {
      console.log('Form is not valid. Please check the input values.');
    }
  }
  
  ngOnInit(): void {
    this.addedItems =  this.productS.getCartItems();
  }

  public formatPrice(price:any) {
    if (typeof price === 'string') {
      // If the price is a string, check for the presence of '$' symbol.
      if (price.includes('$')) {
        // If '$' is on the left, move it to the right.
        return price.replace('$', '') + '$';
      } else {
        // If '$' is not present, add it to the right.
        return price + '$';
      }
    } else if (typeof price === 'number') {
      // If the price is a number, convert it to a string and add '$' on the right.
      return price.toString() + '$';
    } else {
      // Handle other cases, e.g., when the data is not a string or a number.
      return 'N/A';
    }
  }

  incrementItem(product :any){
    this.productS.incrementItemCount(product);
  }

  decrementItem(product :any){
    this.productS.decrementItemCount(product);
  }

  getCount(product :any){
    return this.productS.getItemCountInCart(product);
  }

  getSubTotalInCart(product:any){
    return this.productS.getSubTotalInCart(product);
  }
  
  deleteItemFromCart(product:any){
    this.productS.removeFromCart(product);
    this.addedItems =  this.productS.getCartItems();
  }

  clearAll(){
    this.productS.clearCartLocalStorage();
    this.addedItems =  this.productS.getCartItems();
  }




}
