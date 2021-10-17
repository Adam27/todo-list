import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoItem } from '../../models/models';
import { ContentfulService } from '../../services/api/contentful.service';
import { Entry } from 'contentful';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy{
  title = 'My todo list';
  newItemDescription: string = '';
  showNewItemForm: boolean = false;

  itemsEntries: Entry<TodoItem>[] = [];
  private subscriptions = new Subscription();

  constructor(private contentfulService: ContentfulService, private router: Router) {}


  goToDetails(todoItemId: string){
    this.router.navigate(['/item', todoItemId]);
  }

  create(){
    this.contentfulService.createItem(this.newItemDescription).subscribe(()=>{
      this.getItems();
      this.showNewItemForm = false;
    })
  }

  getItems(){
    this.subscriptions.add(
      this.contentfulService.getItems().subscribe(
        (entries: Entry<TodoItem>[])=>{
          this.itemsEntries = entries;
        }
      )
    );
  }

  setDone(todoItemId: string, isDone: boolean){
    this.contentfulService.setItemDone(todoItemId, isDone).subscribe(()=>{
      this.getItems();
    })
  }

  ngOnInit() {
     this.getItems();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
