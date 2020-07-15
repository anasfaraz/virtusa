import React, { Component } from "react";
import PatternLock from "react-pattern-lock";
import "../App.css";
import AuthenticationService from "../service/authentication"
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class PatternValidation extends Component {
    state = {
        path: [],
        isLoading: false,
        error: false,
        success: false,
        disabled: false,
        size: 3,
        verified:false,
    };


    errorTimeout = 10;

    onReset = () => {
        this.setState({
            path: [],
            success: false,
            error: false,
            disabled: false
        });
    };
    onChange = path => {
        this.setState({ path: [...path] });
    };

 


    onSubmit = () => {
        if (this.state.path.length === 0) {
            this.setState({ loading: false })
            return toast.info("Please fill the form correctly")
        }
        this.setState({ isLoading: true });
        const path = this.state.path.join("-")
        AuthenticationService.ValidatePattern(path).then(res => {
            sessionStorage.setItem("checker","false");
            this.setState({verified: true});
            this.setState({ isLoading: true });
            this.setState({ success: true });

            toast.success("Pattern Security verified");
        })
            .catch(err => {
                this.setState({ isLoading: false });
                this.setState({ verified: false });
            
                this.errorTimeout = window.setTimeout(() => {
                    this.setState({
                        disabled: false,
                        error: false,
                        isLoading: false,
                        path: []
                    });
                },1000)
                return toast.error("Wrong pattern");;
         
            })
    };

    render() {
        if(this.state.verified === true){
            return <Redirect to="/HomeScreen"/>
        }
        return (
            <React.Fragment>
                <div className="container emp-prof ">
                    <header className="patternhead"><h1>pattern validation</h1></header>
                <div className="center" style={{ width: "500px" }}>
                    <PatternLock
                        width={300}
                        pointSize={15}
                        size={3}
                        path={this.state.path}
                        error={this.state.error}
                        disabled={this.state.disabled || this.state.isLoading}
                        success={this.state.success}
                        onChange={(pattern) => {
                            
                            this.setState({ path: pattern });

                        }}
                        onFinish={() => { console.log(this.state.path) }}
                    />
                </div>
                {/* <div className="output" style={{ color: "black" }}>Output : {this.state.path.map(x => x + 1).join(",")}</div> */}
                <div className="buttons">
                    {(
                        <button className="btn btn btn-danger"
                            onClick={this.onReset}
                        >
                            reset
                        </button>
                    )}
                    {(
                            <button className="btn btn btn-success"
                            onClick={() => this.onSubmit()}
                        > Confirm pattern</button>
                    )

                    }
                </div>
                </div>
            </React.Fragment>
        );
    }
}
export default PatternValidation