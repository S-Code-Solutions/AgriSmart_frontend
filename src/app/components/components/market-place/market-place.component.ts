import { Component, OnInit } from '@angular/core';
import {faMoneyBillWave, faStore} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FinanceDTO} from "../../dto/financeDTO";
import * as Notiflix from "notiflix";
import {MarketplaceService} from "../../services/marketplace.service";
import {MProductDTO} from "../../dto/MProductDTO";
import {MAuctionDTO} from "../../dto/MAuctionDTO";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CRecommendComponent} from "../predict-anly/crop/c-recommend/c-recommend.component";
import {CropDetailsComponent} from "./components/crop-details/crop-details.component";

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
  private allProductsSub!: Subscription;
  productDetails!: any[];

  constructor(private marketplaceService:MarketplaceService,public dialog: MatDialog) { }

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

    this.getAllItems();
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
    this.marketplaceService.saveProduct(new MProductDTO(
      this.productForm.get('product_name')?.value,
      this.productForm.get('category')?.value,
      this.productForm.get('qty')?.value,
      this.productForm.get('stock_price')?.value,
      this.productForm.get('retail_price')?.value,
      this.productForm.get('imageURL')?.value,
      this.productForm.get('expire_date')?.value,
      this.productForm.get('location')?.value,
      this.productForm.get('min_order')?.value,
      this.productForm.get('max_order')?.value,
    )).subscribe(result => {
      console.log("Product Successfully Added")
      console.log(result)
      Notiflix.Notify.success('Product Successfully Added', {
        position: 'center-bottom'
      });
      this.getAllItems();
      // this.getAllFinance()
    }, error => {
      console.log(error)
      Notiflix.Notify.failure("Product Adding Unsuccessful", {
        position: 'center-bottom'
      });
    });
  }

  saveProductAuc() {
    this.marketplaceService.saveProductAuc(new MAuctionDTO(
      this.productForm.get('product_name')?.value,
      this.productForm.get('category')?.value,
      this.productForm.get('imageURL')?.value,
      this.productForm.get('qty')?.value,
      this.productForm.get('expire_dates')?.value,
      this.productForm.get('location')?.value,
      this.productForm.get('starting_price')?.value,
      this.productForm.get('reserve_price')?.value,
      this.productForm.get('auction_duration')?.value,
      this.productForm.get('bid_increment')?.value,
      this.productForm.get('buy_now_price')?.value,
      this.productForm.get('auctioneer_contact')?.value,
    )).subscribe(result => {
      console.log("Product Successfully Added to Auction")
      console.log(result)
      Notiflix.Notify.success('Product Successfully Added to Auction', {
        position: 'center-bottom'
      });
      // this.getAllFinance()
    }, error => {
      console.log(error)
      Notiflix.Notify.failure("Product Adding Auction Unsuccessful", {
        position: 'center-bottom'
      });
    });
  }


  getAllItems(){
    this.allProductsSub = this.marketplaceService.getAllProducts()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        // this.dataSource = result.content;
        this.productDetails = result.content;
      }, error => {
        console.log(error);
      });
  }

  viewProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = "row";
    dialogConfig.width = '40%';
    dialogConfig.height = 'auto';
    // console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(CropDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      // this.refreshTable();
    });
  }
}
