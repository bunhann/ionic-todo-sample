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

  offline_todos: Array<any> = [
    {
      'userId': 1,
      'id': 1000,
      'title': 'IONIC is an awesome framework.',
      'completed': false
    },
    {
      'userId': 1,
      'id': 1001,
      'title': 'Flutter is another cross-platform framework.',
      'completed': true
    },
    {
      'userId': 1,
      'id': 1002,
      'title': 'You are in the offline mode. :D',
      'completed': true
    },
  ];

  constructor(private http: HttpClient) { }

  createTodo(title, completed) {
    const randomId = Math.random().toString(36).substr(2, 5);
    let new_todo = {
      'userId': 1,
      'id': randomId,
      'title': title,
      'completed': completed
    };

    // Declare HttpHeader
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    // Post Data to Server
    this.http.post(this.url, new_todo, httpHeaders).subscribe((res) => {
      this.todos.unshift(res);
    });
  }

  getTodos() {
    let response: any;
    this.http.get(`${this.url}?${this.limit}`).subscribe((result) => {
      response = result;
      for (let todo of response) {
        this.todos.push(todo);
      }
    }, (err) => {
      console.log('No Internet', 'You are offline');
      this.todos = this.offline_todos;
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
