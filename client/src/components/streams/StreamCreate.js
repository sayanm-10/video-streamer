import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends Component {
    // renderInput(formProps) {
    //     return <input type="text" {...formProps.input} />;
    // }

    // ! Even shortened syntax
    renderInput = ({ input, label, meta }) => {
        const error_classes = `field ${
            meta.touched && meta.error ? "error" : ""
        } `;
        return (
            <div className={error_classes}>
                <label>{label}</label>
                <input type="text" {...input} />
                {this.renderError(meta)}
            </div>
        );
    };

    renderError(meta) {
        if (meta.touched && meta.error) {
            return (
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            );
        }
    }

    onSubmit = formValues => {
        this.props.createStream(formValues);
    };

    render() {
        return (
            <div>
                <form
                    className="ui form error"
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

const formWrapper = reduxForm({
    form: "streamCreate",
    validate: validateForm
})(StreamCreate);

export default connect(
    null,
    { createStream }
)(formWrapper);
