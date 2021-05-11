import { Component } from "react";
import { Redirect, Route } from "react-router";
import AuthenticationService from "./AuthenticationService";

class AuthenticatedRoute extends Component{
    render(){
        //Using Spread Operator {...}
        if(AuthenticationService.isUserLoggedIn()){
            return <Route{...this.props}/>
        }else{
            return <Redirect to="/login"/>
        }
    }
}

export default AuthenticatedRoute