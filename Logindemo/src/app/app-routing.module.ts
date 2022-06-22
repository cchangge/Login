import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginAuthGuard } from './auth/login-auth.guard';
import { MainAuthGuard } from './auth/main-auth.guard';
import { ErrComponent } from './err/err.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptorService } from './help/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
const routes: Routes = [
  // {path:'login' ,component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent, canActivate: [LoginAuthGuard] },
  { path: '', component: LoginComponent, canActivate: [MainAuthGuard] },
  { path: 'err', component: ErrComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
