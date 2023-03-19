import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { StatisticalComponent } from './components/statistical/statistical.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'statistical', component: StatisticalComponent},
    {
      path: 'type', 
      loadChildren: () => 
        import('./components/type/type.module').then(m => m.TypeModule),
      canLoad: [AuthGuard]
    },
    {
      path: 'wood', 
      loadChildren: () => 
        import('./components/wood/wood.module').then(m => m.WoodModule),
      canLoad: [AuthGuard]
    },
    {
      path: 'product', 
      loadChildren: () => 
        import('./components/product/product.module').then(m => m.ProductModule),
      canLoad: [AuthGuard]
    },
    {
      path: 'user',
      loadChildren: () => 
        import('./components/user/user.module').then(m => m.UserModule),
      canLoad: [AuthGuard]
    },
    {
      path: 'invoice',
      loadChildren: () =>
        import('./components/invoice/invoice.module').then(m => m.InvoiceModule),
      canLoad: [AuthGuard]
    }
  ], canActivateChild: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
