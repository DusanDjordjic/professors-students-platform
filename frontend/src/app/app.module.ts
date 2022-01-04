import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthModule } from './auth/auth.module';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { SidebarService } from './core/sidebar/sidebar.service';
import { HomeComponent } from './static-pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AuthModule, HttpClientModule],
  providers: [SidebarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
