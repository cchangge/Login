package com.chang.controller

import com.chang.pojo.Result
import com.chang.pojo.User
import com.chang.service.UserService
import com.chang.service.UserServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
class UserController {

    @Autowired
    private lateinit var userService: UserServiceImpl


    /**
     *  根据用户名称返回一个用户对象
     */

    @GetMapping("/user/{username}")
    fun queryByName(@PathVariable("username") username: String): User? {
        return userService.queryByName(username)
    }



    /**

      注册用户，返回执行成功后受影响的行数
     */

    @PostMapping("/addUser")
    fun addUser(@RequestBody user: User): Int {
        return userService.addUser(user)
    }

    /**
     *     查询所有用户
      */

    @GetMapping("/queryAll")
    fun queryAll(): List<User> {
        return userService.queryAll()
    }


    /**
     * 根据用户id查询用户
     */

    @GetMapping("/queryById/{id}")
    fun queryById(@PathVariable("id") id: Int): User? {
        return userService.queryById(id)
    }


    /**
     * 用户登录
     */
    @PostMapping("/login")
    fun login(@RequestBody user: User): Result {
        println(user)
       return userService.login(user)
    }
}