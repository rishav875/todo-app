import { Component } from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'

class TodoApp extends Component {
    render(){
        return(
            <div className="TodoApp">
                <Router>
                <Route path="/" exact component={LoginComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/welcome" component={WelcomeComponent}/>
                </Router>
                {/* My Todo Application
                <br></br>
                <LoginComponent/>
                <WelcomeComponent/> */}
            </div>
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
        this.props.history.push("/welcome")
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
            {/* <LoginFailed loginfail={this.state.loginfail}/>
            <LoginPass loginpass={this.state.loginpass}/> */}
            {this.state.loginfail && <div>Invalid Credentials</div>}
            {this.state.loginpass && <div>Login Successful</div>}
            User Name:<input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            Password:<input type= "password" name="password"value={this.state.password} onChange={this.handleChange} />
            <br></br>
            <button onClick={this.loginClicked}>Login</button> 
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
        return <div>Welcome To the MyTodos</div>
    }
}
export default TodoApp