import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClientServiceComponent } from './client-service/client-service.component';
import { PropertyComponent } from './property/property.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ShowListingComponent } from './show-listing/show-listing.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'properties', component: PropertyComponent,
    children: [
      { path: '', component: ShowListingComponent},
      { path: 'details/:id', component: ShowDetailsComponent}
    ]
  },
  { path: 'services', component: ClientServiceComponent},
  // { path: 'details/:id', component: ShowDetailsComponent},
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
