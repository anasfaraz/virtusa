import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import AuthenticationService from '../service/authentication';
import { Navbar,Button } from 'react-bootstrap';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const auth_token='token'
class MenuComponent extends Component {

 
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
               
                <Navbar className="nav" variant="black" expand="lg" sticky="top">     
                   
                   
                    <div className="navbar-nav ml-auto"> 
          
                         { isUserLoggedIn ? <div> 
                            <ul className="navbar-nav">
                            <li>
                                    <Link className="nav-link" to="/logout" onClick={() => { AuthenticationService.logout(sessionStorage.getItem("id")); sessionStorage.removeItem("token") }}><Button className="btn"><i className="fa fa-power-off"></i>Logout</Button></Link>
                            </li> 
                                {
                                    (sessionStorage.getItem("checker") === "true")?
                                        <li></li>
                                        :
                                        <ul className="navbar-nav">
                                        <li>
                                            <Link className="nav-link" to="/HomeScreen">
                                                    <Button className="btn"><i className="fa fa-home"></i>Home</Button>
                                            </Link>
                                        </li>
                                            <li><Link className="nav-link" to="/profile"><Button className="btn"><i className="fa fa-id-card"></i>Profile</Button></Link></li></ul>}
                                {(sessionStorage.getItem("checker") === "true")?
                                <p></p>:
                                    (sessionStorage.getItem("detector") === "false") ? <li><Link className="nav-link" to="/pattern"><Button className="btn"><i className="fa fa-lock"></i>Add Security</Button></Link></li> :
                                        <li><Link className="nav-link" to="/patterne" ><Button className="btn"><i className="fa fa-lock"></i>Edit Security</Button></Link></li>}
                        </ul>
                         </div>: 
                                 <div>
                                {sessionStorage.getItem("admin") === "true" ? 
                                <ul className="navbar-nav">
                                        <li><Link className="nav-links" to="/addproduct"><Button className="btn "><i className="fa fa-comments"></i>Add product</Button></Link></li>
                                        <li><Link className="nav-links" to="/"><Button className="btn"><i className="fa fa-user"></i>Edit product</Button></Link></li>
                                        <li><Link className="nav-links" to="/" onClick={() => { sessionStorage.removeItem("admin");sessionStorage.removeItem("admin_id");sessionStorage.removeItem("admin_token") }}><Button className="btn"><i className="fa fa-child"></i>Log out</Button></Link></li>

                                </ul>
                                :<ul className="navbar-nav"> 
                                        <li><Link className="nav-links" to="/signup"><Button className="btn "><i className="fa fa-comments"></i>Signup</Button></Link></li>
                                        <li><Link className="nav-links" to="/"><Button className="btn"><i className="fa fa-user"></i>Login</Button></Link></li>
                                        <li><Link className="nav-links" to="/adminlogin"><Button className="btn"><i className="fa fa-child"></i>AdminLogin</Button></Link></li>

                                   </ul>}
                              
                                </div>
                                }      
                       </div> 
                </Navbar>

         </header>
         
          
         
        ) 
    }
}

export default withRouter(MenuComponent)