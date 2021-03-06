import React, { Component } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer();

        // ! This approach doesn't work as videoRef is null in this life cycle event
        //this.videoRef.current.addEventListener("load", this.buildPlayer);
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer = () => {
        if (this.player || !this.props.stream) {
            return;
        }

        const { id } = this.props.match.params;

        // wire FLV player
        this.player = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    };

    render() {
        if (!this.props.stream) {
            return <h3>Loading...</h3>;
        }

        const { title, description } = this.props.stream;

        return (
            <div>
                <video
                    ref={this.videoRef}
                    style={{ width: "100%" }}
                    controls={true}
                />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
    mapStateToProps,
    { fetchStream }
)(StreamShow);
