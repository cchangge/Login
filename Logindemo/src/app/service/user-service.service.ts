import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { user } from '../model/user';
import { Observable } from 'rxjs';
import { result } from '../model/result';





// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     Authorization: 'my-auth-token'
//   })
// };
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }
  preUrl="http://localhost:8080/"
  


  prepareHeaders() {
    return new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer '
    });
  }
 /**
  * 
  * @param user 
  * @returns 返回用户添加信息结果
  */
  adduser(user:user){
    return this.http.post(this.preUrl+"addUser", user);
  }

  /**
   * 
   * @returns 返回用户所有信息
   */
  queryAll(){
    return this.http.get<user[]>(this.preUrl+"queryAll")
  }

  /**
   * 
   * @param id 用户id
   * @returns 返回用户信息
   */
  queryById(id:number):Observable<user>{
    return this.http.get<user>(this.preUrl+"queryById/"+id)
  }

  /**
   * 
   * @param user 
   * @returns 返回用户登录信息
   */
  login(user:user){
    return this.http.post<result>(this.preUrl+"login",user)
  }
}
