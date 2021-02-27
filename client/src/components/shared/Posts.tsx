import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';

import { UPDATE_POSTS } from '../../actions/types';
import { get_all } from '../../actions/post';

import Post from './post/Post';
import Loader from './loader/Loader';


const LIMIT = 10;

const Posts = ({ get_all, query_params, post: { is_loading, posts, total_count }}:any) =>
{
    const [active_page, set_active_page] = useState(1);

    useEffect(() => get_all(get_query_params()), []);
    useEffect(() => get_all(get_query_params()), [active_page]);

    const get_query_params = () => (
    {
        ...query_params,
        skip: (active_page - 1) * LIMIT,
        limit: LIMIT
    });

    return(

        <React.Fragment>
            {is_loading && <Loader />}
            {!is_loading && total_count === 0 && (
                <div className="text-center">
                    <h2>There is nothing</h2>
                </div>
            )}
            {posts.map((p:any) => <Post post={p} key={p._id} TYPE={UPDATE_POSTS} />)}
            {!is_loading && total_count > posts.length && (
                <Pagination
                    activePage={active_page}
                    itemsCountPerPage={LIMIT}
                    totalItemsCount={total_count}
                    onChange={page => set_active_page(page)}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            )}
        </React.Fragment>
    );
}

Posts.propTypes = {
    get_all: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    query_params: PropTypes.object.isRequired
}

const map_state_to_props = (state:any) => (
{ 
    post: state.post,
    auth: state.auth
});

export default connect(map_state_to_props, { get_all })(Posts);