import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class Globals {
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public SERVER = 'http://localhost:3000/';
  public ADMIN_LOGIN = 'admin/';
  public TOPIC = 'topics/';
}
