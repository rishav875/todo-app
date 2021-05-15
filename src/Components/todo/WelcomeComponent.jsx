import { Component } from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService'

class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.retrieveWelcomeMessage= this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse=this.handleSuccessfulResponse.bind(this)
        this.handleError= this.handleError.bind(this)
        this.state={
            welcomeMessage:''
        }
    }
    render(){
        return (
            <>
            <h1>Welcome!</h1>
        <div className="container">Welcome {this.props.match.params.name}.
        You can manage your todos <Link to="/todos">here</Link>
        
        </div>
        <div className="container">
         Click here to get a customized Welcome Message.....
         <button onClick= {this.retrieveWelcomeMessage}  className="btn btn-success" >GetWelcome Message </button>    
        </div>
        <div className="container">
            {this.state.welcomeMessage}
        </div>
        </>
        )
        }
        retrieveWelcomeMessage(){
            // HelloWorldService.executeHelloWorldService()
            // .then(Response => {this.handleSuccessfulResponse(Response)})
           
            // HelloWorldService.executeHelloWorldBeanService()
            // .then(Response => {this.handleSuccessfulResponse(Response)})
           
            HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
            .then(Response => {this.handleSuccessfulResponse(Response)})
           
             .catch(error => this.handleError(error))        }
        handleSuccessfulResponse(Response){
            console.log(Response)
            this.setState({welcomeMessage: Response.data.message})
        }

        handleError(error){
            console.log(error.response)
      this.setState({welcomeMessage: error.response.data.message})
        }
}

export default WelcomeComponent