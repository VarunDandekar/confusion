import { Component, OnInit ,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Comments } from '../shared/comments';
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
  commentForm: FormGroup;
  co:Comments;
  formErrors = {
    'author': '',
    'comment': '',
  };
  validationMessages = {
    'author': {
      'required':      ' Name is required.',
      'minlength':     ' Name must be at least 2 characters long.',
    },
    'comment': {
      'required':      'comment is required.',
    },
  };

  constructor(private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
  private fb:FormBuilder,
  @Inject('BaseURL') private BaseURL) {
    this.createForm();
   }

   createForm(){
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating:'',
      comment:['', [Validators.required]]
    });
   

   this.commentForm.valueChanges.subscribe(data =>this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.co ={date:'',author:'',rating:0,comment:''};
    this.co.date=Date.now().toString();
    this.co.author=this.commentForm.value.author;
    this.co.rating=this.commentForm.value.rating;
    this.co.comment=this.commentForm.value.comment;

    this.dish.comments.push(this.co);
    console.log(this.commentForm);
    this.commentForm.reset({
    name: '',
    rating:0,
    comment:''
    });
  }
    

  ngOnInit() {

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    // let id = + this.route.snapshot.params['id']
    this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id) });
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

}
