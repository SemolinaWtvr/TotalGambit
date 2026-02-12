package be.tftic.devmobile.totalgambit.network

import be.tftic.devmobile.totalgambit.model.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    @POST("api/default/login")
    suspend fun login(@Body body: LoginRequest): Response<LoginResponse>

    @POST("api/default/register")
    suspend fun register(@Body body: RegisterRequest): Response<RegisterResponse>

    @DELETE("api/default/delete")
    suspend fun delete(@Body body: DeleteRequest): Response<DeleteResponse>
}