import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Topic} from '../topic/topic-model';
import {Globals} from '../../app.constants';
import {TopicService} from '../topic/topic.service';
import {Package} from './package-model';
import {QuestionService} from '../question/question.service';
import {CreatePackageComponent} from './action/create-package/create-package.component';
import {RenderTopicComponent} from './renderTableRow/render-topic.component';
import {NgForm} from '@angular/forms';
import {PackageService} from './package.service';
import {DetailsPackageComponent} from './action/details-package/details-package.component';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  LOG_TAG: string = 'PackageComponent ';
  settings = {
    attr: {
      class: 'table'
    },
    mode: 'external', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    actions: {
      columnTitle: '',
      add: true,
      edit: true,
      delete: true,
      custom: [],
      position: 'left', // left|right
    },
    columns: {
      code: {
        title: 'Code',
        type: 'html'
      },
      level: {
        title: 'Level',
        type: 'html'
      },
      topic: {
        title: 'Topic',
        type: 'custom',
        renderComponent: RenderTopicComponent
      },
      usage: {
        title: 'Usage',
        type: 'html'
      }
    },
    add: {
      inputClass: '',
      addButtonContent: '<i class="icon-plus btn btn-success btn-sm"> Add</i>',
      createButtonContent: 'Save',
      cancelButtonContent: 'Cancel',
      confirmCreate: false,
    },
    edit: {
      inputClass: '',
      editButtonContent: '<i class="icon-info btn btn-primary btn-sm"></i>',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: false,
    },
    delete: {
      deleteButtonContent: '<i class="icon-trash btn btn-danger btn-sm"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'Empty data',
    pager: {
      display: true,
      perPage: 10,
    }
  };
  // hide search view
  isHidden: boolean;
  // hide search content
  isVisuallyHidden: boolean;
  // show search content
  isShow: boolean;
  source: LocalDataSource;
  topics: Topic[];
  packages: Package[];
  // reference to CreatePackageComponent to use child resource
  @ViewChild(CreatePackageComponent) createPackageCmp: CreatePackageComponent;
  @ViewChild(DetailsPackageComponent) detailsPackageCmp: DetailsPackageComponent;
  @ViewChild('tablePackages') tablePackages: any;

  constructor(private packageService: PackageService, private questionService: QuestionService, private topicService: TopicService, private globals: Globals) {
    this.topics = [];
    this.source = new LocalDataSource(this.packages);
    this.isHidden = false;
    this.isVisuallyHidden = false;
    this.isShow = true;
  }

  ngOnInit() {
    console.log(this.LOG_TAG + ' OnInit');
    this.getTopics();
    //console.log(this.topics);
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

  /**
   * click event of search area
   * @param event
   */
  onClickAdvanceSearch(event: any): void {
    console.log(this.LOG_TAG + ' onClickAdvanceSearch');
    if (this.isHidden) {
      event.target.innerText = 'Small';
      this.isVisuallyHidden = false;
      setTimeout( () =>  {
        this.isShow = true;
        this.isHidden = false;
      }, 50);
    } else {
      event.target.innerText = 'Expand';
      this.isShow = false;
      this.isHidden = true;
      setTimeout( () =>  {
        this.isVisuallyHidden = true;
      }, 150);
    }
  }

  onSubmitSearch(e: any, searchForm: NgForm): void {
    console.log(this.LOG_TAG + ' onSubmitSearch');
    e.preventDefault();
    console.log(searchForm);
    let formResult = searchForm.value;
    let checkFormValid = this.checkFormSearchValid(formResult.code, formResult.level, formResult.questionCode,
                                                   formResult.topic, formResult.usage, formResult.usageCondition);

    if (checkFormValid) {
      let queryObj = {
        "level": formResult.level.trim(),
        "topic": formResult.topic.trim(),
        "questionCode": formResult.questionCode.trim(),
        "code": formResult.code.trim(),
        "usage": formResult.usage ? formResult.usage : -1,
        "usageCondition": formResult.usageCondition,
      };
      console.log('123', queryObj);
      this.packageService.getPackages(queryObj).subscribe(packages => {
        this.packages = packages;
        this.source.load(this.packages);
        this.tablePackages.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      alert('Please input something!');
    }
  }

  checkFormSearchValid(code, level, questionCode, topic, usage, usageCondition): boolean {
    let inputIsNotNull = false;
    for (let i = 0; i <= arguments.length; i++) {
      if (arguments[i]) {
        if (arguments[i]) {
          inputIsNotNull = true;
          break;
        }
      }
    }
    if ((usage && !usageCondition) || (!usage && usageCondition)) {
      inputIsNotNull = false;
    }
    return inputIsNotNull;
  }

  onDeletePackage(e): void {
    console.log(this.LOG_TAG + ' onDeletePackage');
    //console.log(e.index);
    if (window.confirm('Are you sure?')) {
      this.packageService.deletePackage(e.data._id).subscribe();
      this.packages.splice(e.index, 1);
      this.source.load(this.packages);
    } else {

    }
  }

  onCreatePackage(e): void {
    console.log(this.LOG_TAG + ' onCreatePackage');
    this.createPackageCmp.onOpenModal(e);
  }

  onDetailsPackage(e): void {
    console.log(this.LOG_TAG + ' onDetailsPackage');
    this.detailsPackageCmp.onOpenModal(e);
  }

  updateTable(e): void {
    //console.log(e);
    this.packages = [e];
    this.source.load(this.packages);
  }

}
