import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { BestSellersComponent } from './pages/best-sellers/best-sellers.component';
import { FeaturesComponent } from './pages/features/features.component';
import { SpecialOffersComponent } from './pages/special-offers/special-offers.component';

const routes: Routes = [
  {path : '' , component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'new-arrivals',component:NewArrivalsComponent},
  {path:'best-sellers',component:BestSellersComponent},
  {path:'featured',component:FeaturesComponent},
  {path:'special-offer',component:SpecialOffersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
