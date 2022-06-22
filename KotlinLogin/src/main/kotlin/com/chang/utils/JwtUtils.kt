package com.chang.utils
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.impl.DefaultClaims
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtUtils {
    companion object{
//        private val nowDate = Date()
//        private val expireDate = Date(nowDate.time + 1000 * 60 * 60 * 24 * 7)
        private val secret = "dwadadag234423"
        // 生成token
        fun generationToken(username: String): String {
            return Jwts.builder()
                // header
                .setHeaderParam("typ", "JWT")
                // payload
                .claim("username", username)
                .setSubject(username)
//                .setIssuedAt(nowDate)
//                .setExpiration(expireDate)
                .setId(UUID.randomUUID().toString())
                // signature
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact()
        }
        // 解析token
        fun getClaimByToken(jwt: String): Claims {
            return try {
                Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(jwt)
                    .body
            } catch (e: Exception) {
                DefaultClaims()!!
            }
        }


        // 判断按是否过期
//        fun  isTokenExpired(claims: Claims):Boolean{
//            return  claims.expiration.before(Date())
//        }
    }
}