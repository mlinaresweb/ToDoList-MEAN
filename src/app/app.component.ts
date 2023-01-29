import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemShow } from './models/item-show';
import { TodolistService } from './services/todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo';

  editActive:boolean = false;
  id:string;
  allItems:ItemShow[] = [];
  todoForm:FormGroup;

  constructor(private todolist:TodolistService, private fb:FormBuilder){
    this.id = '';
    this.todoForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getItems();
  }

  getItems():void{
    this.todolist.getTodoList().subscribe((result:ItemShow[])=>this.allItems = result);
  }


  addItem(description: string) {

    if(description === ''){
      return;
    }

this.todolist.addTodo(description).subscribe(result=>{
      if(result){
        this.getItems();
      }
    })

  }
  editTodo(index:number):void{

    this.editActive = true;
    this.id = this.allItems[index]._id;
    this.todoForm.patchValue({description:this.allItems[index].description});



  }

  sendEditTodo(): void {

    // Llamar al método editTodo del servicio, pasándole el ID y la descripción
    this.todolist.editTodo(this.id, this.todoForm.get('description')?.value).subscribe(
      data => {
        console.log('Item editado correctamente');
        // Actualizar la lista de items
        this.getItems();
        // Ocultar el formulario de edición
        this.editActive = false;
        // Limpiar el formulario
        this.todoForm.reset();
      },
      error => {
        console.log('Error al editar el item:', error);
      }
    );
  }


  deleteItem(index:number):void{


    this.todolist.deleteTodo(this.allItems[index]._id).subscribe(result=>{
      if(result){
        this.getItems();
      }
    })

  }
}
