import axios from "axios"

class HelloWorldService{
    executeHelloWorldService(){
        //console.log('executed Service')
        return axios.get('http://localhost:8080/hello-world')
    }

    executeHelloWorldBeanService(){
        //console.log('executed Service')
        return axios.get('http://localhost:8080/hello-world-bean')
    }
    
    executeHelloWorldPathVariableService(name){
        //console.log('executed Service')
        //CSRF Cross side Request Forgery
        // let username='Rishav'
        // let password= 'rishav@875'
        // let basicAuthHeader = 'Basic '+ window.btoa(username+":"+password)
         return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`
        // {
        //     headers:{
        //         authorization: basicAuthHeader
        //     }
        // }
        )
    }
}

export default new HelloWorldService()