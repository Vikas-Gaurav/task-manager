import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient ) { 
    console.log(`AppService :: constructor ::constructor initialized`);
  }

  private apiUrl = "http://localhost:3000/user";

  //get all user
  public getAllUsers(){
    console.log(`AppService :: getAllUsers :: Entering...`);
    return this.http.get(this.apiUrl);
  }

  //get user by id api
  public getUsersById(userId_: string) {
    console.log(`AppService :: getUsersById :: finding user for id ${userId_}`);
    return this.http.get(this.apiUrl + '/' + userId_);
  }

  //create user api
  public createUser(user_: IUser) {
    console.log(`AppService :: createUser :: Entering...`);
    return this.http.post(this.apiUrl,user_);
  }

  //update user api
  public updateUser(userId_: string, updatedUser_: IUser) {
    console.log(`AppService :: updateUser :: Entering...`);
    return this.http.put(this.apiUrl + '/' + userId_, updatedUser_);
  }

  //delete user api
  public deleteUser(userId_ : string){
    console.log(`AppService :: deleteUser :: Entering...`);
    return this.http.delete(this.apiUrl + '/' + userId_);
  }
}
