import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import { Resolve } from '@angular/router/src/interfaces';

@Injectable()
export class ProcessHttpmsgService {

  constructor() { }

  public extractData(res: Response) {
    console.log('herek');
    let body = res.json();
    return body || {};
  }

  public handleError(error: Response | any) {
    console.log('here');
    let errMsg: string;
    if (error instanceof Response) {
     const body= error.json() || '';
     const err =  body.error || JSON.stringify(body);
     errMsg =`${error.status}-${error.statusText || ''}-${err}`;
    } else {
     errMsg =  error.message? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }
}
