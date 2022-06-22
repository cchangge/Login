package com.chang.mapper

import com.chang.pojo.User
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Param


@Mapper
interface UserMapper {

    /**
     * 根据用户名称查找用户
     */
    fun queryByName(username: String?):User?

    /**
     * 添加用户，返回受影响行数
     */
    fun addUser(@Param("user") user:User):Int

    /**
     * 查询所有用户
     */
    fun queryAll():List<User>

    /**
     * 根据id查询用户
     */
    fun queryById(@Param("id") id:Int):User
}