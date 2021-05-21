import { Component, OnInit } from '@angular/core';
// import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IUser, IModalData } from './interfaces';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task-manager';
  public isModal = false;
  public modalData?: IModalData;
  public users?: Array<IUser>;

  constructor(private appService: AppService){
    console.log(`AppComponent :: constructor ::constructor initialized`);
  }

  public ngOnInit(){
    console.log(`AppComponent :: ngOnInit ::ngOnInit initialized`);
    if(this.appService){
      this.appService.getAllUsers().subscribe((res_ : IUser[]) => {
        console.log(`AppComponent :: ngOnInit :: getAllUsers API responce :`, res_);
        this.users = res_;
      }, err => console.error(err));
    }
  }

  public createUser(userName_ : string){
    console.log(`AppComponent :: createUser :: Entering with user name: ${userName_}`);
    const user_: IUser = {
      name: userName_,
    };
    this.appService.createUser(user_).subscribe((res_) => {
      console.log(`AppComponent :: submitForm :: createUser API responce :`, res_);
    }, err => console.error(err));
    
  }

  public updateUser(updatedUser_: IUser) {
    console.log(`AppComponent :: addUser :: Entering with user: `, updatedUser_);
    const user_: IUser = {
      name: updatedUser_.name,
      taskList: updatedUser_.taskList
    };
    this.appService.updateUser(user_).subscribe((res_) => {
      console.log(`AppComponent :: submitForm :: createUser API responce :`, res_);
    }, err => console.error(err));
  }


  public deleteUser(userId_: string){    
    console.log(`AppComponent :: deleteUser :: Entering with user id: ${userId_}`);
    this.appService.deleteUser(userId_).subscribe((res_) => {
      console.log(`AppComponent :: submitForm :: createUser API responce :`, res_);
    }, err => console.error(err));
  }

  public addTask(userId_: string) {
    
    console.log(`AppComponent :: addTask :: Entering with user id: ${userId_}`);
  }

  public showModal(context_: "DELETE_USER" | "ADD_USER" | "ADD_TASK") {
    console.log(`AppComponent :: showModal :: Entering...`);
    switch (context_) {
      case "ADD_TASK":
        this.modalData = {
          headerTitle: "Add task",
          input: {
            placeholder: "e.g. Write unit test cases",
            lable: "Task name"
          },
          submitBtnText: "Add"
        };
        this.isModal = true;
        break;
      case "ADD_USER":
        this.modalData = {
          headerTitle: "Add user",
          input: {
            placeholder: "e.g. John",
            lable: "User name"
          },
          submitBtnText: "Add"
        };
        this.isModal = true;
        break;
      case "DELETE_USER":
        this.modalData = {
          headerTitle: "Delete user ?",
          bodyText: "This user and assigned will get deleted permanently.",
          submitBtnText: "Delete"
        };
        this.isModal = true;
        break;
    }
  }

  public closeModal() {
    console.log(`AppComponent :: closeModal :: Entering...`);
    this.modalData = undefined;
    this.isModal = false;
  }
  
  public onUserSubmit(input_: string){
    this.closeModal();
    this.createUser(input_);
  } 

  public onTaskSubmit(input_: string, updatedUser_: IUser) {
    this.closeModal();
    this.updateUser(updatedUser_);
  } 
  public submitForm(input_ :string,) {
    console.log(`AppComponent :: closeModal :: isModal : ${this.isModal}`);
    if(input_ && input_.length>0){
    }
    this.isModal = false;
    this.modalData = undefined;
  }
}
