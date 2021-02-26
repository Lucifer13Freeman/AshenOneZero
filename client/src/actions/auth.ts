import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';
import set_auth_token from '../utilites/set_auth_token';

export const register = (user_data:any, history:any) => () =>
{
    axios
        .post('/api/auth/register', user_data)
        .then(() => history.push('/login'));
};

export const login = (user_data:any) => (dispatch:any) =>
{
    axios
        .post('/api/auth/login', user_data)
        .then((res:any) => 
        {
            const { token } = res.data;
            localStorage.setItem('access_token', token);

            set_auth_token(token);
            const decoded:any = jwtDecode(token);

            dispatch(set_current_user(decoded));
        });
};

export const logout = () => (dispatch:any) =>
{
    localStorage.removeItem('access_token');
    set_auth_token(false);
    dispatch(set_current_user({}));
};

export const set_current_user = (user:any) => (
{
    type: SET_CURRENT_USER,
    payload: user
});