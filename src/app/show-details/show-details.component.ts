import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import { PropertyListing } from '../core/models/property-listing';
import { PropertyService } from '../core/services/property.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  loading = false;

  serverUrl = 'http://localhost:63899/';

  appForm: FormGroup;

  result = null;

  constructor(private location: Location,
              private actRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
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
      contactOthers: [''],
      annualIncome: [],
      numberOfOccupant: [1],
      withChildren: [false],
      status: [1],
      appStatus: [1],
      creditRating: [''],
      empoyedStatus: [''],
      notificationType: [1],
      reasonToMove: ['']

    });
  }

  onStatusChange(value) {
    this.appForm.get('empoyedStatus').setValue(value);
    // console.log('t', value);
  }

  back() {
    this.location.back();
  }

  showFullsize(event) {
    this.imgIndex = event;
    // console.log('click on image', event);
  }

  submit() {
    // debugger;
    this.loading = true;
    this.appForm.get('rentalPropertyId').setValue(this.listing.rentalProperty.id);
    console.log('form', this.appForm.value);

    this.propertyService.SentRentalApplication(this.appForm.value)
                        .subscribe(res => {
                          this.result = res;
                          // console.log('res', this.result);
                          this.loading = false;
                          this.openSnackBar('Application submitted! Check your email for notification.', '');
                        });


// ******Testing code ******************************
  //   setTimeout (() => {
  //     this.loading = false;
  //     this.openSnackBar('Application submitted!', '');
  //  }, 1000);
// ******Testing code ******************************


    // this.openSnackBar('Application submitted!', '');

    this.appForm.reset();
  }

  clear() {
    this.appForm.reset();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
