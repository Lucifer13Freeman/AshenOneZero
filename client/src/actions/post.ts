import axios from 'axios';

import {
    POST_LOADING,
    ADD_POST,
    GET_POST,
    GET_POSTS,
    UPDATE_POST,
    DELETE_POST,
    CLEAR_POSTS
} from './types';


export const create = (post:any) => (dispatch:any) => 
{
    axios
        .post('/api/posts', post)
        .then((res:any) => dispatch(
        {
            type: ADD_POST,
            payload: res.data
        }));
}

export const get_all = (params:any) => (dispatch:any) =>
{
    dispatch(set_post_loading(true));

    axios
        .get('/api/posts', { params })
        .then((res:any) => dispatch(
        {
            type: GET_POSTS,
            payload: {

                posts: res.data,
                total_count: +res.headers['x-total-count']
            }
        }))
        .catch(() => 
        {
            dispatch(set_post_loading(false));
            dispatch(clear_posts());
        });
}

export const get_by_id = (id:any) => (dispatch:any) =>
{
    dispatch(set_post_loading(true));

    axios
        .get(`/api/posts/${id}`)
        .then((res:any) => dispatch(
        {
            type: GET_POST,
            payload: res.data
        }))
        .catch(() => dispatch(set_post_loading(false)));
}

export const remove = (id:any) => (dispatch:any) =>
{
    axios
        .delete(`/api/posts/${id}`)
        .then(() => dispatch(
        {
            type: DELETE_POST,
            payload: id
        }));
}

export const create_like = (post_id:any, TYPE:any) => (dispatch:any) =>
{
    axios
        .post(`/api/posts/${post_id}/likes`)
        .then((res:any) => dispatch(
        {
            type: TYPE,
            payload: res.data
        }));
}

export const remove_like = (post_id:any, like_id:any, TYPE:any) => (dispatch:any) =>
{
    axios
        .delete(`/api/posts/${post_id}/likes/${like_id}`)
        .then((res:any) => dispatch(
        {
            type: TYPE,
            payload: res.data
        }));
}

export const create_comment = (post_id:any, comment:any) => (dispatch:any) =>
{
    axios
        .post(`/api/posts/${post_id}/comments`, comment)
        .then((res:any) => dispatch(
        {
            type: UPDATE_POST,
            payload: res.data
        }));
}

export const remove_comment = (post_id:any, comment_id:any) => (dispatch:any) =>
{
    axios
        .delete(`/api/posts/${post_id}/comments/${comment_id}`)
        .then((res:any) => dispatch(
        {
            type: UPDATE_POST,
            payload: res.data
        }));
}

const clear_posts = () => 
({
    type: CLEAR_POSTS
})

const set_post_loading = (is_loading:any) =>
({
    type: POST_LOADING,
    payload: is_loading
})