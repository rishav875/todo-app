import { render } from '@testing-library/react';
import { Component } from 'react';
import {BrowserRouter as Router , Link, Route, Switch} from 'react-router-dom'

class TodoApp extends Component {
    render(){
        return(
            <div className="TodoApp">
                <Router>
                <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <Route path="/welcome/:name" component={WelcomeComponent}/>
                        <Route path="/todos" component={ListTodosComponent}/>
                        <Route path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                <FooterComponent/>
                </Router>
                {/* My Todo Application
                <br></br>
                <LoginComponent/>
                <WelcomeComponent/> */}
            </div>
        )
    }
}
class HeaderComponent extends Component{
    render(){
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="https:www.in28minutes.com" className="navbar-brand">Todo Application</a>
                    </div>
                    <ul className="navbar-nav">
                    <li ><Link className="nav-link" to="/welcome/Rishav">Home</Link></li>
                    <li ><Link className="nav-link" to="/todos">Todos</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li ><Link className="nav-link" to="/login">Login</Link></li>
                        <li ><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return(
            <footer className="footer">
                <span className="text-muted">All Rights are not Reserved</span>
            </footer>
        )
    }
}

class LoginComponent extends Component{//Controlled Component
    constructor(props){
        super(props)
        this.state={
            username:'Rishav',
            password:'',
            loginpass: false,
            loginfail: false,
        }
        this.handleChange=this.handleChange.bind(this)
        this.loginClicked=this.loginClicked.bind(this)
        //this.handleUsernameChange=this.handleUsernameChange.bind(this)
    }

    loginClicked(){
        
        if(this.state.username==='Rishav' && this.state.password==='rishav875'){
        this.props.history.push(`/welcome/${this.state.username}`)
            console.log('Successful')
        this.setState({loginpass:true})
        this.setState({loginfail:false})
    }
    else{
        console.log('Failed')
        this.setState({loginpass:false})
        this.setState({loginfail:true})
    }
    }
    
    handleChange(event){
        console.log(this.state);
        this.setState({[event.target.name]: event.target.value})
    }
    // handlePasswordChange(event){
    //     console.log(event.target.value);
    //     this.setState({password: event.target.value})
    // }
    render(){
        return(
            <>
            <h1>Login</h1>
            <div className="container">
            {/* <LoginFailed loginfail={this.state.loginfail}/>
            <LoginPass loginpass={this.state.loginpass}/> */}
            {this.state.loginfail && <div className="alert alert-warning">Invalid Credentials</div>}
            {this.state.loginpass && <div>Login Successful</div>}
            <br></br>
            User Name:<input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            Password:<input type= "password" name="password"value={this.state.password} onChange={this.handleChange} />
            <button className="btn btn-success" onClick={this.loginClicked}>Login</button> 
            </div>
            </>
        )
    }
}

// function LoginFailed(props){
//     if(props.loginfail){
//     return <div>Invalid Credentials</div>
// }
//     return null

// }
// function LoginPass(props){
//     if(props.loginpass){
//     return <div>Login Successful</div>
// }
//     return null

// }

class WelcomeComponent extends Component{
    render(){
        return (
            <>
            <h1>Welcome!</h1>
        <div className="container">Welcome {this.props.match.params.name}.
        You can manage your todos <Link to="/todos">here</Link>
        
        </div>
        </>
        )
        }
}
function ErrorComponent(){
    
        return <div>An Error has occured...Contact Support</div>
    
}

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            todos:
            [
                {id : 1,description : 'Learn React',done:false,targetDate: new Date()},
                {id : 2,description : 'Learn Springboot',done:false,targetDate: new Date()},
                {id : 3,description : 'Learn java',done:false,targetDate: new Date()},
                {id : 4,description : 'Learn DataStructure',done:false,targetDate: new Date()}
            ]
        }
    }
    render(){
        return( 
        <div className="container">
            <h1>List Todos</h1>
            <div>
            <table className="table">
                <thead>
                <tr>
                    <th>id</th>
                    <th>description</th>
                    <th>Target Date</th>
                    <th>Is done?</th>
                    
                </tr>
                </thead>  
                <tbody>
                    {
                        this.state.todos.map(
                           todo  =>
                        <tr>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.targetDate.toString()}</td>
                            <td>{todo.done.toString()}</td>
                            
                        </tr>

                        )
                    
                    }
                </tbody>
            </table>
            </div>
        </div>
        )
    }
}

class LogoutComponent extends Component{
    render(){
        return(
            <>
                 <h1>You are logged out</h1>
                 <div className="container">
                     Thanks for  using our application....
                 </div>
            </>
        )
    }
}
export default TodoApp