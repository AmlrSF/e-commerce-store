import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {

  public favs : any[] = [];

  constructor(private productS:ProductService){};

  ngOnInit(): void {
      this.favs = this.productS.getFavorites();
      console.log(this.favs);
      
  }

  //format a date
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
  
  // format a given (new Date()) value
  public  formatReadableDate(dateString:any) {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }

  // Function to handle clicking the heart icon
  toggleFavoriteIcon(product: any) {
    if (this.productS.isFavorite(product)) {
      this.productS.removeFromFavorites(product);
      this.favs = this.productS.getFavorites();
    } else {
      this.productS.addToFavorites(product);
    }
  }

  // Function to check if a product is a favorite
  isFavorite(product: any): boolean {
    return this.productS.isFavorite(product);
  }

  // Function to handle clicking the cart icon
  toggleCartIcon(product: any) {
    if (this.productS.isInCart(product)) {
      this.productS.removeFromCart(product);
    } else {
      this.productS.addToCart(product);
    }
  }

  // Function to check if a product is in the cart
  isInCart(product: any): boolean {
    return this.productS.isInCart(product);
  }
  

}
