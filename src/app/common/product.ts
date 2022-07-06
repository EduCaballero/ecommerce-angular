export class Product {

  sku!: string;
  name!: string;
  description!: string;
  unitPrice!: number;
  imageUrl!: string;
  active!: boolean;
  unitsInStock!: number;
  dataCreated!: Date;
  lastUpdated!: Date;

  /*constructor(sku: string,
    name: string,
    description: string,
    unitPrice: number,
    imageUrl: string,
    active: boolean,
    unitsInStock: number,
    dataCreated: Date,
    lastUpdated: Date){
  }

  get name():string {
    return this.name
  }

  set name(name:string) {
    this.name=name
  }

  get unitPrice():number {
    return this.unitPrice
  }

  set unitPrice(unitPrice:number) {
    this.unitPrice=unitPrice
  }*/

}
