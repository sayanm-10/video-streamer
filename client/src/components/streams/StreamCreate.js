import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends Component {
    // renderInput(formProps) {
    //     return <input type="text" {...formProps.input} />;
    // }

    // ! Even shortened syntax
    renderInput({ input, label, meta }) {
        console.log(meta);
        return (
            <div className="field">
                <label>{label}</label>
                <input type="text" {...input} />
                <div>{meta.error}</div>
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

const validateForm = formValues => {
    const errors = {}; // empty obj means form is OK

    if (!formValues.title) {
        errors.title = "Title is required.";
    }

    if (!formValues.description) {
        errors.description = "Description is required.";
    }

    return errors;
};

export default reduxForm({
    form: "streamCreate",
    validate: validateForm
})(StreamCreate);
