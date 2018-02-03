import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import { TopicService } from './topic.service';
import {Topic} from './topic-model';
import { LocalDataSource } from 'ng2-smart-table';
import { StatusRenderComponent } from './status-render.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  settings = {
    attr: {
      class: 'table'
    },
    mode: 'inline', // inline|external|click-to-edit
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
      name: {
        title: 'Tên',
        type: 'html',
      },
      desc: {
        title: 'Mô tả',
        type: 'html'
      },
      status: {
        title: 'Trạng thái',
        type: 'custom',
        renderComponent: StatusRenderComponent,
        defaultValue: false,
        editor: {
          type: 'checkbox'
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Trạng thái',
            list: [
              { value: true, title: 'Đang sử dụng' },
              { value: false, title: 'Đã ẩn' }
            ],
          },
        }
      }
    },
    add: {
      inputClass: '',
      addButtonContent: '<i class="icon-plus btn btn-success btn-sm"> Thêm</i>',
      createButtonContent: 'Save',
      cancelButtonContent: 'Cancel',
      confirmCreate: true,
    },
    edit: {
      inputClass: '',
      editButtonContent: '<i class="icon-pencil btn btn-primary btn-sm"></i>',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="icon-trash btn btn-danger btn-sm"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'Dữ liệu rỗng',
    pager: {
      display: true,
      perPage: 10,
    }
  };

  topics: Topic[];
  //source for smart table
  source: LocalDataSource;

  constructor(private topicService: TopicService) {
    this.topics = [];
  }

  ngOnInit() {
    console.log('OnInit');
    this.getTopics();
  }

  getTopics(): void {
    this.topicService.getTopics().subscribe( topics => {
      for (let i = topics.length - 1; i >= 0; i--) {
        this.topics.push({
          _id: topics[i]._id,
          name: topics[i].name,
          desc: topics[i].desc,
          status: topics[i].status})
      }
      console.log(this.topics);
      this.source = new LocalDataSource(this.topics);
    });
  }

  onDeleteTopicConfirm(event) {
    if (window.confirm('Bạn có chắc muốn xóa topic này?')) {
      event.confirm.resolve();
      //this.deleteTopic(event.data.id);
      this.topicService.deleteTopic(event.data._id).subscribe();
      console.log('Delete OK');
      //console.log(this.topics);
    } else {
      event.confirm.reject();
      console.log('Delete rejected');
    }
    console.log('-----');
  }

  shiftTopic(): void {
    console.log('Shift topic');
    this.topicService.shiftTopic();
    //this.topics.shift();
  }

  onCreateTopic(event) {
    console.log('Create new topic');
    let obj = event.newData;
    let topicObj = {name: obj.name.trim(), desc: obj.desc.trim(), status: obj.status !== '' ? obj.status : false};
    if (obj.name.trim() === '' || obj.desc.trim() === '') {
      window.alert('Hãy nhập đủ thông tin!');
      console.log('Create failed');
    } else {
      event.confirm.resolve();
      this.topicService.addTopic(topicObj as Topic).subscribe();
      //this.source.load(this.topics);
      this.shiftTopic();
      console.log('Create success');
      //console.log(this.topics);
    }
    console.log('-----');
  }

  onEditTopic(event) {
    let newObj = event.newData;
    let topicObj = {_id: newObj._id, name: newObj.name.trim(), desc: newObj.desc.trim(), status: newObj.status};
    console.log('Edit topic id: ' + event.data._id);
    console.log('-----');
    event.confirm.resolve();
    this.topicService.editTopic(topicObj).subscribe();
  }

}
