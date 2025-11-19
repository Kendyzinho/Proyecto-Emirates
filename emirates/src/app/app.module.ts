import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './public/home/home.component';
import { SearchFlightsComponent } from './public/search-flights/search-flights.component';
import { FlightResultsComponent } from './public/flight-results/flight-results.component';
import { OffersComponent } from './public/offers/offers.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { ProfileViewComponent } from './customer/profile-view/profile-view.component';
import { ProfileEditComponent } from './customer/profile-edit/profile-edit.component';
import { CartComponent } from './customer/cart/cart.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminFlightsListComponent } from './admin/admin-flights-list/admin-flights-list.component';
import { AdminFlightAddComponent } from './admin/admin-flight-add/admin-flight-add.component';
import { AdminFlightEditComponent } from './admin/admin-flight-edit/admin-flight-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchFlightsComponent,
    FlightResultsComponent,
    OffersComponent,
    LoginComponent,
    RegisterComponent,
    CustomerDashboardComponent,
    ProfileViewComponent,
    ProfileEditComponent,
    CartComponent,
    CheckoutComponent,
    AdminDashboardComponent,
    AdminFlightsListComponent,
    AdminFlightAddComponent,
    AdminFlightEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
