import axios from 'axios';

import { GET_USER, USER_LOADING } from './types';

export const get_user_by_id = (id:any) => (dispatch:any) =>
{
    dispatch(set_user_loading(true));

    axios
        .get(`/api/users/${id}`)
        .then((res:any) => dispatch(
        {
            type: GET_USER,
            payload: res.data
        }))
        .catch(() => dispatch(set_user_loading(false)));
}

const set_user_loading = (is_loading:any) => (
{
    type: USER_LOADING,
    payload: is_loading
});
