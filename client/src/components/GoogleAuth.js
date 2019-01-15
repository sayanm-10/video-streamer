import React, { Component } from "react";

class GoogleAuth extends Component {
    state = {
        isSignedIn: null // coz, we don't know if user is signed in or not
    };

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
                    scope: "email"
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                });
        });
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div>Don't know if signed in!</div>;
        } else if (this.state.isSignedIn) {
            return <div>Signed In!!!</div>;
        } else {
            return <div>Not Signed In!</div>;
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;
