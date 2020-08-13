import { Component, OnInit, Inject } from '@angular/core';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import { PropertyListing } from '../core/models/property-listing';
import { PropertyService } from '../core/services/property.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  name: string;
}
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
  openHouse: any[];
  showRegister = false;

  serverUrl = 'http://localhost:63899/';

  appForm: FormGroup;
  regForm: FormGroup;

  result = null;

  constructor(private location: Location,
              private actRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactTel: ['',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      contactEmail: ['',
        [
          Validators.required,
          // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
          Validators.email
        ]
      ],
      contactSms: [''],
      contactOthers: [''],
      annualIncome: [Validators.required],
      numberOfOccupant: [1],
      withChildren: [false],
      status: [1],
      appStatus: [1],
      creditRating: ['', Validators.required],
      empoyedStatus: ['', Validators.required],
      notificationType: [1],
      reasonToMove: ['']

    });

    this.regForm = this.formBuilder.group({
      openHouseId: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactTel: ['',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      contactEmail: ['',
        [
          Validators.required,
          // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
          Validators.email
        ]
      ],
      contactSms: [''],
      contactOthers: [''],
      contactType: [],
      numberOfOccupant: [],
      notificationType: [1]
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
                          this.openSnackBar('Application submitted! Check your email or text for notification.', '');
                        });


// ******Testing code ******************************
  //   setTimeout (() => {
  //     this.loading = false;
  //     this.openSnackBar('Application submitted!', '');
  //  }, 1000);
// ******Testing code ******************************


    // this.openSnackBar('Application submitted!', '');

    this.appForm.reset();
    this.appForm.get('rentalPropertyId').setValue(this.listing.rentalProperty.id);
    this.appForm.get('appStatus').setValue(1);
    this.appForm.get('notificationType').setValue(1);
  }

  register() {
    this.showRegister = !this.showRegister;
  }

  Register() {
    this.regForm.get('openHouseId').setValue(this.listing.rentalProperty.openHouse[0].id);
    console.log('regform', this.regForm.value);
  }

  clear() {
    this.appForm.reset();
    this.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}

