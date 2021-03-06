import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private todos: Array<any>;
  constructor(
    private router: Router,
    public todoService: TodoService
  ) {
    this.todos = this.todoService.getTodos();
  }
  ngOnInit(): void {
    
  }

  updateTodo(updateTodo) {
    console.log("TODO-UPDATE", updateTodo);
    let newValues = {
      id: updateTodo.id,
      title: updateTodo.title,
      completed: updateTodo.completed
    }
    this.todoService.updateTodo(newValues);
  }
}
