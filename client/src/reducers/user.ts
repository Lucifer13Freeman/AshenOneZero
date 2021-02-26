import { USER_LOADING, GET_USER } from '../actions/types';

const initial_state = {
    user: null,
    users: null,
    is_loading: false
}

export default (state = initial_state, action:any) =>
{
    switch (action.type)
    {
        case USER_LOADING:
        {
            return {

                ...state,
                is_loading: action.payload
            };
        }
        case GET_USER:
        {
            return {

                ...state,
                user: action.payload,
                is_loading: false
            };
        }
        default:
            return state;
    }
};