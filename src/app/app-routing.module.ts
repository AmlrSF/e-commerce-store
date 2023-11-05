import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { BestSellersComponent } from './pages/best-sellers/best-sellers.component';
import { SpecialOffersComponent } from './pages/special-offers/special-offers.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { WhitelistComponent } from './pages/whitelist/whitelist.component';

const routes: Routes = [
  {path : ''            ,component:HomeComponent},
  {path:'new-arrivals'  ,component:NewArrivalsComponent},
  {path:'best-sellers'  ,component:BestSellersComponent},
  {path:'special-offer' ,component:SpecialOffersComponent},
  {path:'new-arrivals'  ,component:NewArrivalsComponent},
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
  {
    path:'checkout',
    component:OrdersComponent
  },
  {
    path:'whitelist',
    component:WhitelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
