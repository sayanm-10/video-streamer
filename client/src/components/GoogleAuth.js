import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
                    scope: "email"
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();

                    this.onAuthChange(this.auth.isSignedIn.get());
                    // callback is called with bool value reflecting sign in status
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    signIn = () => {
        this.auth.signIn();
    };

    signOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    className="ui red large google button"
                    onClick={this.signOut}
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    className="ui red large google button"
                    onClick={this.signIn}
                >
                    <i className="google icon" />
                    Sign In
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);
