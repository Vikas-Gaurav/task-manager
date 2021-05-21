import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  public users?: Array<IUser> = [
    {
      _id: "123",
      name: "Vikas Gaurav",
      taskList: ["Develop a new app", "Unit testing for the app"]
    },
    {
      _id: "234",
      name: "Vikas Gaurav",
      taskList: ["Develop a new app", "Unit testing for the app"]
    },
    {
      _id: "345",
      name: "Vikas Gaurav",
      taskList: ["Develop a new app", "Unit testing for the app"]
    }
  ];


  constructor(private http: HttpClient ) { 
    console.log(`AppService :: constructor ::constructor initialized`);
  }

  private apiUrl = "http://localhost:3000";

  //get all user
  public getAllUsers(){
    console.log(`AppService :: constructor ::constructor initialized`);
    // return this.users;
    return this.http.get(this.apiUrl + '/');
  }

  public createUser(user_: IUser) {
    console.log(`AppService :: createUser ::createUser initialized`);
    return this.http.post(this.apiUrl+'/create',user_);
  }

  public updateUser(user_: IUser) {
    console.log(`AppService :: updateUser ::updateUser initialized`);
    return this.http.put(this.apiUrl+'/update', user_);
  }

  public deleteUser(userId_ : string){
    console.log(`AppService :: deleteUser ::deleteUser initialized`);
    return this.http.delete(this.apiUrl + '/delete/' + userId_);
  }
}
