package com.chang

import com.chang.mapper.UserMapper
import com.chang.pojo.User
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@SpringBootTest
class KotlinLoginApplicationTests {
    @Autowired
    private lateinit var userM:UserMapper
    @Autowired
    private  lateinit var passwordEncoder: PasswordEncoder

    @Test
    fun contextLoads() {
        val user =userM.queryById(1);
        println(passwordEncoder.encode(user.password))


    }
}
