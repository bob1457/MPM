import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import { PropertyListing } from '../core/models/property-listing';
import { PropertyService } from '../core/services/property.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {

  id: number ;

  listing$: Observable<PropertyListing>;
  listing: PropertyListing;
  imgIndex = 0;

  serverUrl = 'http://localhost:63899/';

  constructor(private location: Location,
              private actRoute: ActivatedRoute,
              private propertyService: PropertyService) {
                this.id = this.actRoute.snapshot.params.id;
                console.log(this.id);
              }

  ngOnInit(): void {
    this.listing$ =  this.propertyService.GetListingDetails(this.id);

    this.propertyService.GetListingDetails(this.id)
        .subscribe( list => this.listing = list);
  }

  back() {
    this.location.back();
  }

  showFullsize(event) {
    this.imgIndex = event;
    console.log('click on image', event);
  }

}
