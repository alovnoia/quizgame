import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class Globals {

  // Regex for validate input
  public AVOID_SPACE = '^\\s';
  public AVOID_MULTIPLE_SPACE: string = '^\\S*\\s';

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
  public QUESTION = 'questions/';
  public PACKAGE = 'packages/';
  public CHALLENGE = 'challenges/';
  public GAME = 'games/';

  //photo path
  public PHOTO_DIR = 'assets/img/myImage/';
  public PHOTO_DEFAULT = 'default.png';
}
