import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoItem } from '../../models/models';
import { ContentfulService } from '../../services/api/contentful.service';
import { Entry } from 'contentful';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnDestroy{
  todoItemId: string = '';
  todoItemEntry: Entry<TodoItem> | null = null;
  todoItemDescription: string = '';
  showUpdateForm: boolean = false;
  private subscriptions = new Subscription();
  constructor(private contentfulService: ContentfulService,
              private router: Router,
              private route: ActivatedRoute) {

    // todo handle empty todoItemId
    // todo handel other errors
    this.route.paramMap.subscribe(params => {
      const todoItemId = params.get('todoItemId')
      this.todoItemId = todoItemId || '';
    });
  }

  update() {
    this.contentfulService.updateItem(this.todoItemId, this.todoItemDescription).subscribe(
      () => {
        location.href = '/';
      }
    );
  }

  delete(){
    this.subscriptions.add(
      this.contentfulService.deleteItem(this.todoItemId).subscribe(
        () => {
          location.href = '/';
        }
      )
    );
  }

  ngOnInit() {
    this.subscriptions.add(
      this.contentfulService.getItem(this.todoItemId).subscribe(
        (entry: Entry<TodoItem>)=>{
          this.todoItemEntry = entry;
          this.todoItemDescription = entry.fields.description;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
