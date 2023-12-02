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
  public relatedProducts:any[]=[];
  constructor (
    private productS:ProductService,
    private route: ActivatedRoute,

  ){}

  isCopied: boolean = false;

  copyLink() {
    // Define the URL to copy
    const urlToCopy = 'http://localhost:4200/products/' + this.product._id;

    // Use the Clipboard API to copy the URL to the clipboard
    const el = document.createElement('textarea');
    el.value = urlToCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // Set isCopied to true
    this.isCopied = true;

    // Reset isCopied after 5 seconds
    setTimeout(() => {
      this.isCopied = false;
    }, 5000);
  }

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
               // Fetch all products and filter by the same category
          this.productS.getProducts().subscribe(
            (allProductsRes: any) => {
              const allProducts = allProductsRes.data;

              if (this.product.category) {
                this.relatedProducts = allProducts.filter((product:any) => product.category === this.product.category && this.product._id != product._id );
                console.log(this.relatedProducts);
              }
            },
            (allProductsErr) => console.log(allProductsErr)
          );
          },
          (err)=>console.log(err)
          
        )
      }
    })
  }

  

  public formatPrice(price:any) {
    if (typeof price === 'string') {
      
      if (price.includes('$')) {
       
        return price.replace('$', '') + '$';
      } else {
       
        return price + '$';
      }
    } else if (typeof price === 'number') {
   
      return price.toString() + '$';
    } else {
     
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
    

  //=================
    // Function to handle clicking the heart icon
    toggleFavoriteIconRP(product: any) {
      if (this.productS.isFavorite(product)) {
        this.productS.removeFromFavorites(product);
      } else {
        this.productS.addToFavorites(product);
      }
    }
  
    // Function to check if a product is a favorite
    isFavoriteRP(product: any): boolean {
      return this.productS.isFavorite(product);
    }
  
    // Function to handle clicking the cart icon
    toggleCartIconRP(product: any) {
      if (this.productS.isInCart(product)) {
        this.productS.removeFromCart(product);
      } else {
        this.productS.addToCart(product);
      }
    }
  
    // Function to check if a product is in the cart
    isInCartRP(product: any): boolean {
      return this.productS.isInCart(product);
    }

}
