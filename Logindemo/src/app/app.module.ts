import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import{FormsModule} from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrComponent } from './err/err.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './help/auth-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    ErrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
