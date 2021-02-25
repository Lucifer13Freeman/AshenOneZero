import {
    POST_LOADING,
    ADD_POST,
    GET_POST,
    GET_POSTS,
    UPDATE_POST,
    UPDATE_POSTS,
    DELETE_POST,
    CLEAR_POSTS
} from '../actions/types';

const initial_state = {
    posts: [],
    total_count: 0,
    post: null,
    is_loading: false
}

export default (state = initial_state, action:any) =>
{
    switch (action.type)
    {
        case POST_LOADING:
        {
            return {

                ...state,
                is_loading: action.payload
            };
        }
        case CLEAR_POSTS:
        {
            return {

                ...state,
                posts: [],
                total_count: 0
            };
        }
        case GET_POSTS:
        {
            return {

                ...state,
                posts: action.payload.posts,
                total_count: action.payload.total_count,
                is_loading: false
            };
        }
        case GET_POST:
        {
            return {

                ...state,
                post: action.payload,
                is_loading: false
            };
        }
        case ADD_POST:
        {
            return {

                ...state,
                posts: [action.payload, ...state.posts]
            };
        }
        case UPDATE_POSTS:
        {
            return {

                ...state,
                posts: state.posts.map((p:any) => p._id === action.payload._id ? action.payload : p)
            };
        }
        case UPDATE_POST:
        {
            return {
                ...state,
                post: action.payload
            };
        }
        case DELETE_POST:
        {
            return {
                ...state,
                posts: state.posts.filter((post:any) => post._id !== action.payload)
            };
        }
        default:
            return state;
    }
}