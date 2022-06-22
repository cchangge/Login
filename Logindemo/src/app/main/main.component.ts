import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { user } from '../model/user';
import { UserServiceService } from '../service/user-service.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private userService: UserServiceService, private router: Router) { }

  users: user[] | undefined

  user: user

  username: string = sessionStorage.getItem("name")

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    // this.userService.queryAll().subscribe(
    //   (next: user[]) => {
    //     this.users = [...next]
    //   },
    //   (error:any)=>{
    //     console.log("开始执行")
    //     console.log(error)
    //   }
    // )
    this.userService.queryAll().subscribe({
      next: (res) => {
        this.users = [...res]
      },
      error: () => {
        this.router.navigateByUrl("err")
      },
      // complete: () => console.info('complete') 
    })
  }


  detailFun(id: string) {
    this.userService.queryById(Number(id)).subscribe(
      {
        next: (res) => {
          this.user = res as user
        },
        error: () => {
          this.router.navigateByUrl("err")
        }
      }
    )
  }

  logout() {
    sessionStorage.removeItem("username")
    this.router.navigateByUrl("")
  }

}
