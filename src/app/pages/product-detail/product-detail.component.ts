import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/comment.service';
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

  public myForm!: FormGroup;

  public isLoading:boolean = false;

  public comments:any[] = []; 

  public editMode: boolean = false;

  public profileID:string = "";

  public editComment:any;
  // private prodId:string | undefined;
  constructor (
    private productS:ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient, 
    private commentS:CommentService,
    private router:Router
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

    this.myForm = this.formBuilder.group({
      content: ['', Validators.required],
    });


    const gettoken = localStorage.getItem('token'); 
    let token = {
      token : gettoken
    }

    this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
      (res:any)=>{
        // console.log(res);
        
        this.profileID=res.customer._id;
        
        
      },err=>{
        console.log(err);
        this.router.navigate(['/login']);
      }
    )

    

    
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      // this.prodId = productId;

      this.itemId = productId;
      console.log(productId);
      
      if (productId) {
        this.productS.getProductById(productId).subscribe(
          (res)=>{
            this.product = res.data 
            console.log(this.product);
               // Fetch all products and filter by the same category
              this.getAllComments();
              this.productS.getProducts().subscribe(
                (allProductsRes: any) => {
                  const allProducts = allProductsRes.data;

                  if (this.product.category) {
                    this.relatedProducts = allProducts.filter((product:any) => product.category === this.product.category && this.product._id != product._id );
                    //console.log(this.relatedProducts);
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

  public getAllComments(){
    console.log(this.product._id);
    
    this.commentS.getCommentsByProducts(this.product._id).subscribe((res:any)=>{
      console.log(res);
      
      this.comments = res;
    },(err:any)=>{
      console.log(err);
      
    })
  }

  public delete(id:string){
    this.commentS.deleteCommentById(id)
      .subscribe((res:any)=>{
        console.log("deletd succesfully maniga");
        this.getAllComments();
      },(err:any)=>{
        console.log(err);      
      })
  }

  public update(id:string){
    this.editMode = true;
    this.commentS.getCommentsById(id).subscribe(
      (data: any) => {

        this.editComment = data;
        console.log(data);
        
        this.myForm.patchValue({
          content: this.editComment[0].content,
        });

      },
      (error) => {
        console.error(error);

      }
    );
  }

  onSubmit(){
    const gettoken = localStorage.getItem('token'); 
    let token = {
      token : gettoken
    }
    if(this.myForm.valid){
      if (this.editMode) {

        const updatedData = {
          content: this.myForm.value.content,
        };

        

        this.commentS.updateCommentById(this.editComment[0]._id, updatedData).subscribe(
          (data) => {
            console.log(data);
            this.editMode = false;
            this.getAllComments();
            this.myForm.reset();
          },
          (error) => {
            console.error(error);
          }
        );

      }else{
        try {
          this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
            (res:any)=>{
              console.log(res);
              if(res.success){
                this.isLoading = true;
  
                let comment = {
                  customerId:res.customer._id,
                  productId:this.product._id,
                  content : this.myForm.value.content
                }
          
                this.commentS.addComment(comment).subscribe(
                  (res:any)=>{
                    this.isLoading = false;
                    this.myForm.reset();
                   this.getAllComments();
                  },(err:any)=>{
                    console.log(err);
                    
                })
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
