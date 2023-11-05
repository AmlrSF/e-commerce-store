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

  constructor (
    private productS:ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
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

}
