import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public slides = [
    {
      src: '../../../assets/slider/slider0.jpg',
      title: 'Spring Fashion Extravaganza',
      subtitle: 'Get Ready for the Season\'s Hottest Styles',
    },
    {
      src: '../../../assets/slider/slider1.jpg',
      title: 'Exclusive Discounts Inside',
      subtitle: 'Shop Now for Unbeatable Savings',
    },
    {
      src: '../../../assets/slider/slider2.jpg',
      title: 'Elevate Your Style',
      subtitle: 'Discover Premium Fashion Choices',
    },
    {
      src: '../../../assets/slider/slider3.jpg',
      title: 'New Arrivals Every Week',
      subtitle: 'Stay Ahead of the Fashion Curve',
    },
  ];
  

  
}
