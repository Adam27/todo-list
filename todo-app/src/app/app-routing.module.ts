import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'item/:todoItemId', component: TodoItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
