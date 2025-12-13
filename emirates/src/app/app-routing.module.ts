import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

// Importar componentes de Admin
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminFlightsListComponent } from './admin/admin-flights-list/admin-flights-list.component';
import { AdminFlightAddComponent } from './admin/admin-flight-add/admin-flight-add.component';
import { AdminFlightEditComponent } from './admin/admin-flight-edit/admin-flight-edit.component';

// Importar componentes de Customer
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { ProfileViewComponent } from './customer/profile-view/profile-view.component';
import { ProfileEditComponent } from './customer/profile-edit/profile-edit.component';
import { CartComponent } from './customer/cart/cart.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';

const routes: Routes = [
  // Rutas públicas
  {path: 'home', component: HomeComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  // Rutas de Admin (protegidas con AdminGuard)
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminLayoutComponent,
    children: [
      {path: 'dashboard', component: AdminDashboardComponent},
      {path: 'flights', component: AdminFlightsListComponent},
      {path: 'flights/add', component: AdminFlightAddComponent},
      {path: 'flights/edit/:id', component: AdminFlightEditComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },

  // Rutas de Customer (protegidas con AuthGuard)
  {
    path: 'customer',
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: CustomerDashboardComponent},
      {path: 'profile', component: ProfileViewComponent},
      {path: 'profile/edit', component: ProfileEditComponent},
      {path: 'cart', component: CartComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
