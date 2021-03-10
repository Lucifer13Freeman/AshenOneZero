import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { UPDATE_POST } from '../../actions/types';
import { get_by_id as get_post_by_id } from '../../actions/post';

import Loader from '../shared/loader/Loader';
import Post from '../shared/post/Post';
import Comment from './Comment';
import CommentForm from './CommentForm';


const SinglePost = ({ get_post_by_id, match, post, auth, history }:any) =>
{
  useEffect(() => get_post_by_id(match.params.id, history), []);

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

SinglePost.propTypes = {
  get_post_by_id: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state:any) => (
{ 
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { get_post_by_id })(SinglePost);