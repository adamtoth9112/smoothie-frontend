import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login.component';
import { HttpInterceptorService } from './http-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmoothieListComponent } from './smoothie-list/smoothie-list.component';
import { SmoothieItemComponent } from './smoothie-list/smoothie-item/smoothie-item.component';
import { SmoothiesComponent } from './smoothies/smoothies.component';
import { SmoothieDetailComponent } from './smoothie-detail/smoothie-detail.component';
import { SmoothieEditComponent } from './smoothie-edit/smoothie-edit.component';
import { SmoothieStartComponent } from './smoothie-start/smoothie-start.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    SmoothieListComponent,
    SmoothieItemComponent,
    SmoothiesComponent,
    SmoothieDetailComponent,
    SmoothieEditComponent,
    SmoothieStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
