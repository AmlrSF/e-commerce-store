import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public addedItems:any;

  constructor(private productS: ProductService){};
  
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
  
}
