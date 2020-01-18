import { Component } from '@angular/core';
import {Test1Service} from '../app/test1.service';
import { isNullOrUndefined } from 'util';
import { isNil } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jsonResponse:any;
  public searchResults: any[] = [];
  baseurl:string = 'https://asset.lemansnet.com/';
  endurl:string = '.png?x=176&y=176&b=&t=image/png';
  minprice:string = '';
  maxprice:string = '';
  minPriceErrorMsg:string = '';
  maxPriceErrorMsg:string = '';
  isMinPriceInvalid:boolean = false;
  isMaxPriceInvalid:boolean = false;
  constructor(private test1Service: Test1Service) {
  }
 
  ngOnInit() {
    this.searchResults = [];
      this.test1Service.getData()
      .subscribe(res => {        
        this.jsonResponse= res;
        
        if (!isNil(this.jsonResponse.result['hits'])) {
          this.jsonResponse.result['hits'].map(dto => {
          let helmetDto = {
            assetName: '',
            brandName: '',
            minPrice:'',
            maxPrice:'',
            mediaUrl:'',
            finalurl:''
          }
          if (!isNullOrUndefined(dto)) {
            helmetDto.assetName = dto.name;
            helmetDto.brandName = dto.brand.name;
            helmetDto.minPrice = dto.partSummary.priceRanges.retail.start;
            helmetDto.maxPrice = dto.partSummary.priceRanges.retail.end;            
            helmetDto.mediaUrl = dto.media[0].url;
            helmetDto.finalurl = this.baseurl + helmetDto.mediaUrl + this.endurl;
            this.searchResults.push(helmetDto);
          }
                     
          });
      }
      });
    

    this.test1Service.getResponse();
  }   

  applyFilter() {
    this.validateMinPrice();
      this.searchResults = this.searchResults.filter(product =>
        (product.minPrice >= this.minprice
      && product.maxPrice <= this.maxprice));
  }
  validateMinPrice() {

    // const priceregExp = new RegExp("^([0-9]{0,2}((.)[0-9]{0,2}))$");
    const priceregExp = new RegExp("/^-?[\d.]+(?:e-?\d+)?$/");
    if (!priceregExp.test(this.minprice)) {
      this.isMinPriceInvalid = true;
      this.minPriceErrorMsg =  'Please enter valid price';
      return false;
    } else {
      this.isMinPriceInvalid = false
      this.minPriceErrorMsg = '';
      return true;
    }
  }
  validateMaxPrice() {
    const priceregExp = new RegExp("/^-?[\d.]+(?:e-?\d+)?$/");
    if (!priceregExp.test(this.minprice)) {
      this.isMaxPriceInvalid = true;
      this.maxPriceErrorMsg =  'Please enter valid price';
      return false;
    } else {
      this.isMaxPriceInvalid = false
      this.maxPriceErrorMsg = '';
      return true;
    }
  }

}
