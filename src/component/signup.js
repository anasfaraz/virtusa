import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import {  Redirect } from 'react-router-dom';
import { toast } from "react-toastify";
import AuthenticationService from "../service/authentication";


toast.configure();

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
                This is not a valid email.
            </div>
        );
    }
};

const vfirstname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The firstname must be between 3 and 20 characters.
            </div>
        );
    }
};
const vlastname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The lastname must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            Firstname: "",
            Lastname:"",
            Email: "",
            Password: "",
            successful: false,
            message: "",
            loading:false
        };
    }

    onChangeFirstname(e) {
        this.setState({
            Firstname: e.target.value
        });
    }
    onChangeLastname(e){
        this.setState({
            Lastname:e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false,
            loading:true
        });
        if (this.state.Firstname.length === 0||this.state.Lastname.length === 0||this.state.Email.length === 0 || this.state.Password.length === 0) {
            this.setState({ loading: false })
            return toast.info("Please fill the form correctly")
        }



        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthenticationService.register(
                this.state.Firstname,
                this.state.Lastname,
                this.state.Email,
                this.state.Password
            ).then(
                response => {
                    console.log(response);
                    if(response.status === 200){
                   
                    toast.success(`${response.data.message}`);
                    setTimeout(()=>{this.setState({
                        message: response.data.message,
                        successful: true,
                        loading:true
                    });
                    },1500)}
                 
                },
            ).catch(err=>{toast.error("Something went wrong ! probably email already used or network issue")
             this.setState({
                 loading:false,
                 successful:false
             })                    
        });
        }
    }

    render() {
        if(this.state.message.length !== 0){
            return <Redirect to="/"/>
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
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <i className="material-icons">account_circle</i>

                                    <label htmlFor="Firstname"><strong>Firstname</strong></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="firstname"
                                        value={this.state.Firstname}
                                        onChange={this.onChangeFirstname}
                                        validations={[required, vfirstname]}
                                    />
                                </div>
                                <div className="form-group">
                                    <i className="material-icons">account_circle</i>
                                    <label htmlFor="Lastname"><strong>Lastname</strong></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        value={this.state.Lastname}
                                        onChange={this.onChangeLastname}
                                        validations={[required, vlastname]}
                                    />
                                </div>

                                <div className="form-group">
                                    <i className="material-icons">mail</i>

                                    <label htmlFor="email"><strong>Email</strong></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.Email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />
                                </div>

                                <div className="form-group">
                                    <i className="material-icons">lock</i>

                                    <label htmlFor="password"><strong>Password</strong></label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.Password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-grou">
                                    <button className="btn btn-danger btn-block btn-sm ">
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span><span><i className="fa fa-comments"></i></span>Sign Up</span></button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                >
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