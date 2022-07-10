import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[]=[];

  //subject is a subclass of observable. To publish events in our code. Event will be sent to all subscribers. Needed for total price and total quantity
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //storage: Storage = sessionStorage;
  storage: Storage = localStorage;

  constructor() {
    // read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItems = data;

      // compute totals based on the data that is read from storage
      this.computeCartTotals();
    }
  }

  addToCart(cartItem: CartItem){
    //check if the item is already in cart
    let alreadyExistsInCart: boolean= false;
    let existingCartItem: CartItem | null | undefined;

    if(this.cartItems.length>0){
      //find item in cart by id
      /*for(let item of this.cartItems){
        if(item.id===cartItem.id){
          existingCartItem=item;
          break;
        }
      }*/
      existingCartItem=this.cartItems.find(item => item.id===cartItem.id);
      //check if we found it
      alreadyExistsInCart=(existingCartItem != undefined);//Object.keys(brand).length === 0
    }
    if(alreadyExistsInCart){
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      existingCartItem.quantity++;
    } else{
      this.cartItems.push(cartItem);
    }
    //helper to compute total price and quantity
    this.computeCartTotals();
  }


  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if(cartItem.quantity===0){
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }


  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }


  remove(cartItem: CartItem) {
    //get index of item in array
    const itemIndex = this.cartItems.findIndex(item => item.id===cartItem.id);

    //if found, remove item from array at given index
    if(itemIndex> -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }


  computeCartTotals() {
    let totalPriceValue: number=0;
    let totalQuantityValue: number=0;
    for(let currentCartItem of this.cartItems){
      totalPriceValue+=currentCartItem.quantity*currentCartItem.unitPrice;
      totalQuantityValue+=currentCartItem.quantity;
    }


    //publish/send event - new values to all subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data
    this.logCartData(totalPriceValue, totalQuantityValue);
    this.persistCartItems();
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`Contents of the cart`);
    for(let item of this.cartItems){
      const subtotalPrice=item.quantity*item.unitPrice;
      console.log(`name: ${item.name}, quantity: ${item.quantity}, unitPrice: ${item.unitPrice}, subtotalPrice: ${subtotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity ${totalQuantityValue}`);
    console.log("-------")

  }

}
