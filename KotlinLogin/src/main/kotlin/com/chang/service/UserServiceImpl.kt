package com.chang.service

import com.chang.mapper.UserMapper
import com.chang.pojo.Result
import com.chang.pojo.User
import com.chang.utils.JwtUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service


@Service
class UserServiceImpl : UserService {

    @Autowired
    private lateinit var usermapper: UserMapper

    @Autowired
    private lateinit var passwordEncoder: PasswordEncoder

    @Autowired
    private lateinit var authenticationManager: AuthenticationManager

    /**
     * 根据用户名称查找用户
     */
    override fun queryByName(username: String): User? {
        return usermapper.queryByName(username)
    }

    /**
     * 添加用户，返回受影响行数
     */
    override fun addUser(user: User): Int {
        //注册时查找用户如用户存在则注册失败返回2
        val findUser = usermapper.queryByName(user.username)
        if (findUser == null) {
//            对密码进行加密
            val userencode = passwordEncoder.encode(user.password)
            user.password = userencode
            val usermapper = usermapper.addUser(user)
            return usermapper
        } else {
            return 2
        }
    }

    /**
     * 查询所有用户
     */
    override fun queryAll(): List<User> {
        return usermapper.queryAll()
    }

    /**
     * 根据id查询用户
     */
    override fun queryById(id: Int): User? {
        return usermapper.queryById(id)
    }


    /**
     * 用户登录
     */
    override fun login(user: User): Result {
        println("执行开始")
        val userPAT = UsernamePasswordAuthenticationToken(user.username, user.password)
        try {
            authenticationManager.authenticate(userPAT)
//            user= auth.principal as User
        } catch (e: Exception) {
            return Result(500, "用户名或密码错误", "no")
        }

        val jwt=JwtUtils.generationToken(user.username.toString())

        return Result(200, "登陆成功", jwt)
    }

}