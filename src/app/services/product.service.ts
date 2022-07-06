import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { } //injectable

  //maps json data Spring Data Rest to Product array
  getProductList(): Observable<Product[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response=> response._embedded.products)
    );
  }

}

//unwraps json spring data rest _embedded entry
interface GetResponse{
  _embedded:{
    products: Product[];
  }
}