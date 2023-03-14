import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  getStartDetails(){
    return ({
      slidesStore: [
        {
          id: "1",
          src: 'https://i.ibb.co/ScLxDGL/home-cover-01-v2-01-01-01-01.jpg',
          alt: 'Image_1',
          title: 'Image_1'
        },
        {
          id: "2",
          src: 'https://i.ibb.co/ScLxDGL/home-cover-01-v2-01-01-01-01.jpg',
          alt: 'Image_2',
          title: 'Image_3'
        },
        {
          id: "3",
          src: 'https://i.ibb.co/ScLxDGL/home-cover-01-v2-01-01-01-01.jpg',
          alt: 'Image_3',
          title: 'Image_3'
        },
        {
          id: "4",
          src: 'https://i.ibb.co/ScLxDGL/home-cover-01-v2-01-01-01-01.jpg',
          alt: 'Image_4',
          title: 'Image_4'

        }
      ]
    })

  }
}
