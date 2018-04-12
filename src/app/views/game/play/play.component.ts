import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  gameData: any;
  startTime: number;
  countTime: number;
  timeInterval: any;
  currentQuestion: any;
  currentIndex: number;
  result: any;

  constructor(private gameService: GameService) {
    this.startTime = Date.now();
    this.currentIndex = 0;
    this.result = {
      points: 0,
      time: 0
    }
  }

  ngOnInit() {
    this.gameService.currentGameData.subscribe(data => {
      this.gameData = data;
      this.getCurrentQuestion(this.currentIndex);
      console.log(this.currentQuestion);
    });
    console.log(this.gameData);
    this.startCountTime();
  }

  ngOnDestroy() {
    clearInterval(this.timeInterval);
  }

  getCurrentQuestion(index: number): void {
    if (index < this.gameData.package.questions.length) {
      this.currentQuestion = {
        content: this.gameData.package.questions[index].content,
        image: this.gameData.package.questions[index].image,
        answers: this.gameData.package.questions[index].answers,
      };
    } else {
      clearInterval(this.timeInterval);
    }
  }

  startCountTime(): void {
    this.timeInterval = setInterval(() => {
      this.countTime = Date.now() - this.startTime;
    }, 1000);
  }

  onChooseAnswer(a: any): void {
    if (a.correct) {
      this.result.points += 1;
    } else {

    }
    this.currentIndex += 1;
    this.getCurrentQuestion(this.currentIndex);
    window.scrollTo(0, 0);
  }
}
