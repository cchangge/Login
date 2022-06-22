import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { result } from '../model/result';
import { user } from '../model/user';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserServiceService, private router: Router) { }
  /**
   * 接受用户信息 
   */
  model: any = {};
  
  result: result
  ngOnInit(): void {
  }

  /**
   * 用户登录
   */
  login() {
    this.userService.login(this.model as user).subscribe({
      next: (res) => {
        this.result = res as result
        if (this.result.status == 200) {
          sessionStorage.setItem('username', res.jwt);
          sessionStorage.setItem('name',this.model.username)
          document.getElementById("loginSuccess").style.display = "block"
          setTimeout(() => {
            document.getElementById("loginSuccess").style.display = "none"
            this.router.navigateByUrl("main")
          }, 2000)

        } else {
          document.getElementById("alertLogin").style.display = "block"
          setTimeout(() => {
            document.getElementById("alertLogin").style.display = "none"
          }, 5000)
        }
      },
      error:()=>{
        this.router.navigateByUrl("err")
      }
    })
  }
}
