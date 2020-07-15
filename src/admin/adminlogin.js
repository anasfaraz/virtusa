import React, { Component } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
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
export default class Adminlogin extends Component {

        state = {
            email: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

    handleChange =(event) => {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked= (e) => {
        e.preventDefault();
        var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NTU4ODExNiIsImV4cCI6MTU5NDY2NzgyMiwiaWF0IjoxNTk0NjQ5ODIyfQ.3V7OpuP8l0ZAKQ9-Jl-uVUc8r5wHnCjO4iIzi-ZWK9rd9F-3VbAlKAi16ONN17OcGBsVOsVSelcAV0bjquNs3Q";
        var email = this.state.email;
        var password = this.state.password;
        if ((email !== 'admin@gmail.com') && (password !== 'admin')) {
            // AuthenticationService.registerSuccessfulLogin(this.state.email, this.state.password)
            
            toast.error("Wrong credential")
            return this.setState({ showSuccessMessage: false })
            // this.setState({ hasLoginFailed: false })
        }
        sessionStorage.setItem("admin", "true");
        sessionStorage.setItem("admin_id","55588116");
        sessionStorage.setItem("admin_token", token);
        toast.success("Welcome back")
            return this.setState({ showSuccessMessage: true })
            
    }

         render(){
            if(this.state.showSuccessMessage){
                return <Redirect to="/addproduct"/>
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
                            // onSubmit={this.handleChange}
                            // ref={c => {
                            //     this.form = c;
                            // }}
                        >

                            {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                            <div className="form-group">
                                <label htmlFor="email">Email</label>

                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    validations={[required, email]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <button
                                    className="btn  btn-danger btn-block btn-sm"
                                    disabled={this.state.loading}
                                    onClick={this.loginClicked}>
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Admin</span>
                                </button>
                            </div>

                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            {/* <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            /> */}
                        </Form>
                    </div>
                </div>
            );
        }
    }

