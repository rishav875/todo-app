import moment from 'moment';
import { Component } from 'react';
import TodoService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'
//import TodoComponent from './TodoComponent'


class ListTodosComponent extends Component{
    constructor(props){
        console.log('Constructor')
        super(props)
        this.state={
            todos:
            [
            //     {id : 1,description : 'Learn React',done:false,targetDate: new Date()},
            //     {id : 2,description : 'Learn Springboot',done:false,targetDate: new Date()},
            //     {id : 3,description : 'Learn java',done:false,targetDate: new Date()},
            //     {id : 4,description : 'Learn DataStructure',done:false,targetDate: new Date()}
             ],
             message:null

        }
        this.addTodoOnClick=this.addTodoOnClick.bind(this)
        this.updateTodoOnClick=this.updateTodoOnClick.bind(this)
        this.refreshTodo=this.refreshTodo.bind(this)
        this.deleteTodoOnClick=this.deleteTodoOnClick.bind(this)
    }
// Called when a component is removed from view
    componentWillUnmount(){
        console.log("Component will unmount")
    }

    shouldComponentUpdate(nextProps,nextState){
        //React does not immediately update the state as 
        //soon as setState Method is called. 
        //The state Update in react is in control of the framework
        console.log('Should Component Update')
        console.log(nextProps)
        console.log(nextState)
        //Will call the render method
        return true
        //Wont call the render method
        //return false

    }

//Life Cycle Method of React Component
//It trigger re-rendering when an API is called
    componentDidMount(){
        console.log("componentDidMount")
        this.refreshTodo()
        
    }

    refreshTodo(){
        let username = AuthenticationService.getLoggedInUser()
        TodoService.retrieveAllTodos(username)
        .then(
            Response=>{
            //console.log(Response)
            this.setState({todos: Response.data})
        }
        )
    }
    //Delete the todo Method
    deleteTodoOnClick(id){
        let username = AuthenticationService.getLoggedInUser()
        console.log(id+" "+ username)
        TodoService.deleteTodo(username,id)
        .then(
            Response => {
                this.setState({message: `Delete of todo ${id} is successful`})
                this.refreshTodo()
            }
        )
    }
    //update the todo Method
    updateTodoOnClick(id){
        console.log('update '+id)
        this.props.history.push(`/todos/${id}`)
        // /todo/${id}
        // let username = AuthenticationService.getLoggedInUser()
        // console.log(id+" "+ username)
        // TodoService.deleteTodo(username,id)
        // .then(
        //     Response => {
        //         this.setState({message: `Delete of todo ${id} is successful`})
        //         this.refreshTodo()
        //     }
        // )
    }
    //Add the todo
    addTodoOnClick(){
        //console.log('create '+ id)
        this.props.history.push(`/todos/-1`)

    }
    render(){
        console.log("Render")
        return( 
        <div className="container">
            <h1>List Todos</h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Description</th>
                    <th>Target Date</th>
                    <th>Is done?</th>
                    <th>Delete</th>
                    <th>Update</th>
                    
                </tr>
                </thead>  
                <tbody>
                    {
                        this.state.todos.map(
                           todo  =>
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                            <td>{todo.done.toString()}</td>
                            <td><button className="btn btn-warning" onClick={()=>this.deleteTodoOnClick(todo.id)}>Delete</button></td>
                            <td><button className="btn btn-success" onClick={()=>this.updateTodoOnClick(todo.id)}>Update</button></td>
                        </tr>

                        )
                    
                    }
                </tbody>
            </table>
            <div  className="row">
                <button className="btn btn-success" onClick={()=>this.addTodoOnClick()}>Add</button>
            </div>
            </div>
        </div>
        )
    }
}

export default ListTodosComponent