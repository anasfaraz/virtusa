import React, { Component } from 'react';
import Form from "react-validation/build/form";
import AuthenticationService from "../service/authentication";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg: "//ssl.gstatic.com/accounts/ui/avatar_2x.png",
            user: [],
            pic: null,
            password: "",
        };


    }
    imageHandler = (e) => {
        this.setState({ pic: e.target.files[0] })
    }


    componentDidMount() {

        AuthenticationService.FetchUser(sessionStorage.getItem("id")).then(res => this.setState({ user: res.data.message }))
    }



    handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (this.state.password.length === 0) {
            return toast.info("Please fill the form correctly")
        }
        AuthenticationService.LoginPassword(this.state.password)
            .then(res => toast.success("Password changed"))
            .catch(err => toast.error("An error has occured"))


    }




    handleImageChange = (e) => {
        e.preventDefault();
        AuthenticationService.FetchProfilePhoto(this.state.pic)
            .then((res) => { console.log(res); toast.success("Uploaded") })
            .catch(err => {
                console.log(err);
                toast.error("Failed")
            });

    }
    render() {
        const { user } = this.state;
        const { profileImg } = this.state;
        return (
            <div className="container emp-profile">
                <Form>
                    <div className="row">
                        <div className="page">

                            <div className="containers">
                                <div className="img-holder">
                                    <img src={user.photo} alt="" id="img" className="img" />
                                </div>
                                <input type="file" name="image-upload" id="input" accept="image/*" onChange={this.imageHandler} /><br />

                                <div className="label">
                                    <label htmlFor="input" className="image-upload">
                                        <i className="material-icons">add photo</i>
                                    </label>
                                </div>
                                <div className="upload">
                                    <button className="btn btn-primary btn-sm" onClick={this.handleImageChange}>Upload</button>
                                    {this.state.pic !== null ? <p>Loaded, click on upload</p> : <p>You can upload</p>}
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h1>
                                    <strong>{user.fullName}</strong>
                                </h1>
                                <ul className="nav-tabs" id="myTab" role="tablist">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab" aria-selected="true">About</a>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">

                            </div>
                            <div className="col-md-6">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active">
                                        <div className="row">

                                            <div className="col-md-4">
                                                <p>{user.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>First Name</label>
                                            </div>
                                            <div className="col-md-4">
                                                <p>{user.firstname}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Last Name</label>
                                            </div>
                                            <div className="col-md-4">
                                                <p>{user.lastname}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>User Name</label>
                                            </div>
                                            <div className="col-md-4">
                                                <p>{user.fullName}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-4">
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>User id</label>
                                            </div>
                                            <div className="col-md-4">
                                                <p>{user.id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Change Password</label>
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                    placeholder="Enter new password" />
                                            </div>
                                        </div>
                                        <div className="pass">

                                            <button className="btn  btn-primary btn-md" onClick={this.handlePasswordSubmit}>change password</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>


        );
    }

}
export { Profile }
