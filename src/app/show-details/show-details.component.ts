import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import { PropertyListing } from '../core/models/property-listing';
import { PropertyService } from '../core/services/property.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {

  id: number ;

  listing$: Observable<PropertyListing>;
  listing: any; // PropertyListing;
  imgIndex = 0;

  serverUrl = 'http://localhost:63899/';

  appForm: FormGroup;

  constructor(private location: Location,
              private actRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private propertyService: PropertyService) {
                this.id = this.actRoute.snapshot.params.id;
                console.log(this.id);
              }

  ngOnInit(): void {
    this.listing$ =  this.propertyService.GetListingDetails(this.id);

    this.propertyService.GetListingDetails(this.id)
        .subscribe( list => {
          this.listing = list;
          console.log('listing', this.listing);
        });



    this.appForm = this.formBuilder.group({
      rentalPropertyId: [],
      firstName: [''],
      lastName: [''],
      contactTel: [''],
      contactEmail: [''],
      contactSms: [''],
      annualIncome: [],
      numberOfOccupant: [1],
      withChildren: [false],
      status: [1],
      creditRating: [''],
      empoyedStatus: [''],
      reasonToMove: ['']

    });
  }

  onStatusChange(value) {
    this.appForm.get('empoyedStatus').setValue(value);
    console.log('t', value);
  }

  back() {
    this.location.back();
  }

  showFullsize(event) {
    this.imgIndex = event;
    console.log('click on image', event);
  }

  submit() {
    debugger;
    this.appForm.get('rentalPropertyId').setValue(this.listing.rentalProperty.id);
    console.log('form', this.appForm.value);
  }

}
