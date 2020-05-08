import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    banner = [
      'home-banner.jpg',
      'home-banner1.jpg',
      'home-banner2.jpg',
      'home-banner3.jpg',
      'home-banner4.jpg',
      'home-banner5.jpg',
      'home-banner6.jpg'
    ];

  bgImg = '';
  imgPath = '';

  constructor() { }

  ngOnInit(): void {

    this.bgImg =  this.banner[Math.floor(Math.random() * this.banner.length)];

    this.imgPath = '../../assets/images/' + this.bgImg;

    console.log(this.imgPath);


  }

}
