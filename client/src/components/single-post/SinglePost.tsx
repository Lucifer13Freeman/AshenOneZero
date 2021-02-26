import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { UPDATE_POST } from '../../actions/types';
import { get_by_id as get_post_id } from '../../actions/post';

import Loader from '../shared/loader';
import Post from '../shared/post';
import Comment from './Comment';
import CommentForm from './CommentForm';

class SinglePost extends React.Component<any, any>
{
    componentDidMount()
    {
        this.props.get_post_id(this.props.match.params.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps:any)
    {
        if (!nextProps.post.is_loading && nextProps.post.post === null) this.props.history.push('/404');
    }

    render()
    {
        const { auth, post } = this.props;

        return !post.is_loading && post.post !== null ? (
            <div className="row mt-5">
              <div className="col-md-6 mx-auto">
                <Post post={post.post} TYPE={UPDATE_POST} />
                <div className="col-md-12 mx-auto">
                  {auth.is_authenticated && <CommentForm post_id={post.post._id} />}
                  {post.post.comments.map((c:any) => (
                    <Comment comment={c} post_id={post.post._id} key={c._id} />
                  ))}
                </div>
              </div>
            </div>
        ) : <Loader />
    }

    static propTypes: { 
        get_post_id: PropTypes.Validator<(...args: any[]) => any>; 
        post: PropTypes.Validator<object>; 
        auth: PropTypes.Validator<object>; 
    };
    
}

SinglePost.propTypes = {
    get_post_id: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const map_state_to_props = (state:any) => (
{ 
    post: state.post,
    auth: state.auth
});

export default connect(map_state_to_props, { get_post_id })(SinglePost);