//import { act } from 'react-dom/test-utils';
import { SET_CURRENT_USER } from '../actions/types';

const initial_state = {

    is_authenticated: false,
    user: {}
};

export default (state = initial_state, action:any) =>
{
    switch (action.type)
    {
        case SET_CURRENT_USER:

            return {

                ...state,
                is_authenticated: Object.keys(action.payload).length !== 0,
                user: action.payload
            };

        default:
            return state;
    }
};