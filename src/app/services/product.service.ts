import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:8080/api/products';
  //private baseUrl='http://localhost:8080/api/products?size=100';

  private categoryUrl='http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { } //injectable

  getProduct(productId: number): Observable<Product> {
    //need to build url based on product id
    const productUrl= `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductListPaginate(page: number, pageSize: number, categoryId: number): Observable<GetResponseProducts>{
    //build url based on category id, page and page size
    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  //maps json data Spring Data Rest to Product array
  getProductList(categoryId: number): Observable<Product[]>{
    //build url based on category id
    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=> response._embedded.productCategory)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    //build url based on keyword
    const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(page: number, pageSize: number, keyword: string): Observable<GetResponseProducts>{
    const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }




}

//unwraps json spring data rest _embedded entry
interface GetResponseProducts{
  _embedded:{
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}
