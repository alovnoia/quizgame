import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  LOG_TAG: string = 'PlayComponent';

  gameData: any;
  // time start game
  startTime: number;
  // time to play
  countTime: number;
  timeInterval: any;
  // data of current question
  currentQuestion: any;
  // index of current question
  currentIndex: number;
  // result of player
  result: any;
  GAME_TYPE = {
    CHALLENGE: 'challenge',
    NORMAL: 'normal'
  };

  constructor(private gameService: GameService, private router: Router) {
    this.startTime = Date.now();
    this.currentIndex = 0;
    this.result = {
      points: 0,
      time: 0
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    // get result sent from setting
    this.gameService.currentGameData.subscribe(data => {
      this.gameData = data;
      // get 1st question to display
      this.getCurrentQuestion(this.currentIndex);
      //console.log(this.currentQuestion);
    });
    console.log(this.gameData);
    this.startCountTime();
  }

  ngOnDestroy() {
    clearInterval(this.timeInterval);
  }

  /**
   * get question to display
   * @param {number} index
   */
  getCurrentQuestion(index: number): void {
    console.log(this.LOG_TAG, 'getCurrentQuestion');
    // check if current question is not last question
    console.log(this.LOG_TAG, index);
    console.log(this.LOG_TAG, this.gameData.package.questions.length);
    if (index < this.gameData.package.questions.length) {
      this.currentQuestion = {
        content: this.gameData.package.questions[index].content,
        image: this.gameData.package.questions[index].image,
        answers: this.gameData.package.questions[index].answers,
      };
    } else {
      this.gameOver();
    }
  }

  /**
   *  save game result
   */
  gameOver(): void {
    console.log(this.LOG_TAG, 'gameOver');
    clearInterval(this.timeInterval);
    this.result.time = this.countTime;
    if (this.gameData.gameType === this.GAME_TYPE.CHALLENGE) {
      this.gameData.result = {
        player1: this.result,
        player2: {}
      }
    } else if (this.gameData.gameType === this.GAME_TYPE.NORMAL) {
      this.gameData.result.player2 = this.result;
      let pointDifference = this.gameData.result.player1.points - this.gameData.result.player2.points;
      let winner = '';
      if (pointDifference > 0) {
        // p1 win
        winner = this.gameData.idUser1;
      } else if (pointDifference < 0) {
        // p2 win
        winner = this.gameData.idUser2;
      } else {
        // current time unit is ms so divide 1000 to get second
        let timeDifference = Math.floor(this.gameData.result.player1.time/1000) - Math.floor(this.gameData.result.player2.time/1000);
        if (timeDifference < 0) {
          // p1 win
          winner = this.gameData.idUser1;
        } else if (timeDifference > 0) {
          // p2 win
          winner = this.gameData.idUser2;
        }
      }
      this.gameData.result.winner = winner;
    }
    this.gameService.setGameResult(this.gameData);
    this.router.navigateByUrl('game/result');
  }

  /**
   * start count time game
   */
  startCountTime(): void {
    console.log(this.LOG_TAG, 'startCountTime');
    this.timeInterval = setInterval(() => {
      this.countTime = Date.now() - this.startTime;
    }, 1000);
  }

  /**
   * save user answer and continue game
   * @param a
   */
  onChooseAnswer(a: any): void {
    console.log(this.LOG_TAG, 'onChooseAnswer');
    let userResult = false;
    if (a.correct) {
      this.result.points += 1;
      userResult = true;
    }
    if (this.gameData.gameType === this.GAME_TYPE.CHALLENGE) {
      this.gameData.package.questions[this.currentIndex].player1 = {
        choose: a.content,
        result: userResult
      };
    } else if (this.gameData.gameType === this.GAME_TYPE.NORMAL) {
      this.gameData.package.questions[this.currentIndex].player2 = {
        choose: a.content,
        result: userResult
      };
    }
    this.currentIndex += 1;
    this.getCurrentQuestion(this.currentIndex);
    window.scrollTo(0, 0);
  }
}
