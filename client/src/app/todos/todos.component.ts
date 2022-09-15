import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { CREATE_USER,GET_ALL_USER,DELETE_USER,GET_USER,UPDATE_USER } from '../graphql/graphql.queries';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  users: any[] = [];
  error: any;
  messages: any[] = [];
  
  userForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });


  submitForm(){
    if(this.userForm.get('id')?.value !=undefined && this.userForm.get('id')?.value!=null && this.userForm.get('id')?.value!='' ){
     this.updateTodo();
    }else{
      this.addTodo();
    }
  }
  

  updateTodo() {
    this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        id: this.userForm.value.id,
      },
      refetchQueries: [{
        query: GET_ALL_USER
      }]
    }).subscribe(({data}: any) => {
      if(data?.updateUser.actionStatus){
        this.messages=[];
        this.messages.push({'priority':'success', 'info':data?.updateUser?.message});
      }else{
        this.messages=[];
        this.messages.push({'priority':'danger', 'info':data?.updateUser?.message});
      }
      let index = this.users.findIndex(obj => {
        return obj.id == this.userForm.value.id;
      });
      this.userForm.reset();
    }
    , (error) => {
      this.error = error;
    }
    );
  }

  addTodo() {
    // apollo graphql query to add todo
    console.log(this.userForm.value.name,this.userForm.value.email)
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
      },
      refetchQueries: [{
        query: GET_ALL_USER
      }]
    }).subscribe(({data}: any) => {
      if(data?.createUser.actionStatus){
        this.messages=[];
        this.messages.push({'priority':'success', 'info':data?.createUser?.message});
      }else{
        this.messages=[];
        this.messages.push({'priority':'danger', 'info':data?.createUser?.message});
      }
      this.userForm.reset();
    }
    , (error) => {
      this.error = error;
    }
    );

  }

  deleteTodo(id: string) {
    // apollo graphql query to delete todo
    this.apollo.mutate({
      mutation: DELETE_USER,
      variables: {
        id: id,
      },
      refetchQueries: [{
        query: GET_ALL_USER
      }]
    }).subscribe(({data}: any) => {
      if(data?.deleteUser.actionStatus){
        this.messages=[];
        this.messages.push({'priority':'success', 'info':data?.deleteUser?.message});
      }else{
        this.messages=[];
        this.messages.push({'priority':'danger', 'info':data?.deleteUser?.message});
      }
    }
    , (error) => {
      this.error = error;
    }
    );
  }

  getTodo(id: string) {
    // apollo graphql query to delete todo
    this.apollo.mutate({
      mutation: GET_USER,
      variables: {
        id: id,
      },
    }).subscribe(({data}: any) => {
      console.log(data);
      if(data?.getUser){
        this.userForm.setValue({
          "name":data?.getUser?.name,
          "email":data?.getUser?.email,
          "id":data?.getUser?.id,
        });
      }else{
        this.messages=[];
        this.messages.push({'priority':'danger', 'info':"No data found!"});
      }
    }
    , (error) => {
      this.error = error;
    }
    );
  }

  cancelTodo(){
    this.userForm.reset();
  }

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_ALL_USER
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.users = data.getAllUsers;
      this.error = error;
    });
  }
}