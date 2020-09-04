import { Component, OnInit } from '@angular/core';
import { Product } from '../../constants/product';
import { ProductService } from '../../services/Product.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { UUID } from 'angular2-uuid'

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css']
})
export class HomeProductComponent implements OnInit {
  productList: Array<Product>;
  closeResult: string;
  product: Product;
  datePicked;

  listItemType = ["Dapur", "Elektronik", "Fashion", "Buku", "Komputer"]

  constructor(private service: ProductService, private modalService: NgbModal) {
    this.createNew();
  }

  ngOnInit(): void {
    this.getAllItem();
  }

  getAllItem(){
    this.service.getItem().subscribe((item) => {
      this.productList = item;
    })
  }

  createNew(){
    this.product = new Product();
  }

  add(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult  = `Dismissed: ${this.getDismissAddReason(reason)}`;
    });
  }

  private getDismissAddReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason === 'save'){
      // let date: Date = new Date(this.datePicked.year, this.datePicked.month-1, this.datePicked.day);
      this.product.uuid = UUID.UUID();
      this.product.expiredDate = (new Date(this.datePicked)).getTime()/1000;

      this.service.createItem(this.product).subscribe((item) => {
        this.createNew();
        this.getAllItem();
      });
      return `with: ${reason}`;
    } else {
      return  `with: ${reason}`;
    }
  }

  update(content, id){
    this.service.getItemById(id).subscribe((item) => {
      this.product = item;
      let newDate = new Date(this.product.expiredDate*1000);
      const dateObj = { year: newDate.getFullYear(), month: newDate.getMonth()+1, day: newDate.getDay() };
      this.datePicked = dateObj;
    });

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed: ${this.getDismissUpdateReason(reason, id)}`;
    })
  }

  private getDismissUpdateReason(reason: any, id): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason === 'save'){
      this.product.expiredDate = (new Date(this.datePicked)).getTime()/1000;

      this.service.updateItem(this.product).subscribe((item) => {
        this.createNew();
        this.getAllItem();
      });
      return `with: ${reason}`;
    } else {
      return  `with: ${reason}`;
    }
  }

  delete(content, id){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed: ${this.getDismissDeleteReason(reason, id)}`;
    })
  }

  private getDismissDeleteReason(reason: any, id): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason === 'delete'){
      this.service.deleteItem(id).subscribe((item) => {
        this.getAllItem();
      })
      return `with: ${reason}`;
    } else if (reason === 'dont-delete'){
      return `by clicking no`;
    } else {
      return  `with: ${reason}`;
    }
  }
}
