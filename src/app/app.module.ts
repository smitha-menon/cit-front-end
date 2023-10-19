import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NavbarLayoutComponent } from './core/layouts/navbar-layout.component';
import { HomeLayoutComponent } from './core/layouts/home-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PermissionsService } from './services/permissions.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    NavbarLayoutComponent,
    HomeLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [PermissionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
