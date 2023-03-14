import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../services/home.service";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  slidesStore!: any[];

  constructor(private homeservice:HomeService) { }

  ngOnInit(): void {
    this.startSlider();
  }

  ngAfterViewInit(): void {
    this.startSlider();
  }

  advertisementsOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    // navText: ['<', '>'],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 3
      },
      740: {
        items: 2
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  startSlider(){
    this.slidesStore = this.homeservice.getStartDetails().slidesStore
    for(let i = 0;i<this.slidesStore.length;i++) {
      console.log(this.slidesStore[i])
    }
  }

}
