import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthenticationService from "../service/authentication";
import {isEmail} from "validator";
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';

toast.configure()


export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
//validation
const required = value => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };
const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email
            </div>
        );
    }
};

export default class login extends Component{
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: "",
            addOnSecurity: null,
            successful:false,
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

     handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true

        });

        if(this.state.email.length === 0 || this.state.password.length === 0){
            this.setState({loading:false})
            return toast.info("Please fill the form correctly")
        }
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            AuthenticationService.login(this.state.email, this.state.password).then(
                response => {
                    console.log(response);
                    if (response.status === 200) {
                        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, this.state.email)
                        sessionStorage.setItem("id",response.data.message.id )
                        sessionStorage.setItem("token", response.data.message.salt)
                        toast.success("Welcome Buddy!!");
                            setTimeout(() => {
                                this.setState({
                                    addOnSecurity:response.data.message.addOnSecurity,
                                    successful: true,
                                    loading:true,
                                });
                             }, 1500)
                         
                       }
                    },     
            ).catch(
                error => {
                    console.log(error);
                    const resMessage =
                        ( 
                            error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                    this.setState({
                        loading:false,
                        message: resMessage,
                        successful:false,
                    });
                }); 
            }
        }   
    render() {
        if ((this.state.addOnSecurity === true) && AuthenticationService.isUserLoggedIn()){
            sessionStorage.setItem("detector", "true")
            sessionStorage.setItem("checker", "true")
            return <Redirect to="/patternv"/>
        }
        if ((this.state.addOnSecurity === false) && AuthenticationService.isUserLoggedIn()){
            sessionStorage.setItem("detector", "false")
            sessionStorage.setItem("checker", "false")

            return <Redirect to="/HomeScreen"/>
        }
        return (
            
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                
                    <Form
                        onSubmit={this.handleLogin}
                        ref={c => {
                            this.form = c;
                        }}
                    >

                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                        <div className="form-group">
                            <i className="material-icons">email</i>
                            <label htmlFor="email"><strong>Email</strong></label>

                            <Input                                          
                                type="text"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[required,email]}
                             />
                             
                        </div>

                        <div className="form-group">
                            <i className="material-icons">lock</i>

                            <label htmlFor="password"><strong>Password</strong></label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>
                    
                        <div className="form-grou">
                            <button
                                className="btn  btn-danger btn-block btn-sm"
                                disabled={this.state.loading}>
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                    
                                <span><i className="fa fa-user"></i>Login</span>
                            </button>
                            
                        </div>
                        
                        <div>

                        </div>
                    
                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                     </Form>
                 </div>
            </div>
        );
    }
}