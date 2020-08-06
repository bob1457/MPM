import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.aboutForm = this.formBuilder.group({
      name: [''],
      tel: [''],
      email: [''],
      type: [''],
      message: ['']

    });
  }

  onTypeChange(value) {
    this.aboutForm.get('type').setValue(value);
    // console.log('t', value);
  }

  submit() {
    console.log('form', this.aboutForm.value)
  }

  clear() {
    this.aboutForm.reset();
  }

}
