import { Component, OnInit } from '@angular/core';
import {faMoneyBillWave, faStore} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {

  imageUrl!: string;
  fileToUpload: any;
  fileName = 'Select File';
  selectedDate!: Date;
  productForm!: FormGroup;
  protected readonly faMoneyBillWave = faMoneyBillWave;
  protected readonly faStore = faStore;

  auctionForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      product_name: new FormControl('', [
        Validators.required,
      ]),
      category: new FormControl('', [
        Validators.required,
      ]),
      qty: new FormControl('', [
        Validators.required,
      ]),
      stock_price: new FormControl('', [
        Validators.required,
      ]),
      retail_price: new FormControl('', [
        Validators.required,
      ]),
      imageURL: new FormControl('', [
        Validators.required,
      ]),
      expire_date: new FormControl('', [
        Validators.required,
      ]),
      location: new FormControl('', [
        Validators.required,
      ]),
      min_order: new FormControl('', [
        Validators.required,
      ]),
      max_order: new FormControl('', [
        Validators.required,
      ]),
    });

    this.auctionForm = new FormGroup({
      product_name: new FormControl('', [
        Validators.required,
      ]),
      category: new FormControl('', [
        Validators.required,
      ]),
      imageURL: new FormControl('', [
        Validators.required,
      ]),
      qty: new FormControl('', [
        Validators.required,
      ]),
      expire_dates: new FormControl('', [
        Validators.required,
      ]),
      location: new FormControl('', [
        Validators.required,
      ]),
      starting_price: new FormControl('', [
        Validators.required,
      ]),
      reserve_price: new FormControl('', [
        Validators.required,
      ]),
      auction_duration: new FormControl('', [
        Validators.required,
      ]),
      bid_increment: new FormControl('', [
        Validators.required,
      ]),
      buy_now_price: new FormControl('', [
        Validators.required,
      ]),
      auctioneer_contact: new FormControl('', [
        Validators.required,
      ]),
    });
  }



  handleFileInput(file: any) {
    this.fileToUpload = file.files.item(0);
    console.log(file)
    console.log(file.files)
    console.log(file.files.item(0))
    console.log(this.fileToUpload)
    // Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    // this.imageUrl = this.fileToUpload.name;
    console.log(this.imageUrl);
    this.fileName = this.fileToUpload.name;
    console.log(this.fileName)
  }

  myFilter = (d: Date | null | undefined): boolean => {
    const currentDate = new Date();
    return (d ?? currentDate).getTime() >= currentDate.getTime();
  }


  saveProduct() {

  }

  saveProductAuc() {

  }
}
