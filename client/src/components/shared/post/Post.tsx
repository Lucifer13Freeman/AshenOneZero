import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import { remove } from '../../../actions/post';

import Like from './Like';
import ProfileImage from '../ProfileImage';


const Post = ({ post, remove, auth, TYPE }:any) =>
{
    const on_delete = () => remove(post._id);

    return (
        
        <div className="card mb-4">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-2">
                            <Link to={'/user/' + post.user._id}>
                                <ProfileImage user={post.user} width="50" />
                            </Link>
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">
                                {post.user.surname + ' ' + 
                                post.user.name + ' ' + 
                                post.user.patronymic}
                            </div>
                            <div className="h7 text-muted">
                                <i className="fa fa-clock-o"></i> 
                                {new Date(post.created_date).toDateString()}
                            </div>
                        </div>
                    </div>
                    {auth.is_authenticated && 
                    auth.user.surname === post.user.surname 
                    && auth.user.name === post.user.name && (
                    <div className="dropdown">
                        <button 
                            className="btn btn-link dropdown-toggle" 
                            type="button" 
                            id="drop" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">      
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="drop">
                            <a 
                                className="dropdown-item" 
                                role="button" 
                                onClick={on_delete}>Remove
                            </a>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className="card-body" 
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.body)}}>
            </div>
            <div className="card-footer">
                <Like post_id={post._id} likes={post.likes} TYPE={TYPE} />
                <Link to={'/post/' + post._id} className="card-link">
                    <i className="fa fa-arrow-right"></i>
                </Link>
            </div>
        </div>
    );
}

Post.propTypes = {
    remove: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    TYPE: PropTypes.string.isRequired
}

const mapStateToProps = (state:any) => ({ auth: state.auth });

export default connect(mapStateToProps, { remove })(Post);