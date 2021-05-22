import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IUser, IModalData } from './interfaces';
import { AppService } from './app.service';
import { timer as observableTimer, Subject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';

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
  public inputValue?: string; // using ngModel to get form value
  public currentUserId?: string; //store the id of user on which operations are performed
  public modalContext?: "DELETE_USER" | "ADD_USER" | "ADD_TASK";
  public connectedTo: Array<string>;

  constructor(private appService: AppService) {
    console.log(`AppComponent :: constructor ::constructor initialized`);
  }

  private _cancel$ = new Subject<void>();

  public ngOnInit() {
    console.log(`AppComponent :: ngOnInit ::ngOnInit initialized`);
    if (this.appService) {
      this._updateView();
    }
  }

  /*
  * This method is invoked when Add button is clilcked from add-user modal
  * This method creats a new user, withouttask list
  */
  public createUser(userName_: string) {
    console.log(`AppComponent :: createUser :: Entering with user name: ${userName_}`);
    const user_: IUser = {
      name: userName_,
    };
    this.appService.createUser(user_).subscribe((res_) => {
      console.log(`AppComponent :: submitForm :: createUser API responce :`, res_);
      this.closeModal();
      this._updateView();
    }, err => console.error(err));
  }

  /*
  * This method is invoked when a task is assigned to user or name is changed
  * This method updated the user object
  */
  public updateUser(updatedUser_: IUser) {
    console.log(`AppComponent :: updateUser :: Entering with user: `, updatedUser_);
    this.appService.updateUser(this.currentUserId, updatedUser_).subscribe((res_) => {
      console.log(`AppComponent :: updateUser :: updateUser API responce :`, res_);
      this.closeModal();
      this._updateView();
    }, err => console.error(err));
  }

  /*
  * This method is invoked after confirmation is recieved from user to delete user
  * This method deletes the user and calles updateView method
  */
  public deleteUser(userId_: string) {
    console.log(`AppComponent :: deleteUser :: Entering with user id: ${userId_}`);
    this.appService.deleteUser(userId_).subscribe((res_) => {
      console.log(`AppComponent :: submitForm :: deleteUser API responce :`, res_);
      this.closeModal();
      this._updateView();
    }, err => console.error(err));
  }

  /*
  * This method is called to add a task for existing user
  * This method updates the user
  */
  public addTask(taskName_: string) {
    console.log(`AppComponent :: addTask :: Entering with task name: ${taskName_}`);
    if (this.currentUserId) {
      this.appService.getUsersById(this.currentUserId).subscribe((user_: IUser) => {
        const updatedTaskList_ = user_.taskList;
        updatedTaskList_.push(taskName_);
        const updatedUser_: IUser = {
          name: user_.name,
          taskList: updatedTaskList_
        };
        this.updateUser(updatedUser_);
      }, err => console.error(err));
    }
  }

  /*
  * This method is called on change in user name
  * This method updates the user name, using debouncing, to limit the API call
  */
  public onNameChange(name_: string, user_: IUser) {
    console.log(`AppComponent :: onNameChange :: updated name: ${name_}`);
    this._cancel$.next();
    if (name_ && name_.length > 0) {
      this.currentUserId = user_._id;
      const updatedUser_: IUser = {
        name: name_,
        taskList: user_.taskList
      };

      // debouncing, this waits for 1000ms before calling update API
      // if user change name field in-between, timer gets resetted 
      observableTimer(1000).pipe(mergeMap(() => {
        return this.appService.updateUser(this.currentUserId, updatedUser_);
      }), takeUntil(this._cancel$)).subscribe((res_) => {
        console.log(`AppComponent :: onNameChange :: update API responce:`, res_);
      });
    }
  }

  public showModal(context_: "DELETE_USER" | "ADD_USER" | "ADD_TASK", userId_?: string) {
    console.log(`AppComponent :: showModal :: Entering with context: ${context_}, userId_: ${userId_}`);
    this.modalContext = context_;
    this.currentUserId = userId_;
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
          bodyText: "This user and assigned tasks will get deleted.",
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
    this.inputValue = undefined;
  }

  /*
  * This method is called on drop event
  * This method updates the task list of both old and new board, after drag and drop action
  */
  public drop(event: CdkDragDrop<string[]>) {
    console.log(`AppComponent :: drop :: entering with event:`, event);
    if (event.previousContainer === event.container) {
      console.log(`AppComponent :: drop :: prev and current container are same:`);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      console.log(`AppComponent :: drop :: moving from one container to other:`);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      //update new task board, to which item is dragged
      if (event.container.data && event.container.element &&
        event.container.element.nativeElement.id &&
        event.container.element.nativeElement.getAttribute('accessKey')) {
        this.currentUserId = event.container.element.nativeElement.id;
        const updatedUser_: IUser = {
          name: event.container.element.nativeElement.getAttribute('accessKey'),
          taskList: event.container.data
        };
        this.updateUser(updatedUser_);
        console.log(`AppComponent :: drop :: updated user_:`, updatedUser_);
      }
      else {
        console.log(`AppComponent :: drop :: can't update user, insufficient info`);
      }
      //update older task list, from which item is dragged
      if (event.previousContainer.data && event.previousContainer.element &&
        event.previousContainer.element.nativeElement.id &&
        event.previousContainer.element.nativeElement.getAttribute('accessKey')) {
        this.currentUserId = event.previousContainer.element.nativeElement.id;
        const updatedUser_: IUser = {
          name: event.previousContainer.element.nativeElement.getAttribute('accessKey'),
          taskList: event.previousContainer.data
        };
        this.updateUser(updatedUser_);
        console.log(`AppComponent :: drop :: updated user_:`, updatedUser_);
      }
      else {
        console.log(`AppComponent :: drop :: can't update user, insufficient info`);
      }

    }
  }

  /*
  * This method is called on component load and on subsequent update
  *
  */
  private _updateView() {
    console.log(`AppComponent :: _updateView :: Updating view:`);
    this.appService.getAllUsers().subscribe((res_: IUser[]) => {
      console.log(`AppComponent :: ngOnInit :: getAllUsers API responce :`, res_);
      this.users = res_;
      if (this.users && this.users.length > 0) {
        this.connectedTo = []; //empty list
        for (let user of this.users) {
          this.connectedTo.push(user._id);
        }
        console.log(`AppComponent :: _updateView :: connectedTo list:`, this.connectedTo);
      }
    }, err => console.error(err));
  }

}
