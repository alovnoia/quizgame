import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements OnInit {

  LOG_TAG: string = 'GameResultComponent';
  playerResult: any;
  playerAnswer: any;
  saveData: any;
  GAME_TYPE = {
    CHALLENGE: 'challenge',
    NORMAL: 'normal'
  };

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.playerAnswer = this.gameService.getGameResult();
    this.saveData = this.gameService.getGameResult();
    if (this.playerAnswer.gameType === this.GAME_TYPE.CHALLENGE) {
      this.playerResult = this.playerAnswer.result.player1;
    } else if (this.playerAnswer.gameType === this.GAME_TYPE.NORMAL) {
      this.playerResult = this.playerAnswer.result.player2;
    }
    //console.log(this.gameService.getGameResult());
    if (this.playerAnswer.package.questions.length > 0) {
      if (this.playerAnswer.gameType === this.GAME_TYPE.CHALLENGE) {
        console.log(this.playerAnswer);
        this.gameService.saveChallenge(this.playerAnswer).subscribe();
      } else if (this.playerAnswer.gameType === this.GAME_TYPE.NORMAL) {
        this.gameService.createGame(this.saveData).subscribe();
      }
    }
  }

  ngOnDestroy() {
    console.log(this.LOG_TAG, 'ngOnDestroy');
    this.gameService.setGameResult(undefined);
  }

}
