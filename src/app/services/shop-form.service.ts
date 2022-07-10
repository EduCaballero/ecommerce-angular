import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(countryCode: string): Observable<State[]> {
    const searchStatesUrl=`${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }


  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number[] = [];
    for(let month = startMonth; month<=12;month++){
      data.push(month);
    }
    return of(data);//of wrap an object as an Observable. Use rxjs, needs to be imported
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    //const endyear: number = startYear+10;//next ten years
    for(let year = startYear; year <= startYear+10; year++){
      data.push(year);
    }
    return of(data);//of wrap an object as an Observable. Use rxjs, needs to be imported
  }

}

interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}
