import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  public product: any = {};
  public itemId:any;

  constructor (
    private productS:ProductService,
    private route: ActivatedRoute,

  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      this.itemId = productId;
      console.log(productId);
      
      if (productId) {
        this.productS.getProductById(productId).subscribe(
          (res)=>{
            this.product = res.data 
            console.log(res);
           
          },
          (err)=>console.log(err)
          
        )
      }
    })
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
  
  public  formatReadableDate(dateString:any) {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }

  incrementItem(){
    this.productS.incrementItemCount(this.product);
  }

  decrementItem(){
    this.productS.decrementItemCount(this.product);
  }

  getCount(){
    return this.productS.getItemCountInCart(this.product);
  }


  // Function to handle clicking the heart icon
  toggleFavoriteIcon() {
    if (this.productS.isFavorite(this.product)) {
      this.productS.removeFromFavorites(this.product);
    } else {
      this.productS.addToFavorites(this.product);
    }
  }

  // Function to check if a product is a favorite
  isFavorite(): boolean {
    return this.productS.isFavorite(this.product);
  }

  // Function to handle clicking the cart icon
  toggleCartIcon() {
    if (this.productS.isInCart(this.product)) {
      this.productS.removeFromCart(this.product);
    } else {
      this.productS.addToCart(this.product);
    }
  }

  // Function to check if a product is in the cart
  isInCart(): boolean {
    return this.productS.isInCart(this.product);
  }
    

}
