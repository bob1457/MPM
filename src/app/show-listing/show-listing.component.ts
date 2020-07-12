import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyListing } from '../core/models/property-listing';
import { PropertyService } from '../core/services/property.service';

@Component({
  selector: 'app-show-listing',
  templateUrl: './show-listing.component.html',
  styleUrls: ['./show-listing.component.scss']
})
export class ShowListingComponent implements OnInit {

  listing$: Observable<PropertyListing[]>;
  serverUrl = 'http://localhost:63899/';

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.listing$ = this.propertyService.GetAllListings();
  }

}
