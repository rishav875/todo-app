import axios from 'axios'
import { JPA_API_URL } from '../../constant'

class TodoService{
    retrieveAllTodos( name ){

        return axios.get(`${ JPA_API_URL }/users/${name}/todos`)
    }

    retrieveTodo( name,id){

        return axios.get(`${ JPA_API_URL }/users/${name}/todos/${id}`)
    }

    deleteTodo(name,id){
        return axios.delete(`${ JPA_API_URL }/users/${name}/todos/${id}`)
    }

    updateTodo(name,id, todo){
        console.log(todo)
        return axios.put(`${ JPA_API_URL }/users/${name}/todos/${id}`, todo)
        
    }

    createTodo(name, todo){
        console.log(todo)
        return axios.post(`${ JPA_API_URL }/users/${name}/todos`, todo)
        
    }

}


export default new TodoService()