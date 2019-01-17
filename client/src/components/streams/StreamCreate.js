import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends Component {
    // renderInput(formProps) {
    //     return <input type="text" {...formProps.input} />;
    // }

    // ! Even shortened syntax
    renderInput({ input, label }) {
        return (
            <div className="field">
                <label>{label}</label>
                <input type="text" {...input} />
            </div>
        );
    }

    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {
        return (
            <div>
                <form
                    className="ui form"
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <Field
                        name="title"
                        component={this.renderInput}
                        label="Enter Title"
                    />
                    <Field
                        name="description"
                        component={this.renderInput}
                        label="Enter Description"
                    />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "streamCreate"
})(StreamCreate);
