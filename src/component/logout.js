import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class logout extends Component {


    render() {
        if(1){
            return <Redirect to="/"/>
        }
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container">
                </div>
            </>
        )
    }
}
export default logout 
