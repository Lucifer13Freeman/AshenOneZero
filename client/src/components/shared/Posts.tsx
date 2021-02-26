import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';

import { UPDATE_POSTS } from '../../actions/types';
import { get_all } from '../../actions/post';

import Post from './post';
import Loader from './loader';

const LIMIT = 10;

class Posts extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props);
        this.state = { active_page: 1 };
    }

    componentDidMount()
    {
        this.props.get_all(this.get_query_params());
    }

    on_change_page = (active_page:any) => 
    {
        this.setState({ active_page }, () => 
        {
            this.props.get_all(this.get_query_params());
        });
    }

    get_query_params()
    {
        return Object.assign(
            {
                skip: (this.state.active_page - 1) * LIMIT,
                limit: LIMIT
            },
            this.props.query_params
        );
    }

    render() {
        const { is_loading, posts, total_count } = this.props.post;

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
                        activePage={this.state.active_page}
                        itemsCountPerPage={LIMIT}
                        totalItemsCount={total_count}
                        onChange={this.on_change_page}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                )}
            </React.Fragment>
        );
    }

    static propTypes: 
    { 
        get_all: PropTypes.Validator<(...args: any[]) => any>; 
        post: PropTypes.Validator<object>; 
        auth: PropTypes.Validator<object>; 
        query_params: PropTypes.Validator<object>; 
    };
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