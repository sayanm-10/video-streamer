import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends Component {
    // renderInput(formProps) {
    //     return <input type="text" {...formProps.input} />;
    // }

    // ! Even shortened syntax
    renderInput({ input }) {
        return <input type="text" {...input} />;
    }

    render() {
        return (
            <div>
                <form>
                    <Field name="title" component={this.renderInput} />
                    <Field name="description" component={this.renderInput} />
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "streamCreate"
})(StreamCreate);
