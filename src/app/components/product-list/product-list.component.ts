import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //pagination properties
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  //paginationSelect = [5, 10, 20, 50]

  previousKeyword: string = "";

  //inject our ProductService dependency
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    //if different keyword than previous set pageNumber to 1
    if(this.previousKeyword!=keyword){
      this.pageNumber=1;
    }

    this.previousKeyword=keyword;
    console.log(`keyword=${keyword}, pageNumber=${this.pageNumber}`);

    this.productService.searchProductsPaginate(this.pageNumber-1, this.pageSize, keyword).subscribe(this.processResult());

  }

  handleListProducts(){
    //check if id parameter is available
    const hasCategoryId: boolean= this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else{
      //not category available -> default category
      this.currentCategoryId=1;
    }

    //check if categoryId != from previous categoryId
    //Angular by itself will reuse a component if its currently being viewed
    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber= 1;
    }

    this.previousCategoryId= this.currentCategoryId;
    console.log(`currentCatgoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    //get the products for the given category id
    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId)
                        .subscribe(this.processResult());

  }

  processResult(){
    return (data: any) =>{
      this.products = data._embedded.products;
      this.pageNumber = data.page.number+1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number){
    this.pageSize=pageSize;
    this.pageNumber=1;
    this.listProducts();
  }

  addToCart(product: Product){
    //console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);
    const cartItem= new CartItem(product);
    this.cartService.addToCart(cartItem);

  }

}
