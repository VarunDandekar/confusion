import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import{ProcessHttpmsgService} from './process-httpmsg.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DishService {

  constructor( //private http:Http,
    private restangular:Restangular,
  private processHttpmsgService:ProcessHttpmsgService ) { }

  getDishes(): Observable<Dish[]> {
  /*  return this.http.get(baseURL+'dishes')
    .map(res => { return this.processHttpmsgService.extractData(res)})
    .catch(error => { return this.processHttpmsgService.handleError(error); }); */

    //return Observable.of(DISHES).delay(2000).toPromise();

    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
   // return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);

  /*  return this.http.get(baseURL+'dishes/' + id)
   .map(res => { return this.processHttpmsgService.extractData(res)})
   .catch(error => { return this.processHttpmsgService.handleError(error); }); */
   return  this.restangular.one('dishes',id).get(); 
  }

  getFeaturedDish(): Observable<Dish> {
   // return Promise.resolve(DISHES.filter((dish) => (dish.featured))[0]);

 /*   return this.http.get(baseURL+'dishes?featured=true')
   .map(res => { return this.processHttpmsgService.extractData(res)[0]})
   .catch(error => { return this.processHttpmsgService.handleError(error); }); */
   return this.restangular.all('dishes').getList({featured: true})
   .map(dishes => dishes[0]);
  }

  getDishIds(): Observable<number[]> {
    //return Observable.of(DISHES.map(dish => dish.id)).delay(2000);
    return this.getDishes().map(dishes => {return dishes.map(dish => dish.id)});

  }

}
