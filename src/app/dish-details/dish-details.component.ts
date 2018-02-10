import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import{DishService} from '../services/dish.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit {

  dishIds: number[];
  prev: number;
  next: number;
  dish: Dish;
  constructor( private dishService: DishService,
  private location:Location,
  private route: ActivatedRoute) { }

  ngOnInit() {

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds) ;
   // let id = + this.route.snapshot.params['id']
   this.route.params
   .switchMap((params: Params) => this.dishService.getDish(+params['id']))
   .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id)});
  }

  goBack() :void {
    this.location.back(); 
  }

setPrevNext(dishId : number){
  let index= this.dishIds.indexOf(dishId);
  this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
  this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
}
}
