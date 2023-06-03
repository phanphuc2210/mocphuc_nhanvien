import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { StatisticalComponent } from './components/statistical/statistical.component';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CommentStatisticalComponent } from './components/comment-statistical/comment-statistical.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'statistical', component: StatisticalComponent},
    { path: 'comment', component: CommentStatisticalComponent},
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
      path: 'slider', 
      loadChildren: () => 
        import('./components/slider/slider.module').then(m => m.SliderModule),
      canLoad: [AuthGuard]
    },
    {
      path: 'product', 
      loadChildren: () => 
        import('./components/product/product.module').then(m => m.ProductModule),
      canLoad: [AuthGuard]
    },
    {
      path: 'voucher', 
      loadChildren: () => 
        import('./components/voucher/voucher.module').then(m => m.VoucherModule),
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
  // {path: 'signup', component: SignupComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
