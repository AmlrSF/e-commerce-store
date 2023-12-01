import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isLoading:boolean = false;
  //all sildes 
  public slides:{image:string,description:string ,header:string}[] = [
    
  ];
  
  
 
  public products: any[] = [];
  public featuredProduct:any[] = [];
  private token :string = "";
  constructor (private productS:ProductService,private auth:AuthService,private http: HttpClient){}


  private baseUrl = 'http://localhost:3000/api/v1/billboards';




  ngOnInit(): void {

   
      this.http.get(`${this.baseUrl}`).subscribe(
        (res: any) => {
          this.slides = res;
        },
        (err: any) => {
          console.error(err);
        }
      );
    

    this.token = localStorage.getItem('token') || "";
    this.isLoading = true;
    this.productS.getProducts().subscribe(
      (res:any)=>{
        this.products = res.data;
       
        
        this.featuredProduct = this.products.filter((item:any)=>item.featured===true);
        this.isLoading = false;
      },(err)=>{
        console.log(err);
      }
    )
    
    let token = {
      token:this.token
    }

    if(this.token){
      console.log(token);
      this.http.post("http://localhost:3000/api/v1/customers/profile",token).
        subscribe((res)=>{
          console.log(res)
          
        },
        (err)=>console.log(err))   
    }



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

    // Function to handle clicking the heart icon
    toggleFavoriteIcon(product: any) {
      if (this.productS.isFavorite(product)) {
        this.productS.removeFromFavorites(product);
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


