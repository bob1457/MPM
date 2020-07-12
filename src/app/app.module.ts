import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from './account/account.module';
import { HttpClientModule } from '@angular/common/http';
import { PropertyComponent } from './property/property.component';
import { ClientServiceComponent } from './client-service/client-service.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ShowListingComponent } from './show-listing/show-listing.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PropertyComponent,
    ClientServiceComponent,
    ShowDetailsComponent,
    ShowListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    AccountModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    // OidcConfigService,
    //     {
    //         provide: APP_INITIALIZER,
    //         useFactory: configureAuth,
    //         deps: [OidcConfigService],
    //         multi: true,
    //     },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
