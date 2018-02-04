import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class Globals {

  // check login status
  public KEY_LOGIN = 'isLoggedIn';

  // option for api request
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // url of api
  public SERVER = 'http://localhost:3000/';
  public ADMIN_LOGIN = 'admin/';
  public TOPIC = 'topics/';
}
