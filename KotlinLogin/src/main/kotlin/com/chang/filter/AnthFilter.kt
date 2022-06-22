package com.chang.filter

import com.chang.pojo.LoginUser
import com.chang.service.UserServiceImpl
import com.chang.utils.JwtUtils
import io.jsonwebtoken.Claims
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Component
class AnthFilter : OncePerRequestFilter() {

    @Autowired
    private lateinit var UserService: UserServiceImpl

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {

        println(request.method.equals("OPTIONS"))
        if (request.method.equals("OPTIONS")){
            filterChain.doFilter(request,response)
            return
        }

        val token=request.getHeader("Authorization")
        if (token==null||token==""){
            filterChain.doFilter(request,response)
            return
        }

        val username: String
        try {
            val calaim: Claims = JwtUtils.getClaimByToken(token);
            username = calaim.subject;
        } catch (e: Exception) {
            throw Exception("token不合法")
        }
        val user = UserService.queryByName(username)
        val userAT = UsernamePasswordAuthenticationToken(LoginUser(user), null, null)
        SecurityContextHolder.getContext().setAuthentication(userAT)
        filterChain.doFilter(request, response)
    }
}