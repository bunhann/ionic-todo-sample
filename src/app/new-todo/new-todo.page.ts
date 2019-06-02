import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.page.html',
  styleUrls: ['./new-todo.page.scss'],
})
export class NewTodoPage implements OnInit {

  new_todo_form: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.new_todo_form = this.formBuilder.group(
      {
        title: new FormControl('', Validators.required),
        completed: new FormControl(false)
      }
    );
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  createTodo(todo) {
    this.todoService.createTodo(todo.title, todo.completed);
    this.new_todo_form.reset();
    this.goBack();
  }

}
