import _ from "lodash";
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from "../actions/type";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            // lodash omit returns a new state
            return _.omit(state, action.payload);
        case FETCH_STREAMS:
            // lodash mapKeys will return an object of objects that needs to be destructured
            return { ...state, ..._.mapKeys(action.payload, "id") };
        default:
            return state;
    }
};
