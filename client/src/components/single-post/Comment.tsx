import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import { remove_comment } from '../../actions/post';

import ProfileImage from '../shared/ProfileImage';


const Comment = ({ comment, post_id, remove_comment, auth }:any) =>
{
    const on_delete = () => remove_comment(post_id, comment._id); 

    return(
        <div className="card mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-10">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <ProfileImage user={comment.user} width="50" />
                                </div>
                                <div className="ml-2">
                                    <div className="h5 m-0">
                                        {comment.user.surname + ' ' + 
                                        comment.user.name + ' ' + 
                                        comment.user.patronymic}
                                    </div>
                                    <div className="h7 text-muted">
                                        <i className="fa fa-clock-o"></i> 
                                        {new Date(comment.created_date).toDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 text-right">
                        {auth.is_authenticated && 
                        auth.user.surname === comment.user.surname && 
                        auth.user.name === comment.user.name && (
                            <div className="dropdown">
                                <button 
                                    className="btn btn-link dropdown-toggle" 
                                    type="button" id="drop" 
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
                <hr />
                <div className="row">
                    <div className="col-md-12" 
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comment.body)}}>
                    </div>
                </div>
            </div>
        </div>
    );
}

Comment.propTypes = {
    remove_comment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    post_id: PropTypes.string.isRequired
}

const mapStateToProps = (state:any) => ({ auth: state.auth });

export default connect(mapStateToProps, { remove_comment })(Comment);