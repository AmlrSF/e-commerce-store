import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { BestSellersComponent } from './pages/best-sellers/best-sellers.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { SpecialOffersComponent } from './pages/special-offers/special-offers.component';
import { CarouselModule, FormModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ReactiveFormsModule } from '@angular/forms';
import { MangeOrdersComponent } from './pages/mange-orders/mange-orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DeveloperComponent } from './pages/developer/developer.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    BestSellersComponent,
    NewArrivalsComponent,
    SpecialOffersComponent,
    ProductDetailComponent,
    ProductsComponent,
    OrdersComponent,
    MangeOrdersComponent,
    DeveloperComponent
  ],
  imports: [
    CarouselModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ClipboardModule,
    FormModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
