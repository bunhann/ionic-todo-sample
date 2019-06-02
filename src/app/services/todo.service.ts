import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Array<any> = [];
  url: string = 'https://jsonplaceholder.typicode.com/todos';
  limit: String = '_limit=10';

  constructor(private http: HttpClient) { }

  createTodo(title, completed) {
    const randomId = Math.random().toString(36).substr(2, 5);
    let new_todo = {
      'userId': 1,
      'id': randomId,
      'title': title,
      'completed': completed
    };
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    this.http.post(this.url, new_todo, httpHeaders).subscribe((res) => {
      this.todos.unshift(res);
    });
    //this.todos.unshift(new_todo);
  }

  getTodos() {
    let response: any;
    this.http.get(`${this.url}?${this.limit}`).subscribe((result) => {
      response = result;
      for (let todo of response) {
        this.todos.push(todo);
      }
    });
    return this.todos;
  }

  getTodoById(id) {
    return this.todos.filter(todo => todo.id === id);
  }

  updateTodo(newValues) {
    const todoIndex = this.todos.findIndex(todo => todo.id == newValues.id);
    this.todos[todoIndex] = newValues;
  }
}
