import axios from "axios"
import { API_URL } from "../../constant"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService{

    executeBasicAuthentication(username,password){

        return axios.get(`${API_URL}/basicauth`,
        {
                headers:{
                    authorization: this.createBasicAuthToken(username,password)
                }
            }
        )
    }
    executeJwtAuthentication(username,password){

        return axios.post(`${API_URL}/authenticate`,
        {
            username,
            password
                
        })
    }

    createBasicAuthToken(username,password){
        return 'Basic '+ window.btoa(username+ ":"+ password)
    }

    

    registerSuccessfulLogin(username,password){

        //let basicAuthHeader = 'Basic '+ window.btoa(username+":"+password)
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
    }

    registerSuccessfulLoginForJwt(username,token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username)
        this.setupAxiosInterceptors(this.createJwtAuthToken(token))

    }
    createJwtAuthToken(token){
        return 'Bearer '+ token
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn(){
        let user=  sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null)
            return false
        return true
    }
    getLoggedInUser(){
        let user=  sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null)
            return ''
        return user
    }

    setupAxiosInterceptors(basicAuthHeader){

        axios.interceptors.request.use(
            (config)=>{
                if(this.isUserLoggedIn()){
                config.headers.authorization = basicAuthHeader
            }
            return config
            }
        )
    }

}
export default new AuthenticationService()