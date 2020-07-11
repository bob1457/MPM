import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClientServiceComponent } from './client-service/client-service.component';
import { PropertyComponent } from './property/property.component';
import { ShowDetailsComponent } from './show-details/show-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'properties', component: PropertyComponent},
  { path: 'services', component: ClientServiceComponent},
  { path: 'details/:id', component: ShowDetailsComponent},
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
