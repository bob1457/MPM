import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyService } from '../core/services/property.service';
import { PropertyListing } from '../core/models/property-listing';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  listing = [
    { id: '1', title: 'Card Title', img: 'http://placehold.it/500x325', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {  id: '2', title: 'Card Title', img: 'http://placehold.it/500x325', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {  id: '3', title: 'Card Title', img: 'http://placehold.it/500x325', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {  id: '4', title: 'Card Title', img: 'http://placehold.it/500x325', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {  id: '5', title: 'Card Title', img: 'http://placehold.it/500x325', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
    {  id: '6', title: 'Card Title', img: 'http://placehold.it/500x325', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
  ];

  listing$: Observable<PropertyListing[]>;
  serverUrl: 'http://localhost:63899/';

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {

    this.listing$ = this.propertyService.GetAllListings();

  }

}
