package be.tftic.devmobile.totalgambit.model

    data class LoginRequest(val email: String, val pwd: String)
    data class LoginResponse(val token: String)

    data class RegisterRequest(val username: String, val email: String, val password: String)
    data class RegisterResponse(val username: String, val role: String, val tokens: Int)

    data class DeleteRequest(val email: String)
    data class DeleteResponse(val status: String)