import React, { Component } from "react";
import PatternLock from "react-pattern-lock";
import AuthenticationService from "../service/authentication"
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";


export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class PatternEdit extends Component {
    state = {
        path: [],
        isLoading: false,
        error: false,
        success: false,
        disabled: false,
        size: 3,
        verified: false,
    };

    componentDidMount() {

        

        AuthenticationService.FetchUserPattern(sessionStorage.getItem("id"))
            .then((res) => { console.log(res); sessionStorage.setItem("pattern_id", res.data.message[0].id) })
            .catch(err => console.log(err));
    }

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
            return toast.info("Enter the valid pattern")
        }
        const path = this.state.path.join("-");
        console.log(path);
        AuthenticationService.EditPattern(path).then(res => {
            console.log(res);
            this.setState({ verified: true });
            this.setState({ isLoading: true });
            this.setState({ disabled: true });
            this.setState({ success: true });
            toast.success("Pattern Security edited");
        })
            .catch(err => {
                this.setState({ isLoading: false });
                this.errorTimeout = window.setTimeout(() => {
                    this.setState({
                        disabled: false,
                        error: false,
                        isLoading: false,
                        path: []
                    });
                }, 2000)
                return toast.error("Not updated")
            })
    };

    render() {
        if (this.state.verified === true) {
            return <Redirect to="/HomeScreen" />
        }
        return (
            <React.Fragment>
                <div className="container emp-prof ">
                    <header className="patternhead"><h1>Edit Pattern</h1></header>

                <div className="center" style={{ width: "500px" }}>
                    <PatternLock
                        width={300}
                        pointSize={15}
                        size={3}
                        path={this.state.path}
                        onChange={(pattern) => {
                            this.setState({ path: pattern });
                        }}
                        onFinish={() => {
                            //  console.log(this.state.path) 
                             }}
                    />
                </div>
                <div className="output" style={{ color: "black" }}>Output : {this.state.path.map(x => x + 1).join(",")}</div>
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
                        > Edit pattern</button>
                    )

                    }
                </div>
                </div>

            </React.Fragment>
        );
    }
}
export default PatternEdit