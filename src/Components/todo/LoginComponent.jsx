import { Component } from 'react';
import AuthenticationService from './AuthenticationService.js'



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
        
        // if(this.state.username==='Rishav' && this.state.password==='rishav875'){
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     console.log('Successful')
        // this.setState({loginpass:true})
        // this.setState({loginfail:false})
        // else{
        //     console.log('Failed')
        //     this.setState({loginpass:false})
        //     this.setState({loginfail:true})
        // }
        AuthenticationService.executeBasicAuthentication(this.state.username,this.state.password)
            .then(
                ()=>{
                    AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
                    this.props.history.push(`/welcome/${this.state.username}`)
                    console.log('Successful')
                    this.setState({loginpass:true})
                    this.setState({loginfail:false}) 
                }
            )
            .catch(
                ()=>{
                     
                    console.log('Failed')
                    this.setState({loginpass:false})
                    this.setState({loginfail:true})
                            }

            )
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

export default LoginComponent
