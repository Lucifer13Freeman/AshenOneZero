import axios from 'axios';

import {
    SUBSCRIPTION_LOADING,
    ADD_SUBSCRIPTION,
    GET_SUBSCRIPTIONS,
    DELETE_SUBSCRIPTION
} from './types';

export const create = (like:any) => (dispatch:any) => 
{
    axios
        .post('/api/subscriptions', like)
        .then((res:any) => dispatch(
        {
            type: ADD_SUBSCRIPTION,
            payload: res.data
        }));
}

export const get_all = (params = {}) => (dispatch:any) =>
{
    dispatch(set_subscription_loading(true));

    axios
        .get('/api/subscriptions', { params })
        .then((res:any) => dispatch(
        {
            type: GET_SUBSCRIPTIONS,
            payload: res.data
        }))
        .catch(() => dispatch(set_subscription_loading(false)));
}

export const remove = (id:any) => (dispatch:any) =>
{
    axios
        .delete(`/api/subscriptions/${id}`)
        .then(() => dispatch(
        {
            type: DELETE_SUBSCRIPTION,
            payload: id
        }));
}

export const set_subscription_loading = (is_loading:any) => (
{
    type: SUBSCRIPTION_LOADING,
    payload: is_loading
});