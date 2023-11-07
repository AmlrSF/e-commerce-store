import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/orders.service';
import { ProductService } from 'src/app/product.service';
import { OrderResponse } from 'src/app/interfaces/page-interfaces';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public statusOrder:boolean = false;
  public addedItems:any;
  
  productForm: FormGroup;
  private apiUrl = 'http://localhost:3000/api/v1/orders';

 
  constructor(
    private formBuilder: FormBuilder,
    private productS:ProductService,
    private orderS:OrdersService,
    private http: HttpClient,
    ) {
    this.productForm = this.formBuilder.group({
      Address: ['', [Validators.required]],
      FullName: ['', Validators.required],
      ZipCode: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      try {      
        var order = {
          customer:"6547ee2d542e6d53e008cef5",
          FullName:this.productForm.value.FullName,
          ZipCode:this.productForm.value.ZipCode,
          City:this.productForm.value.city,
          Country:this.productForm.value.country,
          emailTo:this.productForm.value.Address,
          totalAmount:this.getProductTotal(10,7.99),
          status: false,
          products:this.productS.getCartItems().map((item:any)=>{return {product:item._id,quantity:item.count,allQuantity:item.quantity}})
        }
  
            
        this.http.post(this.apiUrl, order)
          .subscribe((res) =>{
            this.productForm.reset();
            this.statusOrder = true;
            
            this.updateProductQuantities(order, true);
            this.clearAll();
            
          },err=>{
            console.log(err)
          })

      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Form is not valid. Please check the input values.');
    }

  }
  
  

  private updateProductQuantities(Result: any, status?:boolean) {
    for (const updatedProduct of Result.products) {
      const productId = updatedProduct.product;
      const allItemsQte = parseInt(updatedProduct.allQuantity, 10);
      const subQte = parseInt(updatedProduct.quantity, 10);
      
      console.log(updatedProduct);
      

      const newQuantity = status ? allItemsQte - subQte : allItemsQte + subQte;

      const updateUrl = `http://localhost:3000/api/v1/products/product/${productId}`;

     
      
      this.http.put(updateUrl, { quantity: newQuantity })
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            if (error.status === 404) {
              console.log('Product not found.');
            } else {
              console.error(error);
            }
          }
        );
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

  getProductTotal(discount: number = 0, shipping: number = 0): number {
    const cartTotal = this.productS.calculateCartTotal();
    return cartTotal - discount - shipping;
  }
  


}
