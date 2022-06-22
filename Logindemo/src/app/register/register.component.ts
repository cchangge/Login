import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from '../model/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserServiceService, private router: Router,private formbuilder:FormBuilder) { }
  model: any = {};
  flag: boolean = false
  ngOnInit(): void {
  }
  
  register() {
    console.log("我进入方法了")
    this.userService.adduser(this.model)
    // this.userService.adduser(this.mygroup.value as unknown as user)
      .subscribe({
        next: (data) => {
          if (data == 1) {
            document.getElementById("registerSuccess").style.display = "block"
            setTimeout(() => {
              document.getElementById("registerSuccess").style.display = "none"
              this.router.navigate(['']);
            }, 3000);

          } else {
            this.flag = true
            setTimeout(() => {
              this.flag = false
            }, 5000)
          }
        },
        error:()=>{
          this.router.navigateByUrl("err")
        }
      })
  }
}
