import { Component, OnInit, Inject } from '@angular/core';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import { PropertyListing } from '../core/models/property-listing';
import { PropertyService } from '../core/services/property.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  withChildren = false;
  applicantNumber = 1;

  serverUrl = 'http://localhost:63899/';

  appForm: FormGroup;
  regForm: FormGroup;

  result = null;

  employerType;

  constructor(private location: Location,
              private actRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private propertyService: PropertyService) {
                this.id = this.actRoute.snapshot.params.id;
                console.log(this.id);
              }

  ngOnInit(): void{
    this.listing$ =  this.propertyService.GetListingDetails(this.id);

    this.propertyService.GetListingDetails(this.id)
        .subscribe( list => {
          this.listing = list;
          console.log('listing', this.listing);
        });


    this.appForm = this.formBuilder.group({

      coApplicants: this.formBuilder.array([]),
      previousAddress: this.formBuilder.array([]),
      applicantChildren: this.formBuilder.array([]),
      rentalReference: this.formBuilder.array([]),

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
      annualIncome: ['', Validators.required],
      numberOfOccupant: [1],
      numberOfVehicles: [0],
      withChildren: [false],
      status: [1],
      appStatus: [1],
      creditRating: ['', Validators.required],
      creditSource: [''],
      empoyedStatus: ['', Validators.required],
      notificationType: [1],
      reasonToMove: [''],

// Workaround for getting rid of error when getting fields from form array, need to figure out later
      gender: [''],
      type: [null]
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
      // contactType: [],
      numberOfPeople: [1],
      contactType: [1]
    });
  }

  coApplicants(): FormArray {
    return this.appForm.get('coApplicants') as FormArray;
  }

  previousAddress(): FormArray {
    return this.appForm.get('previousAddress') as FormArray;
  }

  applicantChildren(): FormArray{
    return this.appForm.get('applicantChildren') as FormArray;
  }

  rentalReference(): FormArray{
    return this.appForm.get('rentalReference') as FormArray;
  }

  newApplicant(): FormGroup {
    return this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      contactTel: [''],
      contactSms: [''],
      contactEmail: [''],
      contactOthers: [''],
      status: [''],
      creditRating: [''],
      empoyedStatus: [''],
      reasonToMove: [''],
      annualIncome: ['']
    });
  }

  newReference(): FormGroup {
    return this.formBuilder.group({
      contactName: [''],
      contactTel: [''],
      contactEmail: [''],
      type: Number([null]),
      contactEntityName: [''],
      notes: ['']
    });
  }

  newAddress(): FormGroup {
    return this.formBuilder.group({
      streetNumber: [''],
      city: [''],
      provinceState: [''],
      postZipCode: [''],
      country: [''],
      lengthOfLiving: Number([0]),
      rentAmount: [0.0],
      isCurrent: [false],
      isRented: [true]
    });
  }

  newChild(): FormGroup {
    return this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      gender: [''],
      age: ['']
    });
  }

  addApplicant() {
    this.coApplicants().push(this.newApplicant());
  }

  addChild() {
    this.applicantChildren().push(this.newChild());
  }

  addReference() {
    this.rentalReference().push(this.newReference());
  }

  addAddress() {
    this.previousAddress().push(this.newAddress());
  }

  removeAddress(addressIndex: number) {
    this.previousAddress().removeAt(addressIndex);
  }

  removeApplicant(applicantIndex: number) {
    this.coApplicants().removeAt(applicantIndex);
  }

  removeChild(childIndex: number) {
    this.applicantChildren().removeAt(childIndex);
  }

  removeRefernence(refIndex: number) {
    this.rentalReference().removeAt(refIndex);
  }


  onStatusChange(value) {
    this.appForm.get('status').setValue(value);
    // console.log('t', value);
  }

  onEmpChange(value) {
    this.appForm.get('empoyedStatus').setValue(value);
  }

  onContactChange(value) {
    this.appForm.get('type').setValue(+value);
    // if (value == ='Employer') {
    //   this.employerType = true;
    //   } else {
    //     this.employerType = false;
    //   }
    console.log('type', value);
    if (value === 3) {
      this.employerType = true;
    } else {
      this.employerType = false;
    }
    console.log('emp ', this.employerType);
  }

  onGenderChange(value) {
    this.appForm.get('gender').setValue(value);
  }

  onCreditSourceChange(value) {
    console.log('credit provider', value);
    this.appForm.get('creditSource').setValue(value);
  }

  back() {
    this.location.back();
  }

  showFullsize(event) {
    this.imgIndex = event;
    // console.log('click on image', event);
  }

  submit() {
    debugger;
    this.loading = true;
    this.appForm.get('rentalPropertyId').setValue(this.listing.rentalProperty.id);
    console.log('form', this.appForm.value);

    // this.propertyService.SentRentalApplication(this.appForm.value) // For testing
    //                     .subscribe(res => {
    //                       this.result = res;
    //                       // console.log('res', this.result);
    //                       this.loading = false;
    //                       this.openSnackBar('Application submitted! Check your email or text for confirmation.', 'close');
    //                     });


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
    // this.appForm.get('numberOfPeople').setValue(1);
    this.removeAll();
  }

  register() {
    this.showRegister = !this.showRegister;
  }

  Register() {
    debugger;
    this.loading = true;
    this.regForm.get('openHouseId').setValue(this.listing.rentalProperty.openHouse[0].id);
    console.log('regform', this.regForm.value);
    this.propertyService.addOpenHouseViewer(this.regForm.value)
                        .subscribe( res => {
                          this.result = res;
                          // console.log('res', this.result);
                          this.loading = false;
                          this.openSnackBar('You have registered for the open house Check your email or text for confirmation.', '');
                        });

    this.regForm.reset();
    this.regForm.get('contactType').setValue(1);

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

  onChildrenChange(event) {
    console.log('children', event.checked);
    this.withChildren = event.checked;
  }



  onOccupantChange(value) {
    console.log('peopele', value);
    this.applicantNumber = value;
    if (value > 1) {
      this.appForm.get('')
    }
  }

  removeAll() {
    const item = document.querySelector('#applicants');
    console.log('item', item);
    // item.innerHTML = '';
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }

    const item2 = document.querySelector('#children');
    console.log('item', item2);
    // item.innerHTML = '';
    while (item2.firstChild) {
      item2.removeChild(item2.firstChild);
    }

    const item3 = document.querySelector('#references');
    console.log('item', item3);
    // item.innerHTML = '';
    while (item3.firstChild) {
      item3.removeChild(item3.firstChild);
    }

  }
}



