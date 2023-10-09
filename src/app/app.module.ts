import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { BestSellersComponent } from './pages/best-sellers/best-sellers.component';
import { ProductsComponent } from './pages/products/products.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { FeaturesComponent } from './pages/features/features.component';
import { SpecialOffersComponent } from './pages/special-offers/special-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    BestSellersComponent,
    ProductsComponent,
    NewArrivalsComponent,
    FeaturesComponent,
    SpecialOffersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
