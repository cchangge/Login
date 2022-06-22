package com.chang.service

import com.chang.mapper.UserMapper
import com.chang.pojo.LoginUser
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl:UserDetailsService {

    @Autowired
    private lateinit var usermapper: UserMapper

    override fun loadUserByUsername(username: String?): UserDetails {

        val user =usermapper.queryByName(username)
        if (user==null){
            throw RuntimeException("用户名户密码错误")
        }
        return LoginUser(user)
    }


}