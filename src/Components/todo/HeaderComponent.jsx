import { Component } from 'react'
import {withRouter} from 'react-router'
import AuthenticationService from './AuthenticationService.js'
import {Link} from 'react-router-dom'


class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn= AuthenticationService.isUserLoggedIn()
        //console.log(isUserLoggedIn)
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="https:www.in28minutes.com" className="navbar-brand">Todo Application</a>
                    </div>
                    <ul className="navbar-nav">
                    {isUserLoggedIn && <li ><Link className="nav-link" to="/welcome/Rishav">Home</Link></li>}
                    {isUserLoggedIn &&<li ><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn &&<li ><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li ><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}


export default withRouter(HeaderComponent)