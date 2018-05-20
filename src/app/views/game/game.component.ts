import {Component, ElementRef, OnInit} from '@angular/core';
import {QuestionService} from '../question/question.service';
import {TopicService} from '../topic/topic.service';
import {PackageService} from '../package/package.service';
import {Globals} from '../../app.constants';
import {Topic} from '../topic/topic-model';
import {GameService} from './game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  LOG_TAG: string = 'GameComponent';
  // define game setting
  GAME_TYPE = {
    CHALLENGE: 'challenge',
    NORMAL: 'normal'
  };
  GAME_LEVEL = {
    HARD: 'hard',
    MEDIUM: 'medium',
    EASY: 'easy',
  };
  topics: Topic[];
  selectedTopicItem: Topic;
  selectedGameTypeItem: string;
  selectedLevel: string;
  // use for UI
  isStartGame: boolean;
  gameData: any;

  constructor(
    private packageService: PackageService,
    private questionService: QuestionService,
    private topicService: TopicService,
    private gameService: GameService,
    private globals: Globals,
    private elRef:ElementRef,
    private router: Router) {
    this.topics = [];
    this.selectedGameTypeItem = '';
    this.isStartGame = false;
  }

  ngOnInit() {
    this.getTopics();
  }

  /**
   * get topic from db via service
   */
  getTopics(): void {
    console.log(this.LOG_TAG + ' getTopics');
    this.topicService.getTopics().subscribe( topics => {
      for (let i = topics.length - 1; i >= 0; i--) {
        this.topics.push(new Topic(topics[i]._id, topics[i].name, topics[i].desc, topics[i].status));
      }
    });
  }

  chooseTopic(e: any, topic: Topic): void {
    console.log(topic._id);
    this.selectedTopicItem = topic;
  }

  chooseGameType(e: any, type: string): void {
    this.selectedGameTypeItem = type;
  }

  chooseLevel(e: any, level: string): void {
    this.selectedLevel = level;
  }

  /**
   * get and save game data after setting game
   */
  startGame(): void {
    console.log(this.LOG_TAG + ' startGame');
    this.isStartGame = true;
    let obj = {
      idUser1: 'dttung195@gmail.com',
      level: this.selectedLevel,
      topic: this.selectedTopicItem
    };
    if (this.selectedGameTypeItem == this.GAME_TYPE.CHALLENGE) {
      //get game data
      this.gameService.createChallenge(obj).subscribe(result =>{
        this.gameData = result;
        this.gameData.gameType = this.GAME_TYPE.CHALLENGE;
        // save game data
        this.gameService.setGameData(result);
        this.router.navigateByUrl('game/play');
      });
    } else if (this.selectedGameTypeItem == this.GAME_TYPE.NORMAL) {
      this.gameService.findGame(obj).subscribe(result => {
        this.gameData = result;
        this.gameData.gameType = this.GAME_TYPE.NORMAL;
        // save game data
        this.gameService.setGameData(result);
        this.router.navigateByUrl('game/play');
      });
    }
  }
}
