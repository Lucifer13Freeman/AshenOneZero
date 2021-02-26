import {
    SUBSCRIPTION_LOADING,
    ADD_SUBSCRIPTION,
    GET_SUBSCRIPTIONS,
    DELETE_SUBSCRIPTION
} from '../actions/types';

const initial_state = {
    subscriptions: [],
    is_loading: false
}

export default (state = initial_state, action:any) =>
{
    switch (action.type)
    {
        case SUBSCRIPTION_LOADING:
        {
            return {

                ...state,
                is_loading: action.payload
            };
        }
        case GET_SUBSCRIPTIONS:
        {
            return {

                ...state,
                subscriptions: action.payload,
                is_loading: false
            };
        }
        case ADD_SUBSCRIPTION:
        {
            return {

                ...state,
                subscriptions: [action.payload, ...state.subscriptions]
            };
        }
        case DELETE_SUBSCRIPTION:
        {
            return {
                ...state,
                subscriptions: state.subscriptions.filter((s:any) => s._id !== action.payload)
            };
        }
        default:
            return state;
    }
};