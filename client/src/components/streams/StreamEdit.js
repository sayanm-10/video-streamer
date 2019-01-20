import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";

import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onEdit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        if (this.props.stream) {
            return (
                <div>
                    <h3>Edit a Stream</h3>
                    {/* <StreamForm
                        initialValues={{
                            title: this.props.stream.title,
                            description: this.props.stream.description
                        }}
                        onSubmit={this.onEdit}
                    /> */}
                    <StreamForm
                        initialValues={_.pick(
                            this.props.stream,
                            "title",
                            "description"
                        )}
                        onSubmit={this.onEdit}
                    />
                </div>
            );
        }

        return <div>Loading...</div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
    mapStateToProps,
    { fetchStream, editStream }
)(StreamEdit);
