import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements OnInit {

  playerResult: any;
  playerAnswer: any;
  GAME_TYPE = {
    CHALLENGE: 'challenge',
    NORMAL: 'normal'
  };

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.sentResult.subscribe(res => {
      this.playerAnswer = res;
      if (res.gameType === this.GAME_TYPE.CHALLENGE) {
        this.playerResult = res.result.player1;
      } else if (res.gameType === this.GAME_TYPE.NORMAL) {
        this.playerResult = res.result.player2;
      }
      console.log(this.playerResult);
    });
    if (this.playerAnswer.package.questions.length > 0) {
      if (this.playerAnswer.gameType === this.GAME_TYPE.CHALLENGE) {
        this.gameService.updateChallenge(this.playerAnswer).subscribe();
      } else if (this.playerAnswer.gameType === this.GAME_TYPE.NORMAL) {
        this.gameService.createGame(this.playerAnswer).subscribe();
      }
    }
  }

}
